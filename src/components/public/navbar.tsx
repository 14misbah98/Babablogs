'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Library, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-primary/10 bg-[#1A1209]/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-lg md:text-xl font-bold tracking-tight hover:opacity-95 active:scale-98 transition-all text-[#F5ECD7]">
          <Library className="h-5 w-5 text-[#D4A354]" />
          <span>
            Baba<span className="text-[#8B6F47] font-light italic">Blogs</span> 
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#D4A354] bg-[#D4A354]/5 px-2 py-0.5 rounded border border-[#D4A354]/20 ml-2 align-middle font-semibold">
              Archive
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8 text-[11px] font-sans uppercase tracking-[0.08em]">
          <Link 
            href="/browse" 
            className="text-[#8B6F47] hover:text-[#D4A354] font-medium transition-colors relative py-1 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-[#D4A354] after:transition-all after:duration-300"
          >
            Browse Archive
          </Link>
          <Link 
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }), 
              "gap-2 border border-[#D4A354]/30 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] transition-all text-[11px] font-sans uppercase tracking-[0.08em] px-4 h-9 rounded-none bg-transparent cursor-pointer"
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
