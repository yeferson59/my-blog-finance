import type Author from "./author";

interface StrapiBlock {
  id: string;
  type: string;
  children?: { text: string }[];
  level?: number;
  // Añade más propiedades según sea necesario
}

export interface DataPost {
  data: Post[];
  meta: {
    pagination: {
      total: number;
    };
  };
}

export default interface Post {
  id: number;
  title: string;
  description: string;
  blocks: StrapiBlock[];
  cover: {
    url: string;
    height: number;
    width: number;
  };
  author: Author;
  featured: boolean;
  category: {
    name: string;
    url: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pubDate: string;
}
