import CreateProperties = browser.tabs.CreateProperties;
import Tab = browser.tabs.Tab;

export const createTab = (createProperties: CreateProperties): Promise<Tab> => browser.tabs.create(createProperties);
