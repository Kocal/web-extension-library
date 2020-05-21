import { getTwitchAccessToken, getTwitchApiKey, registerTwitchAccessToken, registerTwitchApiKey } from '.';

describe('Twitch', () => {
  test('I can register and get a Twitch API Key', () => {
    expect(() => {
      getTwitchApiKey();
    }).toThrowError('You must register your Twitch API Key by using "registerApiKey(\'...\')".');

    registerTwitchApiKey('a');

    expect(getTwitchApiKey()).toEqual('a');
  });

  test('I can register and get a Twitch Access Token', () => {
    expect(() => {
      getTwitchAccessToken();
    }).toThrowError('You must register your Twitch API access token by using "registerTwitchAccessToken(\'...\')".');

    registerTwitchAccessToken('b');

    expect(getTwitchAccessToken()).toEqual('b');
  });
});
