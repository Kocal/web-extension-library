import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { stringify as stringifyQueryParameters } from 'qs';
import { getTwitchLiveStreams, registerTwitchApiKeys } from '.';

registerTwitchApiKeys(['82ehz5kq1xe2nha3b4z9qjnjn4tim8t']);

const solaryUserId = 174955366;
const solaryFortniteUserId = 198506129;

const axiosMock = new axiosMockAdapter(axios);
axiosMock
  .onGet(
    `https://api.twitch.tv/helix/streams?${stringifyQueryParameters({ user_id: [solaryUserId, solaryFortniteUserId] })}`
  )
  .replyOnce(200, require('./__fixtures__/getTwitchliveStreams/response.json'))
  .onAny()
  .passThrough();

describe('getTwitchLiveStreams', () => {
  it('Solary should be online, Solary Fortnite should be offline', done => {
    getTwitchLiveStreams([solaryUserId, solaryFortniteUserId]).then(({ onlineStreams, offlineStreams }) => {
      expect(offlineStreams).toEqual([198506129]);
      expect(onlineStreams).toEqual([
        {
          id: '30435956192',
          user_id: '174955366',
          game_id: '21779',
          community_ids: [],
          type: 'live',
          title: 'TIOO NUCLEAR SMURFING',
          viewer_count: 2169,
          started_at: '2018-09-20T07:01:47Z',
          language: 'fr',
          thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_solary-{width}x{height}.jpg',
          // 'game' is automatically fetched :)
          game: {
            id: '21779',
            name: 'League of Legends',
            box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
          },
        },
      ]);

      done();
    });
  });
});
