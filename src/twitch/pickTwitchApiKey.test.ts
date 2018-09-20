import { pickTwitchApiKey } from '.';
import apiKeys from './api-keys';

describe('pickTwitchApiKey', () => {
  it('it should works', () => {
    apiKeys.push('a', 'b', 'c');

    const randomlyPickedApiKeys = Array.from(Array(10).keys()).map(() => pickTwitchApiKey());
    expect(randomlyPickedApiKeys).toContain('a');
    expect(randomlyPickedApiKeys).toContain('b');
    expect(randomlyPickedApiKeys).toContain('c');
  });

  it('should throw an error', () => {
    apiKeys.length = 0;

    expect(() => {
      pickTwitchApiKey();
    }).toThrowError("You must register your Twitch API Keys by using `registerApiKeys(['...'])`.");
  });
});
