'use client';

import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit, FileText, Image as ImageIcon, Hash, Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { fetchAllContent, removeContent, editContent } from '@/app/actions';
import { ContentMetadata, ContentType } from '@/lib/types';

export default function UploadsPage() {
  const [items, setItems] = useState<ContentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentMetadata | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('English');
  const [contentType, setContentType] = useState<ContentType>('pdf');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchAllContent();
      setItems(data);
    } catch (error) {
      toast.error('Error', { description: 'Failed to load items.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItems();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('language', language);
    formData.append('contentType', contentType);
    formData.append('publishDate', publishDate);
    formData.append('tags', tags);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Success', { description: 'Item uploaded and processed with OCR.' });
        setIsDialogOpen(false);
        resetForm();
        loadItems();
      } else {
        const data = await res.json();
        toast.error('Upload failed', { description: data.error });
      }
    } catch (error) {
      toast.error('Error', { description: 'An unexpected error occurred.' });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setAuthor('');
    setLanguage('English');
    setContentType('pdf');
    setPublishDate(new Date().toISOString().split('T')[0]);
    setTags('');
  };

  const handleEditClick = (item: ContentMetadata) => {
    setEditingItem(item);
    setTitle(item.title);
    setAuthor(item.author);
    setLanguage(item.language);
    setContentType(item.contentType);
    setPublishDate(item.publishDate);
    setTags(item.tags.join(', '));
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUploading(true);
    try {
      const updates = {
        title,
        author,
        language,
        publishDate,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      await editContent(editingItem.id, updates);
      
      toast.success('Updated', { description: 'Item metadata has been updated.' });
      setIsEditDialogOpen(false);
      setEditingItem(null);
      resetForm();
      loadItems();
    } catch (error) {
      toast.error('Error', { description: 'Failed to update item.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await removeContent(id);
      toast.success('Deleted', { description: 'Item removed from archive.' });
      loadItems();
    } catch (error) {
      toast.error('Error', { description: 'Failed to delete item.' });
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Uploads</h1>
          <p className="text-muted-foreground">Manage your archived content and metadata.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <button className={cn(buttonVariants(), "gap-2")}>
                <Plus className="h-4 w-4" />
                New Upload
              </button>
            }
          />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Upload New Content</DialogTitle>
              <DialogDescription>
                Add a PDF, Image, or Text file. AI OCR will automatically extract text.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input id="author" value={author} onChange={e => setAuthor(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select value={contentType} onValueChange={(v) => { if (v) setContentType(v as ContentType); }}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="image">Image / Scan</SelectItem>
                      <SelectItem value="text">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lang">Language</Label>
                  <Select value={language} onValueChange={(v) => { if (v) setLanguage(v); }}>
                    <SelectTrigger id="lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Publish Date</Label>
                  <Input id="date" type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="history, research, archive" value={tags} onChange={e => setTags(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Label htmlFor="file">File Attachment</Label>
                <Input id="file" type="file" onChange={e => setFile(e.target.files?.[0] || null)} required />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Supports PDF, JPG, PNG, TXT</p>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Start Archiving'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Edit Content Metadata</DialogTitle>
              <DialogDescription>
                Update the metadata for your archived item. Note: File cannot be changed here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input id="edit-title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author Name</Label>
                  <Input id="edit-author" value={author} onChange={e => setAuthor(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-lang">Language</Label>
                  <Select value={language} onValueChange={(v) => { if (v) setLanguage(v); }}>
                    <SelectTrigger id="edit-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Publish Date</Label>
                  <Input id="edit-date" type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input id="edit-tags" placeholder="history, research, archive" value={tags} onChange={e => setTags(e.target.value)} />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => { setIsEditDialogOpen(false); setEditingItem(null); resetForm(); }}>Cancel</Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title, author, or tags..." 
              className="pl-10 max-w-md"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground italic">
                    {searchQuery ? 'No results found for your search.' : 'No items found. Upload some content to get started.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{item.id.slice(0, 8)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize text-[10px] font-bold">
                        {item.contentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.author}</TableCell>
                    <TableCell className="text-sm">{item.publishDate}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10" 
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
