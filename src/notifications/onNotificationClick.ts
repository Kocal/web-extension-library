export const onNotificationClick = (callback: (notificationId: string) => void): void =>
  chrome.notifications.onClicked.addListener(callback);
