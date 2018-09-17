import { markAsOffline, markAsOnline, onBadgeClicked, setBadgeColor, setBadgeText, setBadgeTitle } from '@kocal/web-extension-library';

((): any => {
  markAsOffline();
  markAsOnline();

  onBadgeClicked((tab: chrome.tabs.Tab) => {
    alert(`Badge has been clicked on tab "${tab.id}"`);
  });

  setBadgeColor('red');
  setBadgeColor('red', 123);
  setBadgeColor([255, 0, 0, 255]);
  setBadgeColor([255, 0, 0, 255], 123);

  setBadgeText('My text');
  setBadgeText('My text on another tab', 123);

  setBadgeTitle('My title');
  setBadgeTitle('My title on another tab', 123);
})();
