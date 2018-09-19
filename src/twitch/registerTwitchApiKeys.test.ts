import { registerTwitchApiKeys } from '.';
import apiKeys from './api-keys';

describe('registerTwitchApiKeys', () => {
  it('should works', () => {
    expect(apiKeys).toEqual([]);

    registerTwitchApiKeys(['a']);
    expect(apiKeys).toEqual(['a']);

    registerTwitchApiKeys(['b']);
    expect(apiKeys).toEqual(['a', 'b']);

    registerTwitchApiKeys(['c', 'd']);
    expect(apiKeys).toEqual(['a', 'b', 'c', 'd']);
  });
});
