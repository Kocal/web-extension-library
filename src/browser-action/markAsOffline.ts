import { setBadgeColor } from './setBadgeColor';
import { setBadgeText } from './setBadgeText';

export const markAsOffline = (): void => {
  setBadgeColor('gray');
  setBadgeText('OFF');
};
