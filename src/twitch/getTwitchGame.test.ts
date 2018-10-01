import { getTwitchGame, registerTwitchApiKeys } from '.';

registerTwitchApiKeys(['82ehz5kq1xe2nha3b4z9qjnjn4tim8t']);

describe('getTwitchGame', () => {
  const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
  const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');

  beforeEach(() => {
    spySetItem.mockClear();
    spyGetItem.mockClear();
  });

  it('should works', async done => {
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

  it('should read game from local storage', async done => {
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

  it('should throw an error if game does not exist', async done => {
    try {
      await getTwitchGame('12345678');
    } catch (err) {
      expect(err).toEqual(new Error(`Twitch Game "12345678" does not exist.`));
      done();
    }
  });
});
