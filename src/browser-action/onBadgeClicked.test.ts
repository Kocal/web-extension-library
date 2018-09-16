import { onBadgeClicked } from '.';

describe('browser-action', () => {
  describe('setBadgeColor', () => {
    it('should works', () => {
      onBadgeClicked((tab: chrome.tabs.Tab) => {
        tab.id;
      });
      expect(chrome.browserAction.onClicked.addListener).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
