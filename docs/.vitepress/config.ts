import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Get-License',
  description: 'official documentation for Get-License.',
  base: '/get-license/',
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

    socialLinks: [{ icon: 'github', link: 'https://github.com/xxhls/get-license' }],
  },
});
