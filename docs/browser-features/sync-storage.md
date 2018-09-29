# Sync storage

It uses [synchronized storage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync) under the hood.

:::tip
Don't forget to update your extension permissions, edit your `manifest.json` with:

```json
{
  "permissions": ["storage"]
}
```
:::

:::warning
If you are writing a web extension for Firefox, you must set an ID for your extension using the [applications](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/applications) manifest.json key.

```json
{
  "applications": {
    "gecko": {
      "id": "<your extension ID>"
    }
  }
}
```
:::

## Usage

```typescript
import { writeToSyncStorage, readFromSyncStorage } from '@kocal/web-extension-library';

// Write
writeToSyncStorage({ fruits: ['apple', 'banana'], vegetables: ['carrot'] })
  .then(() => console.log('Items have been stored'))
  .catch(err => console.error(err));
    
// Read an item
readFromSyncStorage('fruits')
  .then(items => {
    console.log(items); // { fruits: ['apple', 'banana'] }
  })
  .catch(err => console.error(err));

// Read every items 
readFromSyncStorage()
  .then(items => {
    console.log(items); // { fruits: ['apple', 'banana'], vegetables: ['carrot'] }
  })
  .catch(err => console.error(err));
```
