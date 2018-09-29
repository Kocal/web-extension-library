import { markAsOnline } from '.';

describe('markAsOnline', () => {
  it('should works', () => {
    markAsOnline();
    expect(browser.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: 'green' });
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'ON' });
  });
});
