export type ContentType = 'pdf' | 'image' | 'text';

export interface ContentMetadata {
  id: string;
  title: string;
  author: string;
  language: string;
  contentType: ContentType;
  publishDate: string;
  tags: string[];
  fileName: string;
  filePath: string;
  extractedText: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: {
    id: string;
    username: string;
    role: 'author';
    name?: string;
  };
  expires: string;
}
