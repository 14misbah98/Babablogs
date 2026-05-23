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
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5ECD7] mb-2">My Uploads</h1>
          <p className="text-sm text-[#8B6F47] font-serif italic">Manage your archived content and metadata.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <button className={cn(buttonVariants(), "gap-2 px-6 h-11 bg-[#D4A354] hover:bg-[#D4A354]/90 text-[#1A1209] border border-[#D4A354] hover:shadow-[0_0_15px_rgba(212,163,84,0.2)] rounded-none text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer")}>
                <Plus className="h-4 w-4 text-[#1A1209]" />
                New Upload
              </button>
            }
          />
          <DialogContent className="sm:max-w-[500px] border border-[#D4A354]/25 bg-[#1A1209] text-[#F5ECD7] rounded-none shadow-premium font-sans">
            <DialogHeader className="border-b border-[#D4A354]/15 pb-4">
              <DialogTitle className="font-serif text-xl text-[#D4A354] font-bold">Upload New Content</DialogTitle>
              <DialogDescription className="text-xs text-[#8B6F47] mt-1 font-sans">
                Add a PDF, Image, or Text file. AI OCR will automatically extract and index the text.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Title</Label>
                  <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Author Name</Label>
                  <Input id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Content Type</Label>
                  <Select value={contentType} onValueChange={(v) => { if (v) setContentType(v as ContentType); }}>
                    <SelectTrigger id="type" className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none transition-all font-sans text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2C200F] border border-[#D4A354]/25 text-[#F5ECD7] rounded-none font-sans">
                      <SelectItem value="pdf" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">PDF Document</SelectItem>
                      <SelectItem value="image" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Image / Scan</SelectItem>
                      <SelectItem value="text" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lang" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Language</Label>
                  <Select value={language} onValueChange={(v) => { if (v) setLanguage(v); }}>
                    <SelectTrigger id="lang" className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none transition-all font-sans text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2C200F] border border-[#D4A354]/25 text-[#F5ECD7] rounded-none font-sans">
                      <SelectItem value="English" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">English</SelectItem>
                      <SelectItem value="Urdu" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Urdu</SelectItem>
                      <SelectItem value="Hindi" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Hindi</SelectItem>
                      <SelectItem value="Marathi" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Publish Date</Label>
                  <Input id="date" type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="history, research, archive" value={tags} onChange={e => setTags(e.target.value)} className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="file" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">File Attachment</Label>
                <Input id="file" type="file" onChange={e => setFile(e.target.files?.[0] || null)} required className="h-11 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-xs pt-2.5 cursor-pointer file:bg-[#D4A354] file:text-[#1A1209] file:border-none file:h-7 file:font-sans file:uppercase file:text-[9px] file:font-bold file:px-3 file:mr-3" />
                <p className="text-[9px] text-[#8B6F47] uppercase tracking-widest font-semibold mt-1">Supports PDF, JPG, PNG, TXT</p>
              </div>
              
              <DialogFooter className="pt-4 border-t border-[#D4A354]/10 gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-none text-xs uppercase tracking-widest text-[#8B6F47] hover:bg-[#2C200F] cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading} className="rounded-none text-xs uppercase tracking-widest font-semibold bg-[#D4A354] hover:bg-[#D4A354]/90 text-[#1A1209] px-6 cursor-pointer">
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Start Archiving'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px] border border-[#D4A354]/25 bg-[#1A1209] text-[#F5ECD7] rounded-none shadow-premium font-sans">
            <DialogHeader className="border-b border-[#D4A354]/15 pb-4">
              <DialogTitle className="font-serif text-xl text-[#D4A354] font-bold">Edit Content Metadata</DialogTitle>
              <DialogDescription className="text-xs text-[#8B6F47] mt-1 font-sans">
                Update the metadata details for your archived item. (Note: Attached file cannot be changed).
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Title</Label>
                  <Input id="edit-title" value={title} onChange={e => setTitle(e.target.value)} required className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-author" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Author Name</Label>
                  <Input id="edit-author" value={author} onChange={e => setAuthor(e.target.value)} required className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-lang" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Language</Label>
                  <Select value={language} onValueChange={(v) => { if (v) setLanguage(v); }}>
                    <SelectTrigger id="edit-lang" className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none transition-all font-sans text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2C200F] border border-[#D4A354]/25 text-[#F5ECD7] rounded-none font-sans">
                      <SelectItem value="English" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">English</SelectItem>
                      <SelectItem value="Urdu" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Urdu</SelectItem>
                      <SelectItem value="Hindi" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Hindi</SelectItem>
                      <SelectItem value="Marathi" className="rounded-none cursor-pointer hover:bg-[#D4A354]/10 focus:bg-[#D4A354]/10">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Publish Date</Label>
                  <Input id="edit-date" type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags" className="text-[9px] uppercase tracking-widest text-[#8B6F47] font-semibold">Tags (comma separated)</Label>
                <Input id="edit-tags" placeholder="history, research, archive" value={tags} onChange={e => setTags(e.target.value)} className="h-10 bg-[#2C200F]/45 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-sm" />
              </div>
              <DialogFooter className="pt-4 border-t border-[#D4A354]/10 gap-2">
                <Button type="button" variant="ghost" onClick={() => { setIsEditDialogOpen(false); setEditingItem(null); resetForm(); }} className="rounded-none text-xs uppercase tracking-widest text-[#8B6F47] hover:bg-[#2C200F] cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading} className="rounded-none text-xs uppercase tracking-widest font-semibold bg-[#D4A354] hover:bg-[#D4A354]/90 text-[#1A1209] px-6 cursor-pointer">
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Uploads Card */}
      <Card className="border border-[#D4A354]/15 bg-[#2C200F]/80 rounded-none shadow-premium overflow-hidden">
        <CardHeader className="pb-4 border-b border-[#D4A354]/10">
          <div className="relative group max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47] group-focus-within:text-[#D4A354] transition-colors" />
            <Input 
              placeholder="Search by title, author, or tags..." 
              className="pl-10 max-w-md bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/40 rounded-none focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 transition-all font-sans text-xs h-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#0F0B06]/50 border-b border-[#D4A354]/10">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11 px-6">Title</TableHead>
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11">Type</TableHead>
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11">Author</TableHead>
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11">Date</TableHead>
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11">Tags</TableHead>
                <TableHead className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A354] h-11 text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#D4A354]" />
                  </TableCell>
                </TableRow>
              ) : filteredItems.length === 0 ? (
                <TableRow className="border-[#D4A354]/10 hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-16 text-sm text-[#8B6F47] italic font-serif">
                    {searchQuery ? 'No results found for your search.' : 'No items found. Upload some content to get started.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-b border-[#D4A354]/10 hover:bg-[#1A1209]/20 transition-all duration-200">
                    <TableCell className="font-serif px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#F5ECD7]">{item.title}</span>
                        <span className="text-[9px] text-[#8B6F47] font-mono tracking-wide mt-0.5">{item.id.slice(0, 8)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="capitalize text-[8px] font-sans font-bold tracking-widest rounded-none border-[#D4A354]/30 text-[#D4A354] bg-[#D4A354]/5 px-2 py-0.5">
                        {item.contentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-[#8B6F47] font-medium py-4">{item.author}</TableCell>
                    <TableCell className="text-xs text-[#8B6F47] font-medium py-4">{item.publishDate}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[8px] bg-[#1A1209] border border-[#D4A354]/10 text-[#8B6F47] px-2 py-0.5 rounded-none font-sans font-bold tracking-wide uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <div className="flex justify-end gap-2.5">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none border border-[#D4A354]/20 hover:border-[#D4A354] hover:bg-[#D4A354]/10 text-[#D4A354] transition-all cursor-pointer"
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none border border-[#7f1d1d]/30 hover:border-[#f87171]/40 hover:bg-[#7f1d1d]/20 text-[#f87171] transition-all cursor-pointer" 
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
