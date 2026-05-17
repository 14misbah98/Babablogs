import Link from 'next/link';
import Navbar from '@/components/public/navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 animate-fade-in-up">
        {/* Hero Section */}
        <section className="py-24 px-4 text-center bg-linear-to-b from-background to-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-widest mb-6">
              ✨ Intelligent Preservation System
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
              The <span className="italic text-muted-foreground">BabaBlogs</span> Archive.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-serif italic opacity-90">
              A premium, AI-powered platform to preserve and catalog your content. 
              Tailored for researchers, authors, and digital libraries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/browse"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 text-base font-sans font-semibold tracking-wide shadow-sm hover:shadow-md transition-all")}
              >
                Explore Archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/login"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 h-12 text-base font-sans border-border/40 hover:bg-background/80 transition-all")}
              >
                Author Dashboard
              </Link>
            </div>

            {/* Visual Archival Showcase mockup */}
            <div className="mt-16 relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xs p-6 shadow-premium hover:shadow-premium-hover transition-all duration-500 max-w-3xl mx-auto overflow-hidden text-left">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent" />
              <div className="flex items-center justify-between pb-4 border-b border-border/30 text-[10px] text-muted-foreground font-sans uppercase tracking-widest font-semibold">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Database Connection</span>
                </div>
                <span>Tesseract OCR Core: Operational</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Mock Card 1 */}
                <div className="p-4 rounded-xl border border-border/20 bg-background/50 hover:bg-background transition-all hover:scale-101 shadow-xs hover:shadow-premium duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">PDF Document</span>
                    <span className="text-[10px] text-muted-foreground">June 1887</span>
                  </div>
                  <h4 className="font-serif font-semibold text-sm line-clamp-1">Original Manuscript - Vol. I</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic font-serif leading-relaxed">“...the digital preservation of literature constitutes a fundamental pillar of modern heritage...”</p>
                  <div className="flex gap-1.5 mt-3">
                    <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold">Heritage</span>
                    <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold">History</span>
                  </div>
                </div>
                
                {/* Mock Card 2 */}
                <div className="p-4 rounded-xl border border-border/20 bg-background/50 hover:bg-background transition-all hover:scale-101 shadow-xs hover:shadow-premium duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Historical Image</span>
                    <span className="text-[10px] text-muted-foreground">Oct 1923</span>
                  </div>
                  <h4 className="font-serif font-semibold text-sm line-clamp-1">Archival Photography Collection</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic font-serif leading-relaxed">“...OCR automatically retrieves and indexed text directly from historical photographic prints...”</p>
                  <div className="flex gap-1.5 mt-3">
                    <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold">Photographic</span>
                    <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold">OCR</span>
                  </div>
                </div>
              </div>
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
