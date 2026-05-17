import { getStore } from '@netlify/blobs';
import { cookies } from 'next/headers';
import { AuthSession } from './types';

interface User {
  id: string;
  username: string;
  password?: string;
  role: 'author';
  name: string;
}

const SESSION_COOKIE_NAME = 'archive_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const USERS_KEY = 'users';

const getSiteDataStore = () => getStore('site-data');

async function getUsers(): Promise<User[]> {
  const store = getSiteDataStore();
  try {
    const data = await store.get(USERS_KEY, { type: 'json' });
    if (data) return data;
    
    // Default admin if no users exist
    const defaultUsers: User[] = [
      {
        id: 'author-1',
        username: 'admin',
        password: 'password123', // In a real app, use hashed passwords
        role: 'author',
        name: 'Admin Author'
      }
    ];
    await store.setJSON(USERS_KEY, defaultUsers);
    return defaultUsers;
  } catch {
    return [];
  }
}

export async function login(username: string, password: string): Promise<boolean> {
  const users = await getUsers();
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const expires = new Date(Date.now() + SESSION_DURATION).toISOString();
    const session: AuthSession = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      },
      expires,
    };

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expires),
    });
    return true;
  }
  return false;
}

export async function register(username: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  const users = await getUsers();
  
  if (users.some((u) => u.username === username)) {
    return { success: false, error: 'Username already exists' };
  }

  const newUser: User = {
    id: `author-${Date.now()}`,
    username,
    password,
    name,
    role: 'author'
  };

  users.push(newUser);
  const store = getSiteDataStore();
  await store.setJSON(USERS_KEY, users);
  
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;

  try {
    const session: AuthSession = JSON.parse(sessionCookie.value);
    if (new Date(session.expires) < new Date()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

