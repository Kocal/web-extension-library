module.exports = {
  title: 'Library, for web extensions',
  description: 'A set of functions used to easily write a web extension',
  serviceWorker: true,
  themeConfig: {
    repo: 'Kocal-Web-Extensions/library',
    docsDir: 'docs',
    editLinks: true,
    lastConfig: 'Last updated',
    serviceWorker: {
      updatePopup: true,
    },
    sidebar: [
      {
        collapsable: false,
        children: [
          'getting-started',
        ],
      },
      {
        title: 'Browser features',
        collapsable: false,
        children: [
          'browser-features/browser-action',
          'browser-features/notifications',
          'browser-features/tabs',
          'browser-features/storage',
        ],
      },
      {
        title: 'Other',
        collapsable: false,
        children: [
          'other/twitch',
        ],
      },
    ],
  },
};
