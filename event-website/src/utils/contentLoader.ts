import websiteContent from '../data/content.json';

export interface WebsiteContent {
  event: EventData;
  navigation: NavigationData;
  hero: HeroData;
  about: AboutData;
  speakers: SpeakersData;
  schedule: ScheduleData;
  sponsors: SponsorsData;
  venue: VenueData;
  registration: RegistrationData;
  footer: FooterData;
  theme: ThemeData;
  seo: SEOData;
}

export interface EventData {
  name: string;
  hashtag: string;
  dates: {
    start: string;
    end: string;
    display: string;
  };
  location: {
    city: string;
    state: string;
    venue: string;
    display: string;
  };
  tagline: string;
  description: string;
}

export interface NavigationData {
  logo: string;
  links: Array<{
    name: string;
    href: string;
    type: 'internal' | 'external' | 'cta';
    highlighted?: boolean;
  }>;
}

export interface HeroData {
  headline: {
    main: string;
    subtitle: string;
    animation: {
      duration: number;
      delay: number;
    };
  };
  background: {
    type: string;
    video?: {
      src: string;
      poster: string;
      fallback: string;
    };
    gradient?: {
      overlay: string;
      darkOverlay: string;
    };
    animatedElements: {
      count: number;
      type: string;
      animation: {
        duration: number;
        scale: number[];
        opacity: number[];
      };
    };
  };
  cta: {
    buttons: Array<{
      text: string;
      href: string;
      type: string;
      style: string;
    }>;
  };
  typography: {
    fontFamily: string;
    fontWeight: number;
    letterSpacing: string;
  };
}

export interface AboutData {
  eyebrow: string;
  title: string;
  content: string[];
  cta: {
    text: string;
    href: string;
    icon: string;
  };
  image: {
    type: string;
    placeholder: {
      icon: string;
      text: string;
    };
    decorativeElements: Array<{
      type: string;
      position: string;
      color: string;
    }>;
  };
}

export interface SpeakersData {
  preview: {
    eyebrow: string;
    title: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
  };
  featured: Array<{
    id: number;
    name: string;
    role: string;
    expertise: string;
    image: string;
    bio: string;
    company: string;
    social: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  }>;
}

export interface ScheduleData {
  preview: {
    eyebrow: string;
    title: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
  };
  days: Array<{
    date: string;
    name: string;
    theme: string;
    sessions: Array<{
      time: string;
      title: string;
      speaker: string;
      description: string;
    }>;
  }>;
  callToAction: {
    title: string;
    description: string;
    button: {
      text: string;
      href: string;
    };
  };
}

export interface SponsorsData {
  title: string;
  description: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  packages: Array<{
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }>;
  currentSponsors: Array<{
    name: string;
    tier: string;
    logo: string;
    website: string;
  }>;
}

export interface VenueData {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  cta: {
    text: string;
    href: string;
  };
}

export interface RegistrationData {
  title: string;
  subtitle: string;
  description: string;
  ticketTypes: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
    features: string[];
    deadline: string;
    popular?: boolean;
  }>;
}

export interface FooterData {
  company: {
    name: string;
    description: string;
  };
  links: Array<{
    title: string;
    items: Array<{
      name: string;
      href: string;
    }>;
  }>;
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  legal: Array<{
    name: string;
    href: string;
  }>;
}

export interface ThemeData {
  colors: {
    primary: string;
    secondary: string;
    neutral: {
      dark: string;
      medium: string;
      light: string;
    };
    support: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      outline: string;
    };
    fontSize: Record<string, string>;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: string;
  };
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

// Export the typed content
export const content: WebsiteContent = websiteContent as WebsiteContent;

// Utility functions for accessing content
export const getContent = (): WebsiteContent => content;

export const getEventData = (): EventData => content.event;
export const getNavigationData = (): NavigationData => content.navigation;
export const getHeroData = (): HeroData => content.hero;
export const getAboutData = (): AboutData => content.about;
export const getSpeakersData = (): SpeakersData => content.speakers;
export const getScheduleData = (): ScheduleData => content.schedule;
export const getSponsorsData = (): SponsorsData => content.sponsors;
export const getVenueData = (): VenueData => content.venue;
export const getRegistrationData = (): RegistrationData => content.registration;
export const getFooterData = (): FooterData => content.footer;
export const getThemeData = (): ThemeData => content.theme;
export const getSEOData = (): SEOData => content.seo;

// Function to update content dynamically
export const updateContent = (updates: Partial<WebsiteContent>): WebsiteContent => {
  return { ...content, ...updates };
};

// Function to get content by path
export const getContentByPath = (path: string): any => {
  const keys = path.split('.');
  let result: any = content;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  
  return result;
};

export default content;