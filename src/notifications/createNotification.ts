/* tslint:disable: function-name */

import NotificationOptions = chrome.notifications.NotificationOptions;

type callback = (notificationId: string) => void;

function _createNotification(notificationId: string, options: NotificationOptions, cb?: callback): void;
function _createNotification(options: NotificationOptions, cb?: callback): void;
function _createNotification(
  notificationIdOrOptions: string | NotificationOptions,
  optionsOrCb: NotificationOptions | callback,
  cb?: (notificationId: string) => void
): void {
  if (typeof notificationIdOrOptions === 'string') {
    chrome.notifications.create(notificationIdOrOptions, optionsOrCb as NotificationOptions, cb);
    return;
  }

  chrome.notifications.create(notificationIdOrOptions as NotificationOptions, optionsOrCb as callback);
}

export const createNotification = _createNotification;
