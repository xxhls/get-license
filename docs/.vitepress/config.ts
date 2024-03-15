import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Get-License',
  description: 'official documentation for Get-License.',
  base: '/get-license/',
  head: [['link', { rel: 'icon', href: '/get-license/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: 'License List',
        items: [
          { text: 'Apache License 2.0', link: '/Apache-License-2.0.md' },
          { text: 'GNU General Public License v3.0', link: '/GNU-General-Public-License-v3.0.md' },
          { text: 'MIT License', link: '/MIT-License.md' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/xxhls">xxhls</a>',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xxhls/get-license' }],
  },
  lastUpdated: true,
});
