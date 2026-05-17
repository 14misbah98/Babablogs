'use server';

import { getAllMetadata, deleteContent, updateContent, getContentById } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function fetchAllContent() {
  return await getAllMetadata();
}

export async function removeContent(id: string) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized');
  }
  await deleteContent(id);
  revalidatePath('/dashboard/uploads');
  revalidatePath('/browse');
}

export async function editContent(id: string, updates: any) {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized');
  }
  await updateContent(id, updates);
  revalidatePath('/dashboard/uploads');
  revalidatePath('/browse');
}

export async function fetchContentById(id: string) {
  return await getContentById(id);
}

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!username || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }

  const { register } = await import('@/lib/auth');
  return await register(username, password, name);
}
