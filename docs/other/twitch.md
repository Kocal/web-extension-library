# Twitch

Methods for the [New Twitch API](https://dev.twitch.tv/docs/api/). 

:::tip
You first need to create a [Twitch application](https://glass.twitch.tv/console/apps)
:::

## Register API key

You need to register an API key to use the Twitch API.

```typescript
import { registerTwitchApiKey } from '@kocal/web-extension-library';

registerTwitchApiKey('<your api key>');
```

### Access the API key

:::warning
Normally you don't have to call this method by yourself, 
this is an internal method used by [`getTwitchGame`](#getting-information-on-a-game) or [`getTwitchLiveStreams`](#getting-live-streams).
:::

Returns the API key.
It throws an error if you forgot to call [`registerTwitchApiKey`](#register-api-keys).


```typescript
import { getTwitchApiKey } from '@kocal/web-extension-library';

getTwitchApiKey();
```

## OAuth

:::tip
You need to update your extension permissions, edit your `manifest.json` with:

```json
{
  "permissions": ["identity"]
}
```

You also need to configure the `redirect_uri` in your Twitch Application.
:::

Twitch now requires to pass a OAuth token for each requests.

The function `askTwitchAccessToken` will take cares of: 
- trigger the web auth flow to loggin on Twitch
- validate the access token
- handle expiration
- read and write to sync storage, to prevent unecessary Twitch API calls

```js
import { askTwitchAccessToken } from '@kocal/web-extension-library';

const accessToken = await askTwitchAccessToken();
```

Then you need to register it back to the library:

```js
import { registerTwitchAccessToken } from '@kocal/web-extension-library';

registerTwitchAccessToken(accessToken); 
```

## Getting information on a Game

```typescript
import { getTwitchGame } from '@kocal/web-extension-library';

getTwitchGame('21779')
  // If everything is fine
  .then(game => {
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

## Getting live streams

You must pass an array of user id. 
User id can be retrieved with [Get Users (Twitch API)](https://dev.twitch.tv/docs/api/reference/#get-users) and by specifying `login` query parameter.

For each online streams, a call to [`getTwitchGame`](#getting-information-on-a-game) is automatically made in order to make your life easier.

```typescript
import { getTwitchLiveStreams } from '@kocal/web-extension-library';

// https://twitch.tv/solary
const solaryUserId = 174955366;
// https://twitch.tv/solaryfortnite
const solaryFortniteUserId = 198506129;

getTwitchLiveStreams([solaryUserId, solaryFortniteUserId])
  .then(({ onlineStreams, offlineStreams }) => {
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
