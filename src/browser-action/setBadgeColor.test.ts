import { setBadgeColor } from '.';

describe('browser-action', () => {
  describe('setBadgeColor', () => {
    it('should works', () => {
      setBadgeColor('red');
      expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: 'red' });

      setBadgeColor([255, 0, 0, 128], 1);
      expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: [255, 0, 0, 128], tabId: 1 });
    });
  });
});
