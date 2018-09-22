# Tabs

:::tip
Don't forget to update your extension permissions, edit your `manifest.json` with:

```json
{
  "permissions": ["tabs"]
}
```
:::

## Create a tab

Creates a new tab.

```typescript
import { createTab } from '@kocal/web-extension-library';

createTab({ url: 'https://google.com' });
createTab({ url: 'https://google.com' }, tab => {
  // ...
});

// Full configuration, all options are optional
createTab({
  url: 'https://google.com', // open the New Tab Page if not specified
  windowId: 423462100, // the window in which to create the new tab, default to the current window
  index: 0, // the position the tab should take in the window, default to the last tab
  active: true, // the tab will become the active tab in the window, default to `true`
  pinned: false, // the tab will be marked as pinned or not, default to `false` 
})
```
