import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { stringify as stringifyQueryParameters } from 'qs';
import { getTwitchGame, registerTwitchAccessToken, registerTwitchApiKey } from '.';

registerTwitchApiKey('82ehz5kq1xe2nha3b4z9qjnjn4tim8t');
registerTwitchAccessToken('abc');

describe('getTwitchGame', () => {
  const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
  const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const axiosMock = new axiosMockAdapter(axios);

  beforeEach(() => {
    spySetItem.mockClear();
    spyGetItem.mockClear();
    axiosMock.reset();
  });

  it('should works', async (done) => {
    axiosMock.onGet(`https://api.twitch.tv/helix/games`, { params: { id: '21779' } }).reply(200, {
      data: [
        {
          id: '21779',
          name: 'League of Legends',
          box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
        },
      ],
    });

    const fetchedGame = await getTwitchGame('21779');
    const game = {
      id: '21779',
      name: 'League of Legends',
      box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
    };

    expect(localStorage.getItem).toHaveBeenLastCalledWith('_twitch_game_21779');
    expect(localStorage.getItem).toHaveLastReturnedWith(null);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('_twitch_game_21779', JSON.stringify(game));
    expect(fetchedGame).toEqual(game);

    done();
  });

  it('should read game from local storage', async (done) => {
    const fetchedGame = await getTwitchGame('21779');
    const game = {
      id: '21779',
      name: 'League of Legends',
      box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg',
    };

    expect(localStorage.getItem).toHaveBeenLastCalledWith('_twitch_game_21779');
    expect(localStorage.getItem).toHaveLastReturnedWith(JSON.stringify(game));
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(fetchedGame).toEqual(game);

    done();
  });

  it('should throw an error if game does not exist', async (done) => {
    axiosMock.onGet(`https://api.twitch.tv/helix/games`, { params: { id: '12345678' } }).reply(200, {
      data: [],
    });

    try {
      await getTwitchGame('12345678');
    } catch (err) {
      expect(err).toEqual(new Error(`Twitch Game "12345678" does not exist.`));
      done();
    }
  });
});
