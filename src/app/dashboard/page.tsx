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
      color: 'text-blue-500',
    },
    {
      title: 'PDF Documents',
      value: allContent.filter(c => c.contentType === 'pdf').length,
      icon: FileText,
      color: 'text-red-500',
    },
    {
      title: 'Images',
      value: allContent.filter(c => c.contentType === 'image').length,
      icon: ImageIcon,
      color: 'text-green-500',
    },
    {
      title: 'Text Entries',
      value: allContent.filter(c => c.contentType === 'text').length,
      icon: Hash,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Quick summary of your archived collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          {allContent.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground italic">
              No content uploaded yet. Start by uploading your first document.
            </div>
          ) : (
            <div className="space-y-4">
              {allContent.slice(-5).reverse().map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded border">
                      {item.contentType === 'pdf' ? <FileText className="h-4 w-4 text-red-500" /> : 
                       item.contentType === 'image' ? <ImageIcon className="h-4 w-4 text-green-500" /> : 
                       <Hash className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-muted rounded">
                    {item.contentType.toUpperCase()}
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
