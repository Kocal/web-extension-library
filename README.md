Library
=======

[![npm version](https://badge.fury.io/js/%40kocal%2Fweb-extension-library.svg)](https://badge.fury.io/js/%40kocal%2Fweb-extension-library)
[![Build Status](https://travis-ci.com/Kocal-Web-Extensions/library.svg?branch=master)](https://travis-ci.com/Kocal-Web-Extensions/library)
[![codecov](https://codecov.io/gh/Kocal-Web-Extensions/library/branch/master/graph/badge.svg)](https://codecov.io/gh/Kocal-Web-Extensions/library)

> A set of functions used to easily write a web extension

[Documentation](https://kocal-web-extensions.github.io/library/).

Usage
-----

### Tabs

#### `createTab(createProperties: CreateProperties, cb?: (tab: Tab) => void)`

```typescript
import { createTab } from '@kocal/web-extension-library';

createTab({ url: 'https://google.com' });
createTab({ url: 'https://google.com' }, (tab) => {
  // ...
});
```

### Twitch

#### `registerApiKeys(apiKeys: string[])`

```typescript
import { registerApiKeys } from '@kocal/web-extension-library';

registerApiKeys(['...', '...']);
```

#### `pickTwitchApiKey()`

```typescript
import { pickTwitchApiKey } from '@kocal/web-extension-library';

pickTwitchApiKey();
```

#### `getTwitchGame(gameId: string)`

```typescript
import { getTwitchGame } from '@kocal/web-extension-library';

getTwitchGame('21779')
  // If everything is fine
  .then((game) => {
    // {
    //   id: '21779',
    //   name: 'League of Legends',
    //   box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
    // }
  })
  // If game does not exist
  .catch(err => {
    // 'Twitch Game "21779" does not exist.'
  });
```

#### `getTwitchLiveStreams(usersId: number[])`

For each online streams, a call to [`getTwitchGame`](#gettwitchgamegameid-string) is automatically made.

```typescript
import { getTwitchLiveStreams } from '@kocal/web-extension-library';

const solaryUserId = 174955366;
const solaryFortniteUserId = 198506129;

getTwitchLiveStreams([solaryUserId, solaryFortniteUserId]).then(({ onlineStreams, offlineStreams }) => {
    console.log(offlineStreams); // [198506129], Solary Fortnite is offline
    console.log(onlineStreams);
    // [
    //   {
    //     id: '30435956192',
    //     user_id: '174955366',
    //     game_id: '21779',
    //     community_ids: [],
    //     type: 'live',
    //     title: 'TIOO NUCLEAR SMURFING',
    //     viewer_count: 2169,
    //     started_at: '2018-09-20T07:01:47Z',
    //     language: 'fr',
    //     thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_solary-{width}x{height}.jpg',
    //     game: {
    //       id: '21779',
    //       name: 'League of Legends',
    //       box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
    //     },
    //   },
    // ]
  })
```
