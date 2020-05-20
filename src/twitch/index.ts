export { getTwitchGame } from './getTwitchGame';
export { getTwitchLiveStreams } from './getTwitchLiveStreams';

let apiKey = null;

export function registerTwitchApiKey(key: string): void {
  apiKey = key;
};

export function getTwitchApiKey(): string {
  if (apiKey === null) {
    throw new Error('You must register your Twitch API Keys by using `registerApiKeys([\'...\'])`.');
  }

  return apiKey;
};
