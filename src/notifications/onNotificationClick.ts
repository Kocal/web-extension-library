export const onNotificationClick = (callback: (notificationId: string) => void): void =>
  browser.notifications.onClicked.addListener(callback);
