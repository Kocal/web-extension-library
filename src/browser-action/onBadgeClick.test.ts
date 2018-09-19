import { onBadgeClick } from '.';

describe('onBadgeClick', () => {
  it('should works', () => {
    onBadgeClick((tab: chrome.tabs.Tab) => {
      tab.id;
    });
    expect(chrome.browserAction.onClicked.addListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
