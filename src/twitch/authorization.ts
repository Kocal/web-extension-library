import axios, { AxiosError } from 'axios';
import * as qs from 'qs';
import { getTwitchApiKey, readFromSyncStorage, writeToSyncStorage } from '..';
import { isAxiosError } from '../utils';

const oAuthUrl = 'https://id.twitch.tv/oauth2';

// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth
// https://developer.chrome.com/extensions/identity#method-launchWebAuthFlow
async function askTwitchAuthorization(clientId: string, interactive: boolean = false) {
  const redirectUri = browser.identity
    .getRedirectURL('twitch')
    .replace('extensions.allizom.org', 'extensions.mozilla.org');

  const params = {
    client_id: clientId,
    redirect_uri: encodeURI(redirectUri),
    response_type: 'token',
    ...(interactive ? { force_verify: true } : {}),
  };

  const url = `${oAuthUrl}/authorize?${qs.stringify(params)}`;

  const responseUrl = await browser.identity.launchWebAuthFlow({ url, interactive });
  if (browser.runtime.lastError) {
    throw browser.runtime.lastError;
  }

  if (!responseUrl) {
    throw new Error('No responseUrl from Twitch OAuth');
  }

  const str = responseUrl.split('access_token=')[1];
  if (!str) {
    const errStr = responseUrl.split('error=')[1];
    if (!errStr) {
      throw new Error('Unknown responseUrl');
    }

    const [title, desc] = errStr.split('&error_description=');

    throw new Error(`${title}: ${desc.replace(/\+/g, ' ')}`);
  }

  const accessToken = responseUrl.split('access_token=')[1].split('&')[0];
  return accessToken;
}

async function validateAccessToken(accessToken: string): Promise<any> {
  const response = await axios.get(`${oAuthUrl}/validate`, {
    headers: {
      Authorization: `OAuth ${accessToken}`,
    },
  });

  return response.data;
}

export async function askTwitchAccessToken(force: boolean = false) {
  let { twitchAuthorization } = await readFromSyncStorage(['twitchAuthorization']);
  let accessToken = (twitchAuthorization && twitchAuthorization.accessToken) || null;

  const isExpired =
    twitchAuthorization && twitchAuthorization.expirationTimestamp
      ? twitchAuthorization.expires_in !== 0 && new Date(twitchAuthorization.expirationTimestamp) <= new Date()
      : false;

  if (force || accessToken === null || isExpired) {
    try {
      accessToken = await askTwitchAuthorization(getTwitchApiKey(), true);
      twitchAuthorization = await validateAccessToken(accessToken);
      twitchAuthorization = {
        ...twitchAuthorization,
        accessToken,
        expirationTimestamp: new Date().getTime() + twitchAuthorization.expires_in * 1000,
      };

      await writeToSyncStorage({ twitchAuthorization });
    } catch (error) {
      throw error;
    }
  }

  return accessToken;
}

export function isTwitchApiOAuthError(error: Error | AxiosError) {
  if (isAxiosError(error)) {
    if (
      error.response.status === 401 &&
      ['Invalid OAuth token', 'Client ID and OAuth token do not match'].includes(error.response.data.message)
    ) {
      return true;
    }

    return false;
  }

  return false;
}
