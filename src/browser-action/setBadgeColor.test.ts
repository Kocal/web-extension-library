import { setBadgeColor } from '.';

describe('setBadgeColor', () => {
  it('should works', () => {
    setBadgeColor('red');
    expect(browser.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: 'red' });

    setBadgeColor([255, 0, 0, 128], 1);
    expect(browser.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: [255, 0, 0, 128], tabId: 1 });
  });
});
