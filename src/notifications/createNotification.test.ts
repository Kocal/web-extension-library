import { createNotification } from '.';

describe('notifications', () => {
  describe('createNotification', () => {
    it('should works', () => {
      const options = { title: 'My title' };
      const cb = jest.fn();

      createNotification(options, cb);
      expect(chrome.notifications.create).toHaveBeenLastCalledWith(options, cb);
      expect(cb).toHaveBeenLastCalledWith('generated-id'); // jest-websocket-mock
    });

    it('should pass notification id', () => {
      const notificationId = 'custom-notification-id';
      const options = { title: 'My title' };
      const cb = jest.fn();

      createNotification(notificationId, options, cb);
      expect(chrome.notifications.create).toHaveBeenLastCalledWith(notificationId, options, cb);
      expect(cb).toHaveBeenLastCalledWith(notificationId); // jest-websocket-mock
    });
  });
});
