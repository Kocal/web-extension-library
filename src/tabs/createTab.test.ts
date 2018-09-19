import { createTab } from '.';

describe('tabs', () => {
  describe('createTab', () => {
    it('should works', () => {
      const createProperties = { url: 'https://google.com' };
      createTab(createProperties);
      expect(chrome.tabs.create).toHaveBeenLastCalledWith(createProperties, undefined);

      const cb = jest.fn();
      createTab(createProperties, cb);
      expect(chrome.tabs.create).toHaveBeenLastCalledWith(createProperties, cb);
      expect(cb).toHaveBeenCalled();
    });
  });
});
