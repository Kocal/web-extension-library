/* tslint:disable: function-name */

import NotificationOptions = browser.notifications.NotificationOptions;

function _createNotification(notificationId: string, options: NotificationOptions): Promise<String>;
function _createNotification(options: NotificationOptions): Promise<String>;
function _createNotification(
  notificationId: string | NotificationOptions,
  options?: NotificationOptions
): Promise<String> {
  if (typeof notificationId === 'string') {
    return browser.notifications.create(notificationId, options as NotificationOptions);
  }

  return browser.notifications.create(notificationId as NotificationOptions);
}

export const createNotification = _createNotification;
