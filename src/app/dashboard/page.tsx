import { getAllMetadata } from '@/lib/storage';
import { DashboardClient } from './dashboard-client';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const allContent = await getAllMetadata();
  return <DashboardClient allContent={allContent} />;
}
