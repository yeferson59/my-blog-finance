// types.ts
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

// config.ts
const WEBSITE_DATA: WebsiteConfig = {
  // Metadatos básicos del sitio
  siteMetadataTitle: "Tecnofinanzas - Blog sobre Tecnología y Finanzas",
  siteMetadataDescription:
    "Blog especializado en tecnología y finanzas, ofreciendo consejos, análisis y noticias del sector",
  siteMetadataHeaderTitle: "Tecnofinanzas",
  siteUrl: "https://tecnofinanzas.blog",
  siteLogo: "/images/logo.svg", // Asegúrate de tener un logo
  siteLanguage: "es-LA",
  alternateLanguages: [
    { code: "en", url: "https://tecnofinanzas.blog/en" },
    // Añade otros idiomas si los tienes
  ],

  // Información de la organización
  organizationName: "Tecnofinanzas",
  organizationLegalName: "Tecnofinanzas Blog",
  foundingDate: "2024-01-01",
  organizationLogo: "/images/organization-logo.svg",

  // Redes sociales y contacto
  socialLinks: {
    twitter: "https://twitter.com/yefersont59",
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-usuario",
    facebook: "https://facebook.com/tecnofinanzas",
    instagram: "https://instagram.com/tecnofinanzas",
  },
  twitterHandle: "@yefersont59",
  contactEmail: "contacto@tecnofinanzas.blog",

  // Configuración por defecto
  defaultTheme: "dark",
  defaultAuthor: {
    name: "Yeferson Toloza",
    image: "/images/authors/yeferson-toloza.jpg",
    bio: "Especialista en tecnología y finanzas con más de X años de experiencia...",
    role: "Editor principal",
    socialLinks: {
      twitter: "https://twitter.com/yefersont59",
      github: "https://github.com/tu-usuario",
      linkedin: "https://linkedin.com/in/tu-usuario",
    },
    url: "https://tecnofinanzas.blog/author/yeferson-toloza",
  },

  // SEO y Analytics
  googleSiteVerification: "tu-código-de-verificación",
  bingSiteVerification: "tu-código-de-verificación",
  analyticsId: "G-XXXXXXXXXX",

  // Configuración de contenido
  postsPerPage: 9,
  dateFormat: "dd MMMM yyyy",
  categories: [
    "Tecnología",
    "Finanzas",
    "Inversiones",
    "Criptomonedas",
    "Desarrollo Web",
    "Fintech",
  ],
  mainKeywords: [
    "tecnología",
    "finanzas",
    "inversiones",
    "criptomonedas",
    "desarrollo web",
    "fintech",
    "blog financiero",
    "tecnología financiera",
  ],

  // PWA y manifest
  manifestData: {
    name: "Tecnofinanzas Blog",
    shortName: "Tecnofinanzas",
    startUrl: "/",
    backgroundColor: "#ffffff",
    themeColor: "#3b82f6",
    display: "standalone",
  },
} as const;

export default WEBSITE_DATA;
