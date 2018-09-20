import apiKeys from './api-keys';

export const pickTwitchApiKey = (): string => {
  if (apiKeys.length === 0) {
    throw new Error("You must register your Twitch API Keys by using `registerApiKeys(['...'])`.");
  }

  return apiKeys[Math.floor(Math.random() * apiKeys.length)];
};
