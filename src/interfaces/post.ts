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
  documentId: string;
  title: string;
  description: string;
  blocks: StrapiBlock[];
  coverUrl: {
    small: string;
  };
  cover: {
    url: string;
    height: number;
    width: number;
    formats: {
      small: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
  };
  author: Author;
  featured: boolean;
  category: {
    name: string;
    slug: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pubDate: string;
}
