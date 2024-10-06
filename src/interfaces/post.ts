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
      total: number
    }
  }
}

export default interface Post {
  id: number;
  title: string;
  description: string;
  content: StrapiBlock[];
  image: {
    url: string;
  };
  authors: Author[];
  featured: boolean;
  tags: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pubDate: string;
}