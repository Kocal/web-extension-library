import { setBadgeTitle } from '.';

describe('setBadgeTitle', () => {
  it('should works', () => {
    setBadgeTitle('foo');
    expect(chrome.browserAction.setTitle).toHaveBeenCalledWith({ title: 'foo' });

    setBadgeTitle('bar', 1);
    expect(chrome.browserAction.setTitle).toHaveBeenCalledWith({ title: 'bar', tabId: 1 });
  });
});
