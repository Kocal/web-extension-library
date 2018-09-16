export const setBadgeTitle = (title: string, tabId?: number): void => chrome.browserAction.setTitle({ title, tabId });
