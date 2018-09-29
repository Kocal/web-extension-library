export const setBadgeColor = (color: string | browser.browserAction.ColorArray, tabId?: number): void =>
  browser.browserAction.setBadgeBackgroundColor({ color, tabId });
