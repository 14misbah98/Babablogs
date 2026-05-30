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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-primary/15 bg-background/95 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-lg font-bold tracking-tight hover:opacity-90 active:scale-98 transition-all text-foreground">
          <Library className="h-5 w-5 text-primary" />
          <span>
            Baba<span className="text-muted-foreground font-light italic">Blogs</span> 
            <span className="font-sans text-[8px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/20 ml-2 align-middle font-semibold">
              Archive
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-primary/5 border border-primary/20 text-primary rounded-none text-xs font-semibold uppercase tracking-wider font-sans">
            <User className="h-3 w-3" />
            <span>Admin Author</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            className="cursor-pointer hover:bg-primary/10 hover:text-primary border border-primary/20 text-primary rounded-none transition-all" 
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-primary/10 bg-popover/40 hidden md:flex flex-col p-4 gap-2 font-sans">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3 cursor-pointer rounded-none transition-all uppercase tracking-wider text-[11px] font-semibold",
                  pathname === item.href 
                    ? "border border-primary/30 bg-secondary text-primary shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/30"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto animate-fade-in-up bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
