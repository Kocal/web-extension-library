import { markAsOffline } from '.';

describe('browser-action', () => {
  describe('markeAsOffline', () => {
    it('should works', () => {
      markAsOffline();
      expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: 'gray' });
      expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'OFF' });
    });
  });
});
