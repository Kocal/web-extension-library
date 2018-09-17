declare const WebExtensionLibrary: WebExtensionLibrary;
export default WebExtensionLibrary;

export interface WebExtensionLibrary {
  markAsOffline: () => void;
  markAsOnline: () => void;
  onBadgeClicked: (callback: (tab: chrome.tabs.Tab) => void) => void;
  setBadgeColor: (color: string | chrome.browserAction.ColorArray, tabId?: number) => void;
  setBadgeText: (text: string, tabId?: number) => void;
  setBadgeTitle: (titles: string, tabId?: number) => void;
}
