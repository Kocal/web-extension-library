import { onBrowserActionClick } from '.';

describe('onBrowserActionClick', () => {
  it('should works', () => {
    onBrowserActionClick((tab: chrome.tabs.Tab) => {
      tab.id;
    });
    expect(chrome.browserAction.onClicked.addListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
