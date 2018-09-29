import { onBrowserActionClick } from '.';

describe('onBrowserActionClick', () => {
  it('should works', () => {
    onBrowserActionClick((tab: browser.tabs.Tab) => {
      tab.id;
    });
    expect(browser.browserAction.onClicked.addListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
