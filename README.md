# GitProfile

GitProfile is a powerful portfolio builder that allows you to create a stunning and personalized portfolio site in minutes, even if you have no coding experience. Simply provide your GitHub username, and GitProfile will automatically generate a portfolio. Best of all, you can easily deploy your portfolio to GitHub Pages with just a few clicks, making it accessible to the world in no time.

## Features

✓ [Easy to Setup](#-installation--setup)
✓ [33 Themes](#themes)
✓ [Google Analytics](#google-analytics)
✓ [SEO](#seo)
✓ [PWA](#pwa)
✓ [Avatar and Bio](#avatar-and-bio)
✓ [Social Links](#social-links)
✓ [Skill Section](#skills)
✓ [Experience Section](#experience)
✓ [Certification Section](#certifications)
✓ [Education Section](#education)
✓ [Projects Section](#projects)
✓ [Publication Section](#publications)
✓ [Blog Posts Section](#blog-posts)

To view a live example, **[click here](https://vasicka.eu)**.

Open GitProfile code in **IDX**: [![Open in IDX](https://cdn.idx.dev/btn/open_purple_20.svg)](https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Frastislavcore%2Fgitprofile)

## 🛠 Installation & Setup

There are two ways to use **GitProfile**:

- [Forking this repo _(recommended)_](#forking-this-repo)
- [Setting up locally](#setting-up-locally)

### Forking this repo

These instructions will get you a copy of the project and deploy your portfolio online using GitHub Pages!

- **Fork repo:** Click [here](https://github.com/rastislavcore/gitprofile/fork) to fork the repo so you have your own project to customize. A "fork" is a copy of a repository.
- **Rename repo:**
  - If you want to host your portfolio at `https://<USERNAME>.github.io`, rename your forked repository to `username.github.io` in GitHub, where `username` is your GitHub username (or organization name).
  - If you want to host your portfolio at `https://<USERNAME>.github.io/<REPO_NAME>` (e.g. `https://<USERNAME>.github.io/portfolio`), rename your forked repository to `<REPO_NAME>` (e.g. `portfolio`) in GitHub.
- **Enable workflows:** Go to your repo's **Actions** tab and enable workflows.

  ![Workflows](https://github.com/rastislavcore/gitprofile/assets/45073703/7e82f7d4-900c-4cb9-83f9-bcaa1ca2b910)

- **Base Value:** Open `gitprofile.config.ts`, and change `base`'s value.

  - If you are deploying to `https://<USERNAME>.github.io`, set `base` to `'/'`.

  - If you are deploying to `https://<USERNAME>.github.io/<REPO_NAME>` (e.g. `https://<USERNAME>.github.io/portfolio`), then set `base` to `'/<REPO_NAME>/'` (e.g. `'/portfolio/'`).

  ```ts
  // gitprofile.config.ts
  {
    base: '/',
    // ...
  }
  ```

- **Commit the changes:** Now commit to your **main** branch with your changes. Wait a few minutes so that the CI/CD pipeline can publish your website to GitHub Pages. You can check the progress in the [Actions](https://github.com/rastislavcore/gitprofile/actions) tab.

Your portfolio website will be live shortly. Any time you commit a change to the **main** branch, the website will be automatically updated. If you face any issue viewing the website, double-check the `base` value in the `gitprofile.config.ts` file. Also, check if **Source** is set to **GitHub Actions** in **Settings** ➜ **Pages** ➜ **Build and deployment**.

If you wish to add a custom domain, no CNAME file is required. Just add it to your repo's **Settings** ➜ **Pages** ➜ **Custom domain**.

As this is a Vite project, you can also host your website to Netlify, Vercel, Heroku, or other popular services. Please refer to this [doc](https://vitejs.dev/guide/static-deploy.html) for a detailed deployment guide to other services.

### Setting up locally

- Clone the project and change directory.

  ```shell
  git clone https://github.com/rastislavcore/gitprofile.git
  cd gitprofile
  ```

- Install dependencies.

  ```shell
  npm install
  ```

- Run dev server.

  ```shell
  npm run dev
  ```

- Finally, visit `http://localhost:5173/` from your browser.

> Alternatively, you can set up and run the project using Docker with **[Vail](https://github.com/rastislavcore/vail)**, a powerful tool for local development of JavaScript/TypeScript Apps.

### Dependencies

The project uses React 19 and requires Node.js 18 or higher. Key dependencies include:

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "vite": "^6.0.7"
}
```

## 🎨 Customization

All the magic happens in the file `gitprofile.config.ts`. Open it and modify it according to your preference.

You can leave most of the sections empty if you don't want to display them on your portfolio.

```ts
// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'rastislavcore', // Your GitHub org/user name. (This is the only required config)
    sponsorship: false, // Show GitHub Sponsorship tab?
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/rastislavcore/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/rastislavcore/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'GitHub Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        type: 'projects', // 'commits' will display user's commit, 'projects' will display projects by user.
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['rastislavcore/my-project1', 'rastislavcore/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['rastislavcore/gitprofile', 'rastislavcore/pandora'], // List of repository names to display. example: ['rastislavcore/my-project1', 'rastislavcore/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
      ],
    },
  },
  seo: {
    title: 'Portfolio of Ariful Alam',
    description: '',
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
    medium: 'rastislavcore',
    dev: 'rastislavcore',
    stackoverflow: '', // example: '1/jeff-atwood'
    wiki: '',
    skype: '',
    telegram: '',
    website: 'https://github.com/rastislavcore',
    phone: '',
    email: 'rastislav@onion.email?subject=Contact%20from%20portfolio&key=https%3A%2F%2Fkeys.openpgp.org%2Fvks%2Fv1%2Fby-fingerprint%2FF670A2D3626AB878A46D7AA8879FF4E05B438A11',
    payto: 'xcb/cb2266fec7f127e2f884f0fbbcbf45dfd6fad5401922', // visit https://payto.money/ to generate your payto link
    coreid: '', // visit https://corepass.net/ to create your Core ID
  },
  resume: {
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  publicKey: {
    fileUrl: '', // Empty publickey will hide the `Download Public key` button.
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
  ],
  experiences: [
    {
      company: 'Company Name',
      position: 'Position',
      from: 'September 2021',
      to: 'Present',
      companyLink: 'https://example.com',
    },
    {
      company: 'Company Name',
      position: 'Position',
      from: 'July 2019',
      to: 'August 2021',
      companyLink: 'https://example.com',
    },
  ],
  certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com',
    },
  ],
  educations: [
    {
      institution: 'Institution Name',
      degree: 'Degree',
      from: '2015',
      to: '2019',
    },
    {
      institution: 'Institution Name',
      degree: 'Degree',
      from: '2012',
      to: '2014',
    },
  ],
  publications: [
    {
      title: 'Publication Title',
      conferenceName: '',
      journalName: 'Journal Name',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
    },
    {
      title: 'Publication Title',
      conferenceName: 'Conference Name',
      journalName: '',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'rastislavcore', // to hide blog section, keep it empty
    limit: 3, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  themeConfig: {
    defaultTheme: 'nord',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with Magic & Tweaks 🪄`,

  enablePWA: true,

  // GitHub Graph
  githubGraph: true,
};

export default CONFIG;
```

### Themes

33 themes are available to be selected from the dropdown.

The default theme can be specified.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  themeConfig: {
    defaultTheme: 'light',
    // ...
  },
};
```

You can create your own custom theme by modifying these values. Theme is set in css by using `@theme` directive. Look at `src/styles/index.css` for more details. We use Tailwind CSS 4 for the theme.

### Google Analytics

**GitProfile** supports both GA3 and GA4. If you do not want to use Google Analytics, keep the `id` empty.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  googleAnalytics: {
    id: 'G-XXXXXXXXX',
  },
};
```

Besides tracking visitors, it will track `click events` on projects and blog posts, and send them to Google Analytics.

### SEO

You can customize the meta tags for SEO in `seo`.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  seo: {
    title: 'Rastislav₡ore — Contacts, Portfolio & Blog',
    description: '',
    imageURL: '',
    githubId: '537310', // GitHub user id. To get your id, visit https://api.github.com/users/<username>
    payto: {
      property: 'ican/xcb',
      content: 'cb2266fec7f127e2f884f0fbbcbf45dfd6fad5401922',
    },
  },
};
```

`githubId` is required to fetch your avatar as favicon image and SEO from GitHub. To get your id, visit `https://api.github.com/users/<username>`.

### PWA

GitProfile is PWA enabled. The site can be installed as a Progressive Web App. To turn it off, set `enablePWA` to `false`.

![PWA](https://github.com/arifszn/gitprofile/assets/45073703/9dc7cc5c-4262-4445-a7a5-1e3566ef43fa)

### Avatar and Bio

Your avatar and bio will be fetched from GitHub automatically.

### Social Links

You can link to the social media services you're using, including LinkedIn, Twitter, Fediverse, ResearchGate, Facebook, Instagram, Reddit, Threads, YouTube, Udemy, Dribbble, Behance, Medium, Dev, Stack Overflow, Skype, Telegram, personal website, phone, and email.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
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
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '',
    wiki: '',
    skype: '',
    telegram: '',
    website: '',
    phone: '',
    email: '',
  },
};
```

### Skills

To showcase your skills provide them here.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  skills: ['JavaScript', 'React.js'],
};
```

Empty array will hide the skills section.

### Experience

Provide your job history in `experiences`.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  experiences: [
    {
      company: 'Company Name',
      position: 'Position',
      from: 'September 2021',
      to: 'Present',
      companyLink: 'https://example.com',
    },
    {
      company: 'Company Name',
      position: 'Position',
      from: 'July 2019',
      to: 'August 2021',
      companyLink: 'https://example.com',
    },
  ],
};
```

Empty array will hide the experience section.

### Education

Provide your education history in `educations`.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  educations: [
    {
      institution: 'Institution name 1',
      degree: 'Bachelor of Science',
      from: '2015',
      to: '2019',
    },
    {
      institution: 'Institution name 2',
      degree: 'Higher Secondary Certificate (HSC)',
      from: '2012',
      to: '2014',
    },
  ],
};
```

Empty array will hide the education section.

### Certifications

Provide your industry certifications in `certifications`.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com',
    },
  ],
};
```

Empty array will hide the certifications section.

### Projects

#### GitHub Projects

- **Automatic Mode:** Seamlessly showcase your top GitHub projects based on stars or last updated date.
- **Manual Mode:** Choose specific repositories to highlight.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'GitHub Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        type: 'projects', // 'commits' will display user's commit, 'projects' will display projects by user.
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['rastislavcore/my-project1', 'rastislavcore/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['rastislavcore/gitprofile', 'rastislavcore/pandora'], // List of repository names to display. example: ['rastislavcore/my-project1', 'rastislavcore/my-project2']
      },
    },
  },
};
```

#### External Projects

- **Highlight Projects Beyond GitHub:** Feature projects hosted on other platforms or personal websites.
- **Control over Content:** Provide custom titles, descriptions, images, and links for each external project.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  projects: {
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
      ],
    },
  },
};
```

### Publications

Provide your academic publishing in `publications`.

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  publications: [
    {
      title: 'Publication Title',
      conferenceName: 'Conference Name',
      journalName: 'Journal Name',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
    },
  ],
};
```

Empty array will hide the publications section.

### Blog Posts

If you have [medium](https://medium.com) or [dev](https://dev.to) account, you can show your recent blog posts in here just by providing your medium/dev username. You can limit how many posts to display (Max is `10`).

```ts
// gitprofile.config.ts
const CONFIG = {
  // ...
  blog: {
    source: 'dev',
    username: 'rastislavcore',
    limit: 5,
  },
};
```

The posts are fetched by [blog.js](https://github.com/arifszn/blog.js).

## 💡 Contribute

To contribute, see the [Contributing guide](CONTRIBUTING.md).

## 📄 License

[MIT](LICENSE)
