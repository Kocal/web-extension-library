import { onBadgeClick } from '.';

describe('browser-action', () => {
  describe('setBadgeColor', () => {
    it('should works', () => {
      onBadgeClick((tab: chrome.tabs.Tab) => {
        tab.id;
      });
      expect(chrome.browserAction.onClicked.addListener).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
