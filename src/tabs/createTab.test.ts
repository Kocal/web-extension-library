import { createTab } from '.';

describe('createTab', () => {
  it('should works', async done => {
    const createProperties = { url: 'https://google.com' };

    await createTab(createProperties);
    expect(browser.tabs.create).toHaveBeenLastCalledWith(createProperties);

    done();
  });
});
