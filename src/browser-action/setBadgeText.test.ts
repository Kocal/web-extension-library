import { setBadgeText } from '.';

describe('setBadgeText', () => {
  it('should works', () => {
    setBadgeText('foo');
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'foo' });

    setBadgeText('bar', 1);
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'bar', tabId: 1 });
  });
});
