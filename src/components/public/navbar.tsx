'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Library, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-primary/10 bg-background/95 dark:bg-background/95 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-lg md:text-xl font-bold tracking-tight hover:opacity-95 active:scale-98 transition-all text-foreground dark:text-foreground light:text-primary-foreground">
          <Library className="h-5 w-5 text-primary" />
          <span className="text-foreground light:text-primary-foreground">
            Baba<span className="text-muted-foreground font-light italic">Blogs</span> 
            <span className="font-sans text-[9px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/20 ml-2 align-middle font-semibold">
              Archive
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-[11px] font-sans uppercase tracking-[0.08em]">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link 
            href="/browse" 
            className="text-muted-foreground hover:text-primary font-medium transition-colors relative py-1 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
          >
            Browse Archive
          </Link>
          <Link 
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }), 
              "gap-2 border border-primary/30 hover:border-primary hover:bg-primary/10 text-primary transition-all text-[11px] font-sans uppercase tracking-[0.08em] px-4 h-9 rounded-none bg-transparent cursor-pointer"
            )}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Author Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
