import { getTwitchApiKey, registerTwitchApiKey } from '.';

describe('registerTwitchApiKey + getTwitchApiKey', () => {
  it('should works', () => {
    expect(() => {
      getTwitchApiKey();
    }).toThrowError('You must register your Twitch API Keys by using `registerApiKeys([\'...\'])`.');

    registerTwitchApiKey('a');

    expect(getTwitchApiKey()).toEqual('a');
  });
});
