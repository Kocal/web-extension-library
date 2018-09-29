import Tab = browser.tabs.Tab;

export const onBrowserActionClick = (callback: (tab: Tab) => void): void =>
  browser.browserAction.onClicked.addListener(callback);
