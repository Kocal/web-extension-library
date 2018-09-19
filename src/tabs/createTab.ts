import CreateProperties = chrome.tabs.CreateProperties;
import Tab = chrome.tabs.Tab;

export const createTab = (createProperties: CreateProperties, cb?: (tab: Tab) => void): void =>
  chrome.tabs.create(createProperties, cb);
