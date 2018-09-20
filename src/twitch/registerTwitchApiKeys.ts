import apiKeys from './api-keys';

export const registerTwitchApiKeys = (keys: string[]): void => {
  apiKeys.push(...keys);
};
