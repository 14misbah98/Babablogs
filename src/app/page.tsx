import Link from 'next/link';
import Navbar from '@/components/public/navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4 text-center bg-linear-to-b from-background to-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
              The <span className="italic text-muted-foreground">BabaBlogs</span> Archive.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              A lightweight, AI-powered platform to preserve and manage your content. 
              Built for researchers, authors, and digital libraries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/browse"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 text-base")}
              >
                Explore Archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/login"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 h-12 text-base")}
              >
                Author Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Deep Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrated OCR extracts text from images and PDFs, making every word searchable across your entire collection.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Library Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                A minimalist browsing experience focused on readability and ease of access to your archived materials.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold">Secure Archiving</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simple yet secure author portal to manage uploads, metadata, and content structure without database overhead.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-bold text-lg">
            Baba<span className="text-muted-foreground font-light">Blogs</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BabaBlogs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
