import axios from 'axios';
import { stringify as stringifyQueryParameters } from 'qs';
import {
  getTwitchGame,
  getTwitchApiKey,
  getTwitchAccessToken,
  askTwitchAccessToken,
  registerTwitchAccessToken,
} from '.';
import { isTwitchApiOAuthError } from './authorization';
import { Game } from './getTwitchGame';

export interface Stream {
  community_ids: string[];
  game_id: string;
  id: string;
  language: string;
  pagination: string;
  started_at: string;
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  viewer_count: number;
  // This will be automatically added :)
  game?: Game;
}

type Payload = { onlineStreams: Stream[]; offlineStreams: number[] };

export const getTwitchLiveStreams = (usersId: number[]): Promise<Payload> => {
  const url = `https://api.twitch.tv/helix/streams?${stringifyQueryParameters({ user_id: usersId })}`;
  const config = {
    headers: { 'Client-ID': getTwitchApiKey(), Authorization: `Bearer ${getTwitchAccessToken()}` },
  };

  return new Promise<Payload>(async (resolve) => {
    let response;
    try {
      response = await axios.get(url, config);
    } catch (error) {
      if (isTwitchApiOAuthError(error)) {
        registerTwitchAccessToken(await askTwitchAccessToken(true));
        return getTwitchLiveStreams(usersId).then(resolve);
      }
      throw error;
    }

    const streams: Stream[] = response.data.data;

    const onlineStreams = streams.filter((stream) => usersId.includes(Number(stream.user_id)));
    const offlineStreams = usersId.filter((userId) => streams.every((stream) => Number(stream.user_id) !== userId));

    const promises = onlineStreams.map(async (stream) => {
      stream.game = await getTwitchGame(stream.game_id);
    });

    await Promise.all(promises);
    resolve({ onlineStreams, offlineStreams });
  });
};
