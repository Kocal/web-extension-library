import { InterfaceSettings } from '..';

export default {
  showNotifications: {
    type: 'boolean',
    label: 'Notifications',
    defaultValue: true,
    children: {
      atBoot: {
        type: 'boolean',
        label: 'At browser boot',
        defaultValue: true,
      },
      onTitleUpdate: {
        type: 'boolean',
        label: 'At each show',
        help: 'Display a notification when a stream updates its title',
        defaultValue: false,
      },
    },
  },
} as InterfaceSettings;
