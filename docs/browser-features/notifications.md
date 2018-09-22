# Notifications

:::tip
Don't forget to update your extension permissions, edit your `manifest.json` with:

```json
{
  "permissions": ["notifications"]
}
```
:::

## Create a notification

Creates and displays a notification.

Notification can be configured with an `options` object of type [`NotificationOptions`](https://developer.chrome.com/extensions/notifications#type-NotificationOptions).

```typescript
import { createNotification } from '@kocal/web-extension-library';

// Options for a basic notification
const options = {
  type: 'basic',
  title: 'Hey, you!',
  message: 'You are reading a documentation built with VuePress!',
  iconUrl: '/icon/vue-press.png',
};

createNotification(options);
createNotification(options, notificationId => {
  // `notificationId` is automatically generated
});
createNotification('my-notification-id', options, notificationId => {
  // `notificationId` equals `my-notification-id`
});
```

## Listen for a click

The user clicked in a non-button area of the notification.


```typescript
import { onNotificationClick } from '@kocal/web-extension-library';

onNotificationClick(notificationId => {
  // ...
});
```
