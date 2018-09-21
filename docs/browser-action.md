---
sidebarDepth: 2
---

# Browser action & Badge

## Browser action

Methods related to [`chrome.browserAction`](https://developer.chrome.com/extensions/browserAction) API.

### Set title

Set the title of the browser action. This shows up in the tooltip.

```typescript
import { setBadgeTitle } from '@kocal/web-extension-library';

setBadgeTitle('My title');
setBadgeTitle('My other title', 123); // only for tab "123"
```

### Listen for a click

Fired when a browser action icon is clicked.

::: warning
This event will not fire if the browser action has a [popup](https://developer.chrome.com/extensions/browserAction#popups)
:::

```typescript
import { onBadgeClick } from '@kocal/web-extension-library';

onBadgeClick(() => {
  
})

onBadgeClick(tab => {
  // ...
})
```

## Badge

### Set badge color

You can pass a string, like a CSS value (`red`), long (`#ff0000`) or short (`#f00`) hexadecimal notation.

You can also pass an array of four integers in the range `[0, 255]`.

```typescript
import { setBadgeColor } from '@kocal/web-extension-library';

setBadgeColor('red');
setBadgeColor([255, 0, 0, 255]);
setBadgeColor('#ff0000', 123); // only for tab "123"
```

### Set badge text

Update badge text, only four characters can be displayed.

```typescript
import { setBadgeText } from '@kocal/web-extension-library';

setBadgeText('My text');
setBadgeText('My other text', 123); // only for tab "123"
```


## Agnostic methods

The following methods can be used when developing a web extension where you should display if a live (Twitch, YouTube, Dailymotion...) is online or offline.

### `markAsOffline()`

Shortcut to `setBadgeColor('gray'); setBadgeText('OFF');`

### `markAsOnline()`

Shortcut to `setBadgeColor('green'); setBadgeText('ON');`
