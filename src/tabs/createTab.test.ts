import { createTab } from '.';

describe('createTab', () => {
  it('should works', done => {
    const createProperties = { url: 'https://google.com' };

    createTab(createProperties).then(() => {
      expect(browser.tabs.create).toHaveBeenLastCalledWith(createProperties);

      done();
    });
  });
});
