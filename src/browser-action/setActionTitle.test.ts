import { setActionTitle } from '.';

describe('browser-action', () => {
  describe('setActionTitle', () => {
    it('should works', () => {
      global.alert = jest.fn();
      setActionTitle('foo');
      expect(global.alert).toHaveBeenCalledWith({ title: 'foo' });
    });
  });
});
