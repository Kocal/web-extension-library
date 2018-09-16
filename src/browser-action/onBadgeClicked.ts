export const onBadgeClicked = (callback: (tab: chrome.tabs.Tab) => void): void =>
  chrome.browserAction.onClicked.addListener(callback);
