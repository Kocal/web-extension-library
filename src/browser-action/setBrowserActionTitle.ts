export const setBrowserActionTitle = (title: string, tabId?: number): void =>
  browser.browserAction.setTitle({ title, tabId });
