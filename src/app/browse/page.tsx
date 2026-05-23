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
  ChevronDown,
  Loader2,
  Eye,
  ExternalLink,
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
    <div className="min-h-screen bg-[#1A1209] text-[#F5ECD7] font-body selection:bg-[#D4A354]/25">
      <Navbar />

      <main className="container mx-auto px-6 py-16 animate-fade-in-up max-w-5xl">
        <div className="space-y-12">
          {/* Page Title */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5ECD7]">The Digital Repository</h1>
            <p className="text-[#8B6F47] leading-relaxed font-serif italic">
              Browse the complete collection of archived documents, research papers, and historical records.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 font-sans">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47] group-focus-within:text-[#D4A354] transition-colors" />
              <Input 
                placeholder="Search text, titles, authors..." 
                className="pl-11 h-12 bg-[#2C200F]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/50 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all font-sans text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-[#2C200F]/60 border border-[#D4A354]/25 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] shadow-premium px-5 rounded-none transition-all cursor-pointer text-[10px] font-sans uppercase tracking-[0.08em] font-semibold")}>
                      <Filter className="h-3.5 w-3.5" />
                      Content Type
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-none border border-[#D4A354]/25 bg-[#2C200F] text-[#F5ECD7] shadow-premium font-sans">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif text-[#D4A354] text-xs uppercase tracking-wide">Filter by Type</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#D4A354]/15" />
                    {contentTypes.map(type => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                        className="capitalize rounded-none text-xs hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10 hover:text-[#D4A354] focus:text-[#D4A354] transition-all cursor-pointer"
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
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-[#2C200F]/60 border border-[#D4A354]/25 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] shadow-premium px-5 rounded-none transition-all cursor-pointer text-[10px] font-sans uppercase tracking-[0.08em] font-semibold")}>
                      Language
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-none border border-[#D4A354]/25 bg-[#2C200F] text-[#F5ECD7] shadow-premium font-sans">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif text-[#D4A354] text-xs uppercase tracking-wide">Filter by Language</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#D4A354]/15" />
                    {languages.map(lang => (
                      <DropdownMenuCheckboxItem
                        key={lang}
                        checked={selectedLangs.includes(lang)}
                        onCheckedChange={() => toggleLang(lang)}
                        className="rounded-none text-xs hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10 hover:text-[#D4A354] focus:text-[#D4A354] transition-all cursor-pointer"
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
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-[#2C200F]/60 border border-[#D4A354]/25 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] shadow-premium px-5 rounded-none transition-all cursor-pointer text-[10px] font-sans uppercase tracking-[0.08em] font-semibold")}>
                      Author
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-none border border-[#D4A354]/25 bg-[#2C200F] text-[#F5ECD7] shadow-premium font-sans">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif text-[#D4A354] text-xs uppercase tracking-wide">Filter by Author</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#D4A354]/15" />
                    {authors.length === 0 ? (
                      <div className="px-2 py-4 text-xs text-center text-[#8B6F47] italic">No authors found</div>
                    ) : (
                      authors.map(author => (
                        <DropdownMenuCheckboxItem
                          key={author}
                          checked={selectedAuthors.includes(author)}
                          onCheckedChange={() => toggleAuthor(author)}
                          className="rounded-none text-xs hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10 hover:text-[#D4A354] focus:text-[#D4A354] transition-all cursor-pointer"
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
                    <button className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 bg-[#2C200F]/60 border border-[#D4A354]/25 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] shadow-premium px-5 rounded-none transition-all cursor-pointer text-[10px] font-sans uppercase tracking-[0.08em] font-semibold")}>
                      Date
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 rounded-none border border-[#D4A354]/25 bg-[#2C200F] text-[#F5ECD7] shadow-premium font-sans">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-serif text-[#D4A354] text-xs uppercase tracking-wide">Filter by Date</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#D4A354]/15" />
                    {dates.length === 0 ? (
                      <div className="px-2 py-4 text-xs text-center text-[#8B6F47] italic">No dates found</div>
                    ) : (
                      dates.map(date => (
                        <DropdownMenuCheckboxItem
                          key={date}
                          checked={selectedDates.includes(date)}
                          onCheckedChange={() => toggleDate(date)}
                          className="rounded-none text-xs hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10 hover:text-[#D4A354] focus:text-[#D4A354] transition-all cursor-pointer"
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
            <div className="flex flex-col items-center justify-center py-32 gap-5">
              <Loader2 className="h-7 w-7 animate-spin text-[#D4A354]" />
              <p className="text-sm text-[#8B6F47] font-serif italic tracking-wide">Retrieving records from the archive...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-28 border border-dashed border-[#D4A354]/20 bg-[#2C200F]/10">
                  <p className="text-[#8B6F47] italic font-serif">No records match your current search or filters.</p>
                </div>
              ) : (
                filteredItems.map(item => (
                  <Card key={item.id} className="group border border-[#D4A354]/15 hover:border-[#D4A354]/30 shadow-premium hover:shadow-premium-hover hover:scale-[1.01] transition-all duration-300 overflow-hidden bg-[#2C200F]/80 rounded-none flex flex-col justify-between">
                    <CardHeader className="pb-3 pt-6 px-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-[9px] uppercase font-sans font-semibold tracking-widest px-2 py-0.5 border-[#D4A354]/30 text-[#D4A354] bg-[#D4A354]/5 rounded-none">
                          {item.contentType}
                        </Badge>
                        <span className="text-[9px] text-[#8B6F47] font-sans uppercase tracking-wider font-semibold">{item.publishDate}</span>
                      </div>
                      <CardTitle className="font-serif font-bold text-lg text-[#F5ECD7] group-hover:text-[#D4A354] transition-colors line-clamp-1">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-5 px-6 text-sm flex-1 flex flex-col justify-between">
                      <p className="text-[#8B6F47] mb-4 font-sans text-xs">By <span className="font-serif italic font-semibold text-[#F5ECD7]">{item.author}</span></p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[8px] bg-[#1A1209] px-2 py-0.5 border border-[#D4A354]/10 text-[#8B6F47] uppercase font-sans font-semibold tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 pb-5 px-6 border-t border-[#D4A354]/10 bg-[#0F0B06]/30 flex gap-2.5 font-sans">
                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button variant="ghost" size="sm" className="flex-1 h-9 gap-2 text-[10px] font-sans uppercase tracking-[0.08em] border border-[#D4A354]/30 text-[#D4A354] hover:border-[#D4A354] hover:bg-[#D4A354]/10 bg-transparent transition-all rounded-none font-semibold hover:text-[#D4A354] cursor-pointer">
                              <Eye className="h-3.5 w-3.5" />
                              Insights
                            </Button>
                          }
                        />
                        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col rounded-none border border-[#D4A354]/25 bg-[#1A1209] text-[#F5ECD7] shadow-premium font-sans">
                          <DialogHeader className="border-b border-[#D4A354]/15 pb-4">
                            <DialogTitle className="font-serif text-xl flex items-center gap-2 text-[#D4A354] font-bold">
                              <Type className="h-5 w-5" />
                              Extracted Text Analysis
                            </DialogTitle>
                            <DialogDescription className="font-sans text-xs text-[#8B6F47] uppercase tracking-wide mt-1">
                              Full manuscript content retrieved from {item.title} via OCR.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {/* Tactile ancient manuscript sheet container */}
                          <div className="flex-1 overflow-y-auto my-4 p-8 bg-[#E8DCC8] rounded-none border border-[#8B6F47]/20 shadow-inner">
                            {item.extractedText ? (
                              <pre className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-[#1A1209] selection:bg-[#D4A354]/35 font-medium">
                                {item.extractedText}
                              </pre>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-16 text-[#8B6F47] italic font-serif">
                                <Search className="h-10 w-10 mb-4 opacity-30 text-[#8B6F47]" />
                                <p>No text was extracted from this record.</p>
                              </div>
                            )}
                          </div>
                          <DialogFooter showCloseButton className="border-t border-[#D4A354]/15 pt-3" />
                        </DialogContent>
                      </Dialog>
                      
                      <a 
                        href={`/${item.filePath}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }), 
                          "flex-1 h-9 gap-2 text-[10px] font-sans uppercase tracking-[0.08em] border border-[#D4A354]/30 text-[#D4A354] hover:border-[#D4A354] hover:bg-[#D4A354]/10 bg-transparent transition-all rounded-none font-semibold hover:text-[#D4A354] cursor-pointer"
                        )}
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
