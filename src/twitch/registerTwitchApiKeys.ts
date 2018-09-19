import apiKeys from './api-keys';

export const registerTwitchApiKeys = (keys: string[]): void => {
  keys.forEach((key: string) => apiKeys.push(key));
};
