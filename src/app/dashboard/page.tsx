import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllMetadata } from '@/lib/storage';
import { FileText, Image as ImageIcon, FileType, Hash } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const allContent = await getAllMetadata();
  
  const stats = [
    {
      title: 'Total Items',
      value: allContent.length,
      icon: FileType,
      color: 'text-primary',
    },
    {
      title: 'PDF Documents',
      value: allContent.filter(c => c.contentType === 'pdf').length,
      icon: FileText,
      color: 'text-primary/80',
    },
    {
      title: 'Images',
      value: allContent.filter(c => c.contentType === 'image').length,
      icon: ImageIcon,
      color: 'text-primary/60',
    },
    {
      title: 'Text Entries',
      value: allContent.filter(c => c.contentType === 'text').length,
      icon: Hash,
      color: 'text-primary/40',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground font-serif italic">Quick summary of your archived collection.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-primary/15 bg-secondary/80 rounded-none shadow-premium transition-all hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Uploads Card */}
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
            <div className="space-y-4">
              {allContent.slice(-5).reverse().map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-primary/10 bg-background/40 hover:bg-background/80 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-secondary border border-primary/20 text-primary rounded-none">
                      {item.contentType === 'pdf' ? <FileText className="h-4.5 w-4.5" /> : 
                       item.contentType === 'image' ? <ImageIcon className="h-4.5 w-4.5" /> : 
                       <Hash className="h-4.5 w-4.5" />}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-foreground">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground font-semibold mt-0.5 uppercase tracking-wide">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] font-semibold font-sans tracking-widest px-2.5 py-1 bg-primary/5 border border-primary/20 text-primary uppercase rounded-none">
                    {item.contentType}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
