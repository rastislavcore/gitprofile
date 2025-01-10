export interface SanitizedGithub {
  username: string;
  sponsorship: boolean;
}

export interface SanitizedGitHubProjects {
  display: boolean;
  header: string;
  mode: string;
  automatic: {
    type: string;
    sortBy: string;
    limit: number;
    exclude: {
      forks: boolean;
      projects: Array<string>;
    };
  };
  manual: {
    projects: Array<string>;
  };
}

export interface SanitizedExternalProject {
  title: string;
  description?: string;
  imageUrl?: string;
  link: string;
}

export interface SanitizedExternalProjects {
  header: string;
  projects: SanitizedExternalProject[];
}

export interface SanitizedProjects {
  github: SanitizedGitHubProjects;
  external: SanitizedExternalProjects;
}

export interface SanitizedSEO {
  title?: string;
  description?: string;
  imageURL?: string;
  githubId?: string;
  payto?: {
    property: string;
    content: string;
  };
}

export interface SanitizedSocial {
  linkedin?: string;
  twitter?: string;
  fediverse?: string;
  researchGate?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  reddit?: string;
  threads?: string;
  youtube?: string;
  udemy?: string;
  dribbble?: string;
  behance?: string;
  medium?: string;
  dev?: string;
  stackoverflow?: string;
  wiki?: string;
  website?: string;
  skype?: string;
  telegram?: string;
  phone?: string;
  email?: string;
  coreid?: string;
  payto?: string;
}

export interface SanitizedResume {
  fileUrl?: string;
}

export interface SanitizedPublicKey {
  fileUrl?: string;
}

export interface SanitizedExperience {
  company?: string;
  position?: string;
  from?: string;
  to?: string;
  companyLink?: string;
}

export interface SanitizedCertification {
  body?: string;
  name?: string;
  year?: string;
  link?: string;
}

export interface SanitizedEducation {
  institution?: string;
  degree?: string;
  from?: string;
  to?: string;
}

export interface SanitizedPublication {
  title?: string;
  conferenceName?: string;
  journalName?: string;
  authors?: string;
  link?: string;
  description?: string;
}

export interface SanitizedGoogleAnalytics {
  id?: string;
}

export interface SanitizedBlog {
  display: boolean;
  source: string;
  username: string;
  limit: number;
}

export interface SanitizedCustomTheme {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  'base-100': string;
  '--rounded-box': string;
  '--rounded-btn': string;
}

export interface SanitizedThemeConfig {
  defaultTheme: string;
  disableSwitch: boolean;
  respectPrefersColorScheme: boolean;
  displayAvatarRing: boolean;
  themes: Array<string>;
  customTheme: SanitizedCustomTheme;
}

export interface SanitizedConfig {
  github: SanitizedGithub;
  projects: SanitizedProjects;
  seo: SanitizedSEO;
  social: SanitizedSocial;
  resume: SanitizedResume;
  publicKey: SanitizedPublicKey;
  skills: Array<string>;
  experiences: Array<SanitizedExperience>;
  educations: Array<SanitizedEducation>;
  certifications: Array<SanitizedCertification>;
  publications: Array<SanitizedPublication>;
  googleAnalytics: SanitizedGoogleAnalytics;
  blog: SanitizedBlog;
  themeConfig: SanitizedThemeConfig;
  footer?: string;
  enablePWA: boolean;
  githubGraph: boolean;
}

export interface Config {
  github?: Partial<SanitizedGithub>;
  projects?: Partial<SanitizedProjects>;
  seo?: Partial<SanitizedSEO>;
  social?: Partial<SanitizedSocial>;
  resume?: Partial<SanitizedResume>;
  publicKey?: Partial<SanitizedPublicKey>;
  skills?: Array<string>;
  experiences?: Array<Partial<SanitizedExperience>>;
  educations?: Array<Partial<SanitizedEducation>>;
  certifications?: Array<Partial<SanitizedCertification>>;
  publications?: Array<Partial<SanitizedPublication>>;
  googleAnalytics?: Partial<SanitizedGoogleAnalytics>;
  blog?: Partial<SanitizedBlog>;
  themeConfig?: Partial<SanitizedThemeConfig>;
  footer?: string;
  enablePWA?: boolean;
  githubGraph?: boolean;
}
