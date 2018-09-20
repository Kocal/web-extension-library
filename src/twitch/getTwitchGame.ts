import axios, { AxiosResponse } from 'axios';
import { pickTwitchApiKey } from '.';

interface Game {
  id: string;
  name: string;
  box_art_url: string;
}

const readFromCache = (id: string): Game | null => JSON.parse(localStorage.getItem(`_twitch_game_${id}`) || null);
const writeToCache = (game: Game): void => localStorage.setItem(`_twitch_game_${game.id}`, JSON.stringify(game));

const sendRequest = (id: string): Promise<Game | null> => {
  const config = {
    headers: { 'Client-ID': pickTwitchApiKey() },
    params: { id },
  };

  return axios
    .get(`https://api.twitch.tv/helix/games`, config)
    .then((response: AxiosResponse) => response.data)
    .then((payload: { data: Game[] }) => payload.data[0] || null);
};

export const getTwitchGame = (id: string): Promise<Game> => {
  return new Promise<Game>((resolve, reject) => {
    const cachedGame = readFromCache(id);

    if (cachedGame !== null) {
      return resolve(cachedGame);
    }

    sendRequest(id).then((game: Game | null) => {
      if (game === null) {
        return reject(new Error(`Twitch Game "${id}" does not exist.`));
      }

      writeToCache(game);
      resolve(game);
    });
  });
};
