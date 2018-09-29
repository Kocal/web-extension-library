import { markAsOffline } from '.';

describe('markAsOffline', () => {
  it('should works', () => {
    markAsOffline();
    expect(browser.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: 'gray' });
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'OFF' });
  });
});
