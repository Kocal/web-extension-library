import { setBrowserActionTitle } from '.';

describe('setBrowserActionTitle', () => {
  it('should works', () => {
    setBrowserActionTitle('foo');
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: 'foo' });

    setBrowserActionTitle('bar', 1);
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: 'bar', tabId: 1 });
  });
});
