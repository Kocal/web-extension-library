export const setBadgeText = (text: string, tabId?: number): void => browser.browserAction.setBadgeText({ text, tabId });
