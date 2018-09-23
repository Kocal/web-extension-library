import { readFromStorage, writeToStorage } from '.';

describe('storage', () => {
  const spyWrite = jest.spyOn(Storage.prototype, 'setItem');
  const spyRead = jest.spyOn(Storage.prototype, 'getItem');

  describe('without ttl', () => {
    writeToStorage('my-key', { foo: 'bar' });
    expect(spyWrite).toHaveBeenLastCalledWith('my-key', '{"data":{"foo":"bar"}}');
    expect(spyWrite).toHaveLastReturnedWith(undefined);

    const data = readFromStorage('my-key');
    expect(data).toEqual({ foo: 'bar' });
    expect(spyRead).toHaveBeenLastCalledWith('my-key');
    expect(spyRead).toHaveLastReturnedWith('{"data":{"foo":"bar"}}');

    expect(readFromStorage('i-do-not-exist')).toBeNull();
  });

  describe('with ttl', () => {
    const ttl = 60;
    const timestamp = +new Date(2018, 1, 1, 1, 0);
    const expiredTimestamp = timestamp + 1000 * (ttl + 1); // expire by 1 sec

    test('write', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => timestamp);

      writeToStorage('my-2nd-key', { foo: 'bar' }, ttl);
      expect(spyWrite).toHaveBeenLastCalledWith(
        'my-2nd-key',
        `{"data":{"foo":"bar"},"timestamp":${timestamp / 1000 + ttl}}`
      );
      expect(spyWrite).toHaveLastReturnedWith(undefined);
    });

    test('it should not be expired', () => {
      const data = readFromStorage('my-2nd-key');
      expect(data).toEqual({ foo: 'bar' });
      expect(spyRead).toHaveBeenLastCalledWith('my-2nd-key');
      expect(spyRead).toHaveLastReturnedWith(`{"data":{"foo":"bar"},"timestamp":${timestamp / 1000 + ttl}}`);
    });

    test('it should be expired', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => expiredTimestamp);

      const data = readFromStorage('my-2nd-key');
      expect(data).toBeNull();
      expect(spyRead).toHaveBeenLastCalledWith('my-2nd-key');
      expect(spyRead).toHaveLastReturnedWith(`{"data":{"foo":"bar"},"timestamp":${timestamp / 1000 + ttl}}`);
    });
  });
});
