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
    <div className="min-h-screen bg-[#1A1209] text-[#F5ECD7] flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-[#D4A354]/15 bg-[#1A1209]/95 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-lg font-bold tracking-tight hover:opacity-90 active:scale-98 transition-all text-[#F5ECD7]">
          <Library className="h-5 w-5 text-[#D4A354]" />
          <span>
            Baba<span className="text-[#8B6F47] font-light italic">Blogs</span> 
            <span className="font-sans text-[8px] uppercase tracking-widest text-[#D4A354] bg-[#D4A354]/5 px-2 py-0.5 rounded border border-[#D4A354]/20 ml-2 align-middle font-semibold">
              Archive
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#D4A354]/5 border border-[#D4A354]/20 text-[#D4A354] rounded-none text-xs font-semibold uppercase tracking-wider font-sans">
            <User className="h-3 w-3" />
            <span>Admin Author</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            className="cursor-pointer hover:bg-[#D4A354]/10 hover:text-[#D4A354] border border-[#D4A354]/20 text-[#D4A354] rounded-none transition-all" 
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#D4A354]/10 bg-[#0F0B06]/40 hidden md:flex flex-col p-4 gap-2 font-sans">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3 cursor-pointer rounded-none transition-all uppercase tracking-wider text-[11px] font-semibold",
                  pathname === item.href 
                    ? "border border-[#D4A354]/30 bg-[#2C200F] text-[#D4A354] shadow-sm font-bold" 
                    : "text-[#8B6F47] hover:text-[#D4A354] hover:bg-[#2C200F]/30"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto animate-fade-in-up bg-[#1A1209]">
          {children}
        </main>
      </div>
    </div>
  );
}
