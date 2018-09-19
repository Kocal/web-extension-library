import { onNotificationClick } from '.';

describe('onNotificationClick', () => {
  it('should workd', () => {
    const cb = jest.fn();

    onNotificationClick(cb);
    expect(chrome.notifications.onClicked.addListener).toHaveBeenLastCalledWith(cb);
  });
});
