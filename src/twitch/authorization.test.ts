import { advanceBy as advanceDateBy, advanceTo as advanceDateTo, clear as clearDate } from 'jest-date-mock';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { askTwitchAccessToken, registerTwitchApiKey } from '.';

// @ts-ignore
browser.identity = browser.identity || {};
// @ts-ignore
browser.identity.getRedirectURL = jest.fn((path) => {
  return `http://localhost/${path}`;
});
// @ts-ignore
browser.identity.launchWebAuthFlow = jest.fn((path) => {
  return `https://localhost#access_token=0123456789abcdefghijABCDEFGHIJ&scope=viewing_activity_read&state=c3ab8aa609ea11e793ae92361f002671&token_type=bearer`;
});

describe('Twitch Authorization', () => {
  const axiosMock = new axiosMockAdapter(axios);

  beforeEach(() => {
    clearDate();
    axiosMock.reset();
    browser.storage.sync.clear();
    // @ts-ignore
    browser.storage.sync.get.mockClear();
    // @ts-ignore
    browser.storage.sync.set.mockClear();
  });

  test('Read from sync storage', async () => {
    browser.storage.sync.set({
      twitchAuthorization: {
        accessToken: 'abc',
        client_id: 'def',
        expirationTimestamp: new Date().getTime() + 60 * 1000,
        expires_in: 60,
        login: 'thekocal',
        scopes: [],
        user_id: '11111111',
      },
    });
    // @ts-ignore
    browser.storage.sync.set.mockClear();

    const accessToken = await askTwitchAccessToken();

    expect(browser.storage.sync.get).toHaveBeenNthCalledWith(1, ['twitchAuthorization']);
    expect(browser.storage.sync.set).not.toHaveBeenCalled();

    expect(accessToken).toEqual('abc');
  });

  test('Ask for token if sync storage is empty', async () => {
    advanceDateTo(1590021266683);

    axiosMock.onGet(`https://id.twitch.tv/oauth2/validate`).reply(200, {
      client_id: 'def',
      expires_in: 60,
      login: 'thekocal',
      scopes: [],
      user_id: '11111111',
    });

    registerTwitchApiKey('api-key');

    const accessToken = await askTwitchAccessToken();

    expect(browser.storage.sync.get).toHaveBeenNthCalledWith(1, ['twitchAuthorization']);
    expect(browser.storage.sync.set).toHaveBeenNthCalledWith(1, {
      twitchAuthorization: {
        accessToken: '0123456789abcdefghijABCDEFGHIJ',
        expirationTimestamp: new Date().getTime() + 60 * 1000,
        client_id: 'def',
        expires_in: 60,
        login: 'thekocal',
        scopes: [],
        user_id: '11111111',
      },
    });

    expect(accessToken).toEqual('0123456789abcdefghijABCDEFGHIJ');
  });

  test('Renew if expired', async () => {
    const expiresIn = 1; // 1 sec

    advanceDateTo(1590021266683);

    axiosMock.onGet(`https://id.twitch.tv/oauth2/validate`).reply(200, {
      client_id: 'def',
      expires_in: 60,
      login: 'thekocal',
      scopes: [],
      user_id: '11111111',
    });

    registerTwitchApiKey('api-key');

    browser.storage.sync.set({
      twitchAuthorization: {
        accessToken: 'abc',
        client_id: 'def',
        expirationTimestamp: new Date().getTime(),
        expires_in: expiresIn,
        login: 'thekocal',
        scopes: [],
        user_id: '11111111',
      },
    });
    // @ts-ignore
    browser.storage.sync.set.mockClear();

    advanceDateBy(expiresIn * 2 * 1000);
    const accessToken = await askTwitchAccessToken();

    expect(browser.storage.sync.get).toHaveBeenNthCalledWith(1, ['twitchAuthorization']);
    expect(browser.storage.sync.set).toHaveBeenNthCalledWith(1, {
      twitchAuthorization: {
        accessToken: '0123456789abcdefghijABCDEFGHIJ',
        expirationTimestamp: new Date().getTime() + 60 * 1000,
        client_id: 'def',
        expires_in: 60,
        login: 'thekocal',
        scopes: [],
        user_id: '11111111',
      },
    });

    expect(accessToken).toEqual('0123456789abcdefghijABCDEFGHIJ');
  });
});
