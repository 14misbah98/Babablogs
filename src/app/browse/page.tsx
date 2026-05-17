'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/public/navbar';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  FileText, 
  Image as ImageIcon, 
  Hash, 
  Download, 
  ExternalLink,
  ChevronDown,
  Loader2,
  Eye,
  Type
} from 'lucide-react';
import { fetchAllContent } from '@/app/actions';
import { ContentMetadata } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export default function BrowsePage() {
  const [items, setItems] = useState<ContentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllContent();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const languages = Array.from(new Set(items.map(i => i.language))).filter(Boolean);
  const authors = Array.from(new Set(items.map(i => i.author))).filter(Boolean);
  const dates = Array.from(new Set(items.map(i => i.publishDate))).filter(Boolean).sort().reverse();
  const contentTypes = ['pdf', 'image', 'text'];

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.extractedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.contentType);
    const matchesLang = selectedLangs.length === 0 || selectedLangs.includes(item.language);
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(item.author);
    const matchesDate = selectedDates.length === 0 || selectedDates.includes(item.publishDate);
    
    return matchesSearch && matchesType && matchesLang && matchesAuthor && matchesDate;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleLang = (lang: string) => {
    setSelectedLangs(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]
    );
  };

  const toggleDate = (date: string) => {
    setSelectedDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-serif font-bold">The Digital Repository</h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Browse the complete collection of archived documents, research papers, and historical records.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 font-sans">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search text, titles, authors..." 
                className="pl-11 h-12 bg-background border border-border/40 hover:border-primary/20 shadow-premium focus-visible:ring-1 focus-visible:ring-primary/20 rounded-xl transition-all"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-background border border-border/40 hover:border-primary/20 hover:bg-primary/5 shadow-premium px-5 rounded-xl transition-all cursor-pointer text-xs font-semibold")}>
                      <Filter className="h-4 w-4 text-primary" />
                      Content Type
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-premium">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif">Filter by Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {contentTypes.map(type => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                        className="capitalize rounded-lg"
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-background border border-border/40 hover:border-primary/20 hover:bg-primary/5 shadow-premium px-5 rounded-xl transition-all cursor-pointer text-xs font-semibold")}>
                      Language
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-premium">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif">Filter by Language</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languages.map(lang => (
                      <DropdownMenuCheckboxItem
                        key={lang}
                        checked={selectedLangs.includes(lang)}
                        onCheckedChange={() => toggleLang(lang)}
                        className="rounded-lg"
                      >
                        {lang}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-background border border-border/40 hover:border-primary/20 hover:bg-primary/5 shadow-premium px-5 rounded-xl transition-all cursor-pointer text-xs font-semibold")}>
                      Author
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-premium">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif">Filter by Author</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {authors.length === 0 ? (
                      <div className="px-2 py-4 text-xs text-center text-muted-foreground italic">No authors found</div>
                    ) : (
                      authors.map(author => (
                        <DropdownMenuCheckboxItem
                          key={author}
                          checked={selectedAuthors.includes(author)}
                          onCheckedChange={() => toggleAuthor(author)}
                          className="rounded-lg"
                        >
                          {author}
                        </DropdownMenuCheckboxItem>
                      ))
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-background border border-border/40 hover:border-primary/20 hover:bg-primary/5 shadow-premium px-5 rounded-xl transition-all cursor-pointer text-xs font-semibold")}>
                      Date
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-premium">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif">Filter by Date</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dates.length === 0 ? (
                      <div className="px-2 py-4 text-xs text-center text-muted-foreground italic">No dates found</div>
                    ) : (
                      dates.map(date => (
                        <DropdownMenuCheckboxItem
                          key={date}
                          checked={selectedDates.includes(date)}
                          onCheckedChange={() => toggleDate(date)}
                          className="rounded-lg"
                        >
                          {date}
                        </DropdownMenuCheckboxItem>
                      ))
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-serif italic tracking-wide">Retrieving records from the archive...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-24 border-2 border-dashed rounded-2xl bg-muted/5">
                  <p className="text-muted-foreground italic font-serif">No records match your current search or filters.</p>
                </div>
              ) : (
                filteredItems.map(item => (
                  <Card key={item.id} className="group border border-border/20 shadow-premium hover:shadow-premium-hover hover:scale-[1.01] transition-all duration-300 overflow-hidden bg-background rounded-xl">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 border-primary/20 text-primary bg-primary/5 rounded">
                          {item.contentType}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-sans font-semibold uppercase tracking-wider">{item.publishDate}</span>
                      </div>
                      <CardTitle className="font-serif group-hover:text-primary transition-colors line-clamp-1 text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3 text-sm">
                      <p className="text-muted-foreground mb-4 font-sans text-xs">By <span className="font-serif italic font-medium text-foreground">{item.author}</span></p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[9px] bg-secondary/80 px-2 py-0.5 rounded-sm border border-border/40 text-muted-foreground uppercase font-bold tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t border-border/30 bg-muted/10 flex gap-2 font-sans">
                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button variant="ghost" size="sm" className="flex-1 h-9 gap-2 text-xs border border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all rounded-lg font-semibold hover:text-primary cursor-pointer">
                              <Eye className="h-3.5 w-3.5" />
                              Insights
                            </Button>
                          }
                        />
                        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col rounded-xl shadow-premium">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-xl flex items-center gap-2">
                              <Type className="h-5 w-5 text-primary" />
                              Extracted Text Analysis
                            </DialogTitle>
                            <DialogDescription className="font-sans">
                              Full text content retrieved from {item.title} via OCR.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex-1 overflow-y-auto my-4 p-6 bg-[#FAF7F2] rounded-xl border border-border/60">
                            {item.extractedText ? (
                              <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-foreground/80 selection:bg-primary/20">
                                {item.extractedText}
                              </pre>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground italic font-serif">
                                <Search className="h-12 w-12 mb-4 opacity-20" />
                                <p>No text was extracted from this record.</p>
                              </div>
                            )}
                          </div>
                          <DialogFooter showCloseButton />
                        </DialogContent>
                      </Dialog>
                      <a 
                        href={`/${item.filePath}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "flex-1 h-9 gap-2 text-xs border border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all rounded-lg font-semibold hover:text-primary cursor-pointer")}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View
                      </a>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
