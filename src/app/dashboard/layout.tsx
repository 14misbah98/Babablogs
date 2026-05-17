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
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-lg font-bold tracking-tight hover:opacity-90 active:scale-98 transition-all">
          <Library className="h-4.5 w-4.5 text-primary" />
          <span>Baba<span className="text-muted-foreground font-light italic">Blogs</span> <span className="font-sans text-[9px] uppercase tracking-widest text-primary bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10 ml-1 align-middle">Archive</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-primary/5 border border-primary/15 text-primary rounded-full text-xs font-semibold">
            <User className="h-3 w-3" />
            <span>Admin Author</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-full" title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/40 bg-background/50 hidden md:flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3 cursor-pointer rounded-lg transition-all",
                  pathname === item.href 
                    ? "font-semibold border border-primary/10 bg-secondary/80 text-primary shadow-xs" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto animate-fade-in-up bg-background/30">
          {children}
        </main>
      </div>
    </div>
  );
}
