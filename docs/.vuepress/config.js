module.exports = {
  title: 'Library, for web extensions',
  description: 'A set of functions used to easily write a web extension',
  base: '/library',
  serviceWorker: true,
  themeConfig: {
    repo: 'Kocal-Web-Extensions/library',
    editLinks: true,
    docsDir: 'docs',
    sidebar: [
      {
        children: [
          'getting-started',
        ],
      },
      {
        title: 'Browser features',
        collapsable: false,
        children: [
          '/browser-features/browser-action',
          '/browser-features/notifications',
          '/browser-features/tabs',
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
