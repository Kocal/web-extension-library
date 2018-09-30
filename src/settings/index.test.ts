import { getSettings, getSettingValue, registerSettings, setSettingValue } from '.';
import settings from './__fixtures__/settings';

describe('settings', () => {
  test('integration', async done => {
    // Test values and defaults values before registration
    expect(settings.showNotifications.value).toBeUndefined();
    expect(settings.showNotifications.defaultValue).toBeTruthy();
    expect(settings.showNotifications.children.atBoot.value).toBeUndefined();
    expect(settings.showNotifications.children.atBoot.defaultValue).toBeTruthy();
    expect(settings.showNotifications.children.onTitleUpdate.value).toBeUndefined();
    expect(settings.showNotifications.children.onTitleUpdate.defaultValue).toBeFalsy();
    expect(getSettings()).toEqual({});
    expect(browser.storage.sync.get).not.toHaveBeenCalledWith('settings');

    // Registration...
    await registerSettings(settings);
    expect(browser.storage.sync.get).toHaveBeenLastCalledWith('settings');

    // We should synchronize flatten settings, see `getFlattenSettings()`
    expect(browser.storage.sync.set).toHaveBeenLastCalledWith({
      settings: {
        showNotifications: true,
        'showNotifications.atBoot': true,
        'showNotifications.onTitleUpdate': false,
      },
    });

    // After registration, settings should be hydrated and loaded correctly
    expect(getSettings()).toEqual(settings);
    expect(settings.showNotifications.value).toBeTruthy();
    expect(settings.showNotifications.defaultValue).toBeTruthy();
    expect(settings.showNotifications.children.atBoot.value).toBeTruthy();
    expect(settings.showNotifications.children.atBoot.defaultValue).toBeTruthy();
    expect(settings.showNotifications.children.onTitleUpdate.value).toBeFalsy();
    expect(settings.showNotifications.children.onTitleUpdate.defaultValue).toBeFalsy();

    // Update a setting value
    await setSettingValue('showNotifications', false);
    expect(browser.storage.sync.set).toHaveBeenLastCalledWith({
      settings: {
        showNotifications: false,
        'showNotifications.atBoot': true,
        'showNotifications.onTitleUpdate': false,
      },
    });
    expect(settings.showNotifications.value).toBeFalsy();
    expect(settings.showNotifications.defaultValue).toBeTruthy();
    expect(getSettingValue('showNotifications')).toBeFalsy();

    // Update a deep-setting value
    await setSettingValue('showNotifications.atBoot', false);
    expect(browser.storage.sync.set).toHaveBeenLastCalledWith({
      settings: {
        showNotifications: false,
        'showNotifications.atBoot': false,
        'showNotifications.onTitleUpdate': false,
      },
    });
    expect(getSettingValue('showNotifications.atBoot')).toBeFalsy();
    expect(settings.showNotifications.children.atBoot.value).toBeFalsy();
    expect(settings.showNotifications.children.atBoot.defaultValue).toBeTruthy();

    // Update a deep-setting value (again)
    await setSettingValue('showNotifications.onTitleUpdate', true);
    expect(browser.storage.sync.set).toHaveBeenLastCalledWith({
      settings: {
        showNotifications: false,
        'showNotifications.atBoot': false,
        'showNotifications.onTitleUpdate': true,
      },
    });
    expect(getSettingValue('showNotifications.onTitleUpdate')).toBeTruthy();
    expect(settings.showNotifications.children.onTitleUpdate.value).toBeTruthy();
    expect(settings.showNotifications.children.onTitleUpdate.defaultValue).toBeFalsy();

    // Update a setting value, but without synchronize it to Browser storage (internal usage)
    await setSettingValue('showNotifications.onTitleUpdate', true, false);
    expect(browser.storage.sync.set).not.toHaveBeenLastCalledWith();
    expect(settings.showNotifications.children.onTitleUpdate.value).toBeTruthy();
    expect(settings.showNotifications.children.onTitleUpdate.defaultValue).toBeFalsy();
    expect(getSettingValue('showNotifications.onTitleUpdate')).toBeTruthy();

    // Update + get value of an undefined setting
    expect(await setSettingValue('unknown-setting', true)).toBeUndefined();
    expect(getSettingValue('unknown-setting')).toBeUndefined();

    // Getting default value when setting value is undefined
    await setSettingValue('showNotifications', undefined);
    expect(settings.showNotifications.value).toBeUndefined();
    expect(settings.showNotifications.defaultValue).toBeTruthy();
    expect(getSettingValue('showNotifications')).toBe(settings.showNotifications.defaultValue);

    done();
  });
});
