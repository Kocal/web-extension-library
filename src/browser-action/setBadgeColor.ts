export const setBadgeColor = (color: string | chrome.browserAction.ColorArray, tabId?: number): void =>
  chrome.browserAction.setBadgeBackgroundColor({ color, tabId });
