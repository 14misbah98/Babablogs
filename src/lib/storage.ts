import { getStore } from '@netlify/blobs';
import { ContentMetadata } from './types';

export const getSiteDataStore = () => getStore('site-data', {
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_API_TOKEN,
});

export const getUploadsStore = () => getStore('uploads', {
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_API_TOKEN,
});
const METADATA_KEY = 'metadata';

export async function ensureStorage() {
  const store = getSiteDataStore();
  const metadata = await store.get(METADATA_KEY, { type: 'json' });
  if (!metadata) {
    await store.setJSON(METADATA_KEY, []);
  }
}

export async function getAllMetadata(): Promise<ContentMetadata[]> {
  const store = getSiteDataStore();
  const data = await store.get(METADATA_KEY, { type: 'json' });
  return (data as ContentMetadata[]) || [];
}

export async function saveMetadata(metadata: ContentMetadata[]) {
  const store = getSiteDataStore();
  await store.setJSON(METADATA_KEY, metadata);
}

export async function addContent(item: ContentMetadata) {
  const metadata = await getAllMetadata();
  metadata.push(item);
  await saveMetadata(metadata);
}

export async function updateContent(id: string, updates: Partial<ContentMetadata>) {
  const metadata = await getAllMetadata();
  const index = metadata.findIndex((m) => m.id === id);
  if (index !== -1) {
    metadata[index] = { ...metadata[index], ...updates, updatedAt: new Date().toISOString() };
    await saveMetadata(metadata);
  }
}

export async function deleteContent(id: string) {
  const metadata = await getAllMetadata();
  const item = metadata.find((m) => m.id === id);
  if (item) {
    try {
      const uploadsStore = getUploadsStore();
      await uploadsStore.delete(item.filePath);
    } catch (e) {
      console.error('Failed to delete blob:', e);
    }
    const filtered = metadata.filter((m) => m.id !== id);
    await saveMetadata(filtered);
  }
}

export async function getContentById(id: string): Promise<ContentMetadata | undefined> {
  const metadata = await getAllMetadata();
  return metadata.find((m) => m.id === id);
}

