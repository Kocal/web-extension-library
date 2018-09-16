import { setActionTitle } from '.';

describe('browser-action', () => {
  describe('setActionTitle', () => {
    it('should works', () => {
      global.console.log = jest.fn();
      setActionTitle('foo');
      expect(global.console.log).toHaveBeenCalledWith({ title: 'foo' });
    });
  });
});
