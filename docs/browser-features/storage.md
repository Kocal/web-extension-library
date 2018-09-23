# Storage

It uses [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) under the hood with data expiration support.

:::warning
Your data should be able to be JSON stringified.
:::

## Usage

```typescript
import { writeToStorage, readFromStorage } from '@kocal/web-extension-library';

// scalar value
writeToStorage('key', 'my data');
readFromStorage('key'); // `my data`

// object
writeToStorage('key', { my: 'data'});
readFromStorage('key'); // `{ my: 'data' }`

// will expires in 60 seconds
writeToStorage('key', 'my data', 60);
readFromStorage('key'); // `my data`
// ... 60 seconds later..
readFromStorage('key'); // `null`
```
