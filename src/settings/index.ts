import { readFromSyncStorage, writeToSyncStorage } from '../sync-storage';

/* tslint:disable variable-name */
let _settings: InterfaceSettings = {};

export interface InterfaceSettings {
  [k: string]: InterfaceSettingsItem;
}

export interface InterfaceSettingsItem {
  type: 'boolean';
  label: string;
  help?: string;
  defaultValue?: any;
  value?: any;
  children?: InterfaceSettings;
}

export const getSettings = (): InterfaceSettings => _settings;

export const loadSettings = (): Promise<void> => {
  return readFromSyncStorage('settings').then(items => {
    const settings: InterfaceSettings | undefined = items.settings;

    Object.entries(settings || getFlattenSettings()).forEach(([dottedName, value]) => {
      setSettingValue(dottedName, value, false);
    });

    return writeToSyncStorage({ settings: getFlattenSettings() });
  });
};

/**
 * Should be called only one time in your whole app
 */
export const registerSettings = (settings: InterfaceSettings): Promise<void> => {
  _settings = settings;
  return loadSettings();
};

export const getSettingValue = (key: string): any | undefined => {
  const setting = getSetting(key);

  if (setting === undefined) return undefined;
  if (setting.value === undefined) return setting.defaultValue;

  return setting.value;
};

export const setSettingValue = (key: string, value: any, synchronize = true): Promise<void> => {
  const setting = getSetting(key);
  const previousValue = getSettingValue(key);

  if (setting === undefined) return Promise.resolve();

  Object.assign(setting, { value });

  if (!synchronize) {
    return Promise.resolve();
  }

  return writeToSyncStorage({ settings: getFlattenSettings() })
    .then(() => Promise.resolve())
    .catch(
      /* istanbul ignore next */ () => {
        Object.assign(setting, { value: previousValue });
        Promise.reject();
      }
    );
};

function getSetting(key: string): InterfaceSettingsItem | undefined {
  const keyParts = key.split('.');
  let setting = getSettings()[keyParts[0]];

  if (keyParts.length === 1) return setting;

  while (true) {
    keyParts.shift();

    if (keyParts.length === 0) return setting;
    if (setting === undefined || setting.children === undefined) return undefined;

    setting = setting.children[keyParts[0]];
  }
}

function recursivelyIterate(settings: InterfaceSettings, cb: Function, prefix: string = ''): void {
  Object.entries(settings).forEach(([name, setting]) => {
    if (setting.children) {
      recursivelyIterate(setting.children, cb, `${name}.`);
    }

    cb(`${prefix}${name}`, setting);
  });
}

function getFlattenSettings(): { [k: string]: any } {
  const flattenSettings: { [k: string]: any } = {};

  recursivelyIterate(getSettings(), dottedName => {
    flattenSettings[dottedName] = getSettingValue(dottedName);
  });

  return flattenSettings;
}
