import axios from 'axios';
import { pickTwitchApiKey } from '.';

export interface Game {
  id: string;
  name: string;
  box_art_url: string;
}

const readFromCache = (id: string): Game | null => JSON.parse(localStorage.getItem(`_twitch_game_${id}`) || null);
const writeToCache = (game: Game): void => localStorage.setItem(`_twitch_game_${game.id}`, JSON.stringify(game));

const sendRequest = async (id: string): Promise<Game | null> => {
  const config = {
    headers: { 'Client-ID': pickTwitchApiKey() },
    params: { id },
  };

  const response = await axios.get(`https://api.twitch.tv/helix/games`, config);

  return Promise.resolve(response.data.data[0] || null);
};

export const getTwitchGame = (id: string): Promise<Game> => {
  return new Promise<Game>(async (resolve, reject) => {
    const cachedGame = readFromCache(id);

    if (cachedGame !== null) {
      return resolve(cachedGame);
    }

    const game = await sendRequest(id);

    if (game === null) {
      return reject(new Error(`Twitch Game "${id}" does not exist.`));
    }

    writeToCache(game);
    resolve(game);
  });
};
