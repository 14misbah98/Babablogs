'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Library, LayoutDashboard, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-xl font-bold tracking-tight hover:opacity-90 active:scale-98 transition-all">
          <Library className="h-5 w-5 text-primary" />
          <span>Baba<span className="text-muted-foreground font-light italic">Blogs</span> <span className="font-sans text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 ml-1.5 align-middle">Archive</span></span>
        </Link>

        <div className="flex items-center gap-6 font-sans">
          <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
            Browse Archive
          </Link>
          <Link 
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 border border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all text-xs font-semibold px-4 h-9 rounded-full")}
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
            Author Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
