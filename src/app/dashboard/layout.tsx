'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileUp, 
  Settings, 
  LogOut, 
  Library,
  ChevronRight,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Logged out', {
      description: 'You have been successfully logged out.',
    });
    router.push('/login');
  };

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Uploads', href: '/dashboard/uploads', icon: FileUp },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold">
          <Library className="h-5 w-5" />
          <span>Baba<span className="text-muted-foreground font-light text-sm">Blogs</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs font-medium">
            <User className="h-3 w-3" />
            <span>Admin Author</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background hidden md:flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3",
                  pathname === item.href ? "font-semibold" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
