declare module '@kocal/web-extension-library' {
  const markAsOffline: () => void;
  const markAsOnline: () => void;
  const onBadgeClicked: (callback: (tab: chrome.tabs.Tab) => void) => void;
  const setBadgeColor: (color: string | chrome.browserAction.ColorArray, tabId?: number) => void;
  const setBadgeText: (text: string, tabId?: number) => void;
  const setBadgeTitle: (titles: string, tabId?: number) => void;
}
