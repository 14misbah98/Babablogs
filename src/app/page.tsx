import Link from 'next/link';
import Navbar from '@/components/public/navbar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body">
      <Navbar />
      
      <main className="flex-1 animate-fade-in-up">
        {/* Hero Section */}
        <section 
          className="relative py-32 px-6 text-center overflow-hidden border-b border-primary/15 flex items-center justify-center min-h-[85vh]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Subtle vignette layer using tailwind overlay */}
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          
          <div className="container mx-auto max-w-4xl relative z-10 py-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 bg-primary/5 text-primary text-[10px] uppercase font-sans tracking-[0.15em] mb-8 font-semibold select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Intelligent Preservation System
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8 text-foreground leading-tight">
              The <span className="italic text-primary font-normal">BabaBlogs</span> Archive.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-serif italic">
              A premium, AI-powered platform to preserve and catalog your content. 
              Tailored for researchers, authors, and digital libraries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center font-sans">
              <Link 
                href="/browse"
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "rounded-none px-8 h-13 text-xs uppercase tracking-[0.1em] font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border border-primary transition-all hover:shadow-[0_0_20px_hsl(var(--primary) / 0.3)] duration-300 flex items-center justify-center gap-2 cursor-pointer"
                )}
              >
                Explore Archive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }), 
                  "rounded-none px-8 h-13 text-xs uppercase tracking-[0.1em] font-semibold border border-primary/40 hover:border-primary text-primary bg-transparent hover:bg-primary/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
                )}
              >
                Author Dashboard
              </Link>
            </div>

            {/* Visual Archival Showcase mockup */}
            <div className="mt-20 relative bg-secondary/80 backdrop-blur-md border border-primary/20 p-6 md:p-8 shadow-premium max-w-3xl mx-auto text-left transition-all duration-500 hover:border-primary/35">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <div className="flex items-center justify-between pb-4 border-b border-primary/15 text-[9px] md:text-[10px] text-muted-foreground font-sans uppercase tracking-[0.1em] font-semibold">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span>Verified Database Connection</span>
                </div>
                <span>Tesseract OCR Core: Operational</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                {/* Mock Card 1 */}
                <div className="p-5 border border-primary/10 bg-background/60 hover:bg-background transition-all duration-300 shadow-sm hover:border-primary/25">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] md:text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 uppercase font-sans font-semibold tracking-wider">
                      PDF Document
                    </span>
                    <span className="text-[10px] text-muted-foreground font-sans">June 1887</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-foreground line-clamp-1 mb-2">Original Manuscript - Vol. I</h4>
                  <p className="text-xs text-muted-foreground line-clamp-3 italic font-serif leading-relaxed mb-4">
                    “...the digital preservation of literature constitutes a fundamental pillar of modern heritage...”
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[8px] bg-secondary px-2 py-0.5 border border-primary/10 text-muted-foreground uppercase font-sans tracking-wide">
                      Heritage
                    </span>
                    <span className="text-[8px] bg-secondary px-2 py-0.5 border border-primary/10 text-muted-foreground uppercase font-sans tracking-wide">
                      History
                    </span>
                  </div>
                </div>
                
                {/* Mock Card 2 */}
                <div className="p-5 border border-primary/10 bg-background/60 hover:bg-background transition-all duration-300 shadow-sm hover:border-primary/25">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] md:text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 uppercase font-sans font-semibold tracking-wider">
                      Historical Image
                    </span>
                    <span className="text-[10px] text-muted-foreground font-sans">Oct 1923</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-foreground line-clamp-1 mb-2">Archival Photography Collection</h4>
                  <p className="text-xs text-muted-foreground line-clamp-3 italic font-serif leading-relaxed mb-4">
                    “...OCR automatically retrieves and indexed text directly from historical photographic prints...”
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[8px] bg-secondary px-2 py-0.5 border border-primary/10 text-muted-foreground uppercase font-sans tracking-wide">
                      Photographic
                    </span>
                    <span className="text-[8px] bg-secondary px-2 py-0.5 border border-primary/10 text-muted-foreground uppercase font-sans tracking-wide">
                      OCR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent my-4" />

        {/* Features Section */}
        <section className="py-24 container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="p-8 bg-secondary/45 border border-primary/10 transition-all duration-300 hover:border-primary/25 hover:bg-secondary/60 flex flex-col items-start shadow-sm">
              <div className="h-12 w-12 bg-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Deep Search</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Integrated OCR extracts text from scanned pages, making every word searchable across your entire archived collection instantly.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 bg-secondary/45 border border-primary/10 transition-all duration-300 hover:border-primary/25 hover:bg-secondary/60 flex flex-col items-start shadow-sm">
              <div className="h-12 w-12 bg-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Library Experience</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A gorgeous, quiet browsing experience focused entirely on the typographic layout and timeless readability of your documents.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 bg-secondary/45 border border-primary/10 transition-all duration-300 hover:border-primary/25 hover:bg-secondary/60 flex flex-col items-start shadow-sm">
              <div className="h-12 w-12 bg-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Secure Archiving</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Simple, secure author portal to curate files, manage tags, and catalog books without the weight of standard heavy content systems.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/15 py-16 bg-popover text-foreground font-sans">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif font-bold text-xl tracking-tight">
            Baba<span className="text-muted-foreground font-light italic">Blogs</span>
          </div>
          
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
            &copy; {new Date().getFullYear()} BabaBlogs. All rights reserved.
          </p>
          
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.08em] font-semibold text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
