'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image as ImageIcon, FileType, Hash, X } from 'lucide-react';
import { ContentMetadata } from '@/lib/types';

const LANG_MAP: Record<string, string> = {
  pdf: 'PDF Documents',
  image: 'Images',
  text: 'Text Entries',
};

export function DashboardClient({ allContent }: { allContent: ContentMetadata[] }) {
  const [lightboxItem, setLightboxItem] = useState<ContentMetadata | null>(null);

  const stats = [
    {
      title: 'Total Items',
      value: allContent.length,
      icon: FileType,
      color: 'text-primary',
      filter: null,
    },
    {
      title: 'PDF Documents',
      value: allContent.filter((c) => c.contentType === 'pdf').length,
      icon: FileText,
      color: 'text-primary/80',
      filter: 'pdf',
    },
    {
      title: 'Images',
      value: allContent.filter((c) => c.contentType === 'image').length,
      icon: ImageIcon,
      color: 'text-primary/60',
      filter: 'image',
    },
    {
      title: 'Text Entries',
      value: allContent.filter((c) => c.contentType === 'text').length,
      icon: Hash,
      color: 'text-primary/40',
      filter: 'text',
    },
  ];

  const recentItems = allContent.slice(-5).reverse();

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground font-serif italic">Quick summary of your archived collection.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-primary/15 bg-secondary/80 rounded-none shadow-premium transition-all hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] cursor-pointer group"
            onClick={() => {
              const params = stat.filter ? `?type=${stat.filter}` : '';
              window.location.href = `/dashboard/uploads${params}`;
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-foreground">{stat.value}</div>
              <p className="text-[9px] text-primary/50 mt-1 uppercase tracking-wider font-sans font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                View all →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Uploads */}
      <Card className="border border-primary/15 bg-secondary/80 rounded-none shadow-premium">
        <CardHeader className="border-b border-primary/10 pb-4">
          <CardTitle className="font-serif font-bold text-xl text-foreground">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {allContent.length === 0 ? (
            <div className="text-center py-14 text-sm text-muted-foreground italic font-serif">
              No content uploaded yet. Start by uploading your first document.
            </div>
          ) : (
            <div className="space-y-3">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-primary/10 bg-background/40 hover:bg-background/80 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setLightboxItem(item)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-secondary border border-primary/20 text-primary rounded-none group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                      {item.contentType === 'pdf' ? (
                        <FileText className="h-4 w-4" />
                      ) : item.contentType === 'image' ? (
                        <ImageIcon className="h-4 w-4" />
                      ) : (
                        <Hash className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-semibold mt-0.5 uppercase tracking-wide">
                        {new Date(item.createdAt).toLocaleDateString()} · {item.author}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-[9px] font-semibold font-sans tracking-widest px-2.5 py-1 bg-primary/5 border border-primary/20 text-primary uppercase rounded-none">
                      {item.contentType}
                    </div>
                    <span className="text-[9px] text-muted-foreground font-sans uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.contentType === 'image' ? 'View Image →' : 'View Details →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lightbox / Detail Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-secondary border border-primary/25 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-primary/15">
              <div>
                <h2 className="font-serif font-bold text-lg text-foreground">{lightboxItem.title}</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-sans mt-1">
                  {lightboxItem.author} · {lightboxItem.publishDate} · {lightboxItem.language}
                </p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="text-muted-foreground hover:text-primary transition-colors ml-4 p-1 hover:bg-primary/10 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Preview */}
            {lightboxItem.contentType === 'image' && (
              <div className="p-4 bg-background/50 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${lightboxItem.filePath}`}
                  alt={lightboxItem.title}
                  className="max-h-[60vh] max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Tags & extracted text */}
            <div className="p-5 space-y-4">
              {lightboxItem.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {lightboxItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] bg-background border border-primary/10 text-muted-foreground px-2 py-0.5 font-sans font-bold tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {lightboxItem.extractedText ? (
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-sans font-semibold text-primary mb-2">
                    Extracted Text
                  </p>
                  <div 
                    className={`bg-background/60 border border-primary/10 p-3 max-h-48 overflow-y-auto text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap ${
                      ['urd', 'ara', 'fas'].includes(lightboxItem.language) ? 'font-serif text-right' : 'font-body'
                    }`}
                    dir={['urd', 'ara', 'fas'].includes(lightboxItem.language) ? 'rtl' : 'ltr'}
                  >
                    {lightboxItem.extractedText}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic font-serif">
                  No text extracted yet. Use the OCR button in My Uploads to extract text.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <a
                href={`/${lightboxItem.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[9px] uppercase tracking-widest font-sans font-semibold px-4 py-2 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                Open Full File →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
