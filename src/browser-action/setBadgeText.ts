export const setBadgeText = (text: string, tabId?: number): void => chrome.browserAction.setBadgeText({ text, tabId });
