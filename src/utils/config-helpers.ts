// utils/config-helpers.ts
import WEBSITE_DATA from "./config";

export const getAuthorData = (authorName?: string) => {
  return authorName ? "" : WEBSITE_DATA.defaultAuthor;
};

export const getPageUrl = (path: string) => {
  return new URL(path, WEBSITE_DATA.siteUrl).toString();
};

export const getLocalizedUrl = (path: string, lang: string) => {
  const altLang = WEBSITE_DATA.alternateLanguages?.find((l) => l.code === lang);
  return altLang ? `${altLang.url}${path}` : getPageUrl(path);
};
