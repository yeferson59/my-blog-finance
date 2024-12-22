export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export interface Author {
  name: string;
  image?: string;
  bio?: string;
  role?: string;
  socialLinks?: SocialLinks;
  url?: string;
}

export interface WebsiteConfig {
  // Metadatos básicos del sitio
  siteMetadataTitle: string;
  siteMetadataDescription: string;
  siteMetadataHeaderTitle: string;
  siteUrl: string;
  siteLogo: string;
  siteLanguage: string;
  alternateLanguages?: { code: string; url: string }[];

  // Información de la organización
  organizationName: string;
  organizationLegalName?: string;
  foundingDate?: string;
  organizationLogo?: string;

  // Redes sociales y contacto
  socialLinks: SocialLinks;
  twitterHandle: string;
  contactEmail?: string;

  // Configuración por defecto
  defaultTheme: "light" | "dark" | "system";
  defaultAuthor: Author;

  // SEO y Analytics
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  analyticsId?: string;

  // Configuración de contenido
  postsPerPage: number;
  dateFormat: string;
  categories: string[];
  mainKeywords: string[];

  // PWA y manifest
  manifestData?: {
    name: string;
    shortName: string;
    startUrl: string;
    backgroundColor: string;
    themeColor: string;
    display: string;
  };
}
