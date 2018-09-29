import { createNotification } from '.';

describe('createNotification', () => {
  it('should works', done => {
    const cb = jest.fn();

    createNotification({ type: 'basic', title: 'My title', message: 'My message' }).then(notificationId => {
      expect(browser.notifications.create).toHaveBeenLastCalledWith({
        type: 'basic',
        title: 'My title',
        message: 'My message',
      });
      expect(notificationId).toBe('generated-id'); // jest-web-extension-mock

      done();
    });
  });

  it('should pass notification id', done => {
    createNotification('my-id', { type: 'basic', title: 'My 2nd title', message: 'My 2nd message' }).then(
      notificationId => {
        expect(browser.notifications.create).toHaveBeenLastCalledWith('my-id', {
          type: 'basic',
          title: 'My 2nd title',
          message: 'My 2nd message',
        });
        expect(notificationId).toBe('my-id'); // jest-web-extension-mock

        done();
      }
    );
  });
});
