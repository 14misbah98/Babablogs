'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Library, LayoutDashboard, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
          <Library className="h-6 w-6" />
          <span>Baba<span className="text-muted-foreground font-light">Blogs</span></span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
            Browse
          </Link>
          <Link 
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
          >
            <LayoutDashboard className="h-4 w-4" />
            Author Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
