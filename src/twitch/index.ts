export { getTwitchGame } from './getTwitchGame';
export { getTwitchLiveStreams } from './getTwitchLiveStreams';
export { askTwitchAccessToken } from './authorization';

let apiKey = null;
let accessToken = null;

export function registerTwitchApiKey(key: string): void {
  apiKey = key;
}

export function getTwitchApiKey(): string {
  if (apiKey === null) {
    throw new Error('You must register your Twitch API Key by using "registerApiKey(\'...\')".');
  }

  return apiKey;
}

export function registerTwitchAccessToken(token: string): void {
  accessToken = token;
}

export function getTwitchAccessToken(): string {
  if (accessToken === null) {
    throw new Error('You must register your Twitch API access token by using "registerTwitchAccessToken(\'...\')".');
  }

  return accessToken;
}
