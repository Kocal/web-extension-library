import { setBrowserActionTitle } from '.';

describe('setBrowserActionTitle', () => {
  it('should works', () => {
    setBrowserActionTitle('foo');
    expect(chrome.browserAction.setTitle).toHaveBeenCalledWith({ title: 'foo' });

    setBrowserActionTitle('bar', 1);
    expect(chrome.browserAction.setTitle).toHaveBeenCalledWith({ title: 'bar', tabId: 1 });
  });
});
