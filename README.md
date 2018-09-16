Library
=======

[![npm version](https://badge.fury.io/js/%40kocal%2Fweb-extension-library.svg)](https://badge.fury.io/js/%40kocal%2Fweb-extension-library)
[![Build Status](https://travis-ci.com/Kocal-Web-Extensions/library.svg?branch=master)](https://travis-ci.com/Kocal-Web-Extensions/library)
[![codecov](https://codecov.io/gh/Kocal-Web-Extensions/library/branch/master/graph/badge.svg)](https://codecov.io/gh/Kocal-Web-Extensions/library)

> A set of functions used for easily write a web extension

Requirements
------------

- Node.js
- NPM or Yarn
- TypeScript

Installation
------------

```bash
$ npm install @kocal/web-extension-library
```

Usage
-----

### Browser action

#### `setBadgeColor(color: string | chrome.browserAction.ColorArray, tabId?: number)`

```typescript
import { setBadgeColor } from '@kocal/web-extension-library';

setBadgeColor('red');
setBadgeColor([255, 0, 0, 255], 123);
```

#### `setBadgeText(text: string, tabId?: number)`

```typescript
import { setBadgeText } from '@kocal/web-extension-library';

setBadgeText('Text');
setBadgeText('Text for a specific tab', 123);
```

#### `setBadgeTitle(title: string, tabId?: number)`

```typescript
import { setBadgeTitle } from '@kocal/web-extension-library';

setBadgeTitle('My title');
setBadgeTitle('My title for a specific tab', 123);
```

#### Agnostic methods

##### `markAsOffline()`

Shortcut to `setBadgeColor('gray'); setBadgeText('OFF');`

##### `markAsOnline()`

Shortcut to `setBadgeColor('green'); setBadgeText('ON');`
