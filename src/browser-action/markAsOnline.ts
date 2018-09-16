import { setBadgeColor } from './setBadgeColor';
import { setBadgeText } from './setBadgeText';

export const markAsOnline = (): void => {
  setBadgeColor('green');
  setBadgeText('ON');
};
