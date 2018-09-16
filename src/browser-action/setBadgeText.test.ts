import { setBadgeText } from '.';

describe('browser-action', () => {
  describe('setBadgeText', () => {
    it('should works', () => {
      setBadgeText('foo');
      expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'foo' });

      setBadgeText('bar', 1);
      expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'bar', tabId: 1 });
    });
  });
});
