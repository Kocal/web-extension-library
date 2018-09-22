export const setBrowserActionTitle = (title: string, tabId?: number): void =>
  chrome.browserAction.setTitle({ title, tabId });
