// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'rastislavcore', // Your GitHub org/user name. (This is the only required config)
    sponsorship: true, // Set to true to enable GitHub Sponsors link
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'GitHub Commits',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        type: 'commits', // 'commits' will display user's commit, 'projects' will display projects by user.
        sortBy: 'committer-date', // Sort projects by 'stars', 'updated' or 'committer-date'.
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: {
    title: 'Rastislav ₡ore — Contacts, Portfolio & Blog',
    description: 'Portfolio of Rastislav ₡ore. Blockchain Engineer, Software Developer, and Open Source Contributor.',
    imageURL: '',
    githubId: '537310', // GitHub user id. To get your id, visit https://api.github.com/users/<username>
    payto: {
      property: 'ican/xcb',
      content: 'cb2266fec7f127e2f884f0fbbcbf45dfd6fad5401922',
    },
  },
  social: {
    linkedin: 'rastislavcore',
    twitter: 'rastislavcore',
    fediverse: '@rastislav@coretalk.space',
    researchGate: '',
    facebook: '',
    tiktok: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: 'rastislavcore',
    stackoverflow: '', // example: '1/jeff-atwood'
    wiki: '',
    skype: '',
    telegram: '',
    website: 'https://github.com/rastislavcore',
    phone: '',
    email: 'rastislav@onion.email?subject=Contact%20from%20portfolio&key=https%3A%2F%2Fkeys.openpgp.org%2Fvks%2Fv1%2Fby-fingerprint%2FF670A2D3626AB878A46D7AA8879FF4E05B438A11',
    payto: 'payto://xcb/cb2266fec7f127e2f884f0fbbcbf45dfd6fad5401922?rc=m&donate=1&org=vasicka.eu&item=green+circles+%F0%9F%9F%A2&color-b=37c848', // visit https://payto.money/ to generate your payto link
    coreid: '', // visit https://corepass.net/ to create your Core ID
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },
  publicKey: {
    fileUrl:
      'https://keys.openpgp.org/vks/v1/by-fingerprint/F670A2D3626AB878A46D7AA8879FF4E05B438A11', // Empty publickey will hide the `Download Public key` button.
  },
  skills: [
    'Blockchain',
    'DeFi',
    'DePIN',
    'Smart Contracts',
    'RWA',
    'Rust',
    'Golang',
    'TypeScript',
    'Web4',
    'CyberSec',
  ],
  experiences: [
    {
      company: 'ARAX',
      position: 'CTO',
    },
    {
      company: 'CoDeTech',
      position: 'CIO',
    },
    {
      company: 'CORE FOUNDATION',
      position: 'Founder',
    },
    {
      company: 'Blockchain Hub',
      position: 'Founder',
    },
  ],
  certifications: [],
  educations: [],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'rastislavcore', // to hide blog section, keep it empty
    limit: 4, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  themeConfig: {
    defaultTheme: 'light',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a
    class="text-primary"
    href="https://github.com/rastislavcore/gitprofile"
    target="_blank"
    rel="noreferrer"
  >Magic & Tweaks 🪄</a>`,

  enablePWA: true,

  // GitHub Graph
  githubGraph: true,
};

export default CONFIG;
