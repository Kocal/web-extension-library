import { createNotification } from '.';

describe('createNotification', () => {
  it('should works', async done => {
    const notificationId = await createNotification({ type: 'basic', title: 'My title', message: 'My message' });

    expect(notificationId).toBe('generated-id'); // jest-web-extension-mock
    expect(browser.notifications.create).toHaveBeenLastCalledWith({
      type: 'basic',
      title: 'My title',
      message: 'My message',
    });

    done();
  });

  it('should pass notification id', async done => {
    const notificationId = await createNotification('my-id', {
      type: 'basic',
      title: 'My 2nd title',
      message: 'My 2nd message',
    });

    expect(notificationId).toBe('my-id'); // jest-web-extension-mock
    expect(browser.notifications.create).toHaveBeenLastCalledWith('my-id', {
      type: 'basic',
      title: 'My 2nd title',
      message: 'My 2nd message',
    });

    done();
  });
});
