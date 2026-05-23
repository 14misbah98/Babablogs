'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Globe, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
  const [authorName, setAuthorName] = useState('Admin Author');
  const [platformName, setPlatformName] = useState('BabaBlogs');
  const [language, setLanguage] = useState('English');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings Saved', {
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5ECD7] mb-2">Settings</h1>
        <p className="text-sm text-[#8B6F47] font-serif italic">Manage your profile and platform preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Author Profile */}
        <Card className="border border-[#D4A354]/15 bg-[#2C200F]/80 rounded-none shadow-premium">
          <CardHeader className="border-b border-[#D4A354]/10 pb-4">
            <div className="flex items-center gap-2.5 text-[#D4A354]">
              <User className="h-4.5 w-4.5" />
              <CardTitle className="font-serif font-bold text-lg text-[#F5ECD7]">Author Profile</CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8B6F47] mt-1 font-sans">How you appear across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="author-name" className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-semibold">
                Display Name
              </Label>
              <Input 
                id="author-name" 
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. John Doe"
                className="h-10 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/30 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author-bio" className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-semibold">
                Short Bio
              </Label>
              <Input 
                id="author-bio" 
                placeholder="A brief description of your work..." 
                className="h-10 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/30 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
              />
            </div>
          </CardContent>
        </Card>

        {/* Platform Configuration */}
        <Card className="border border-[#D4A354]/15 bg-[#2C200F]/80 rounded-none shadow-premium">
          <CardHeader className="border-b border-[#D4A354]/10 pb-4">
            <div className="flex items-center gap-2.5 text-[#D4A354]">
              <Globe className="h-4.5 w-4.5" />
              <CardTitle className="font-serif font-bold text-lg text-[#F5ECD7]">Platform Configuration</CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8B6F47] mt-1 font-sans">Global settings for BabaBlogs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="site-name" className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-semibold">
                Website Title
              </Label>
              <Input 
                id="site-name" 
                value={platformName} 
                onChange={(e) => setPlatformName(e.target.value)}
                className="h-10 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/30 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-lang" className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-semibold">
                Default Archive Language
              </Label>
              <Input 
                id="default-lang" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="h-10 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/30 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border border-[#D4A354]/15 bg-[#2C200F]/80 rounded-none shadow-premium">
          <CardHeader className="border-b border-[#D4A354]/10 pb-4">
            <div className="flex items-center gap-2.5 text-[#D4A354]">
              <Shield className="h-4.5 w-4.5" />
              <CardTitle className="font-serif font-bold text-lg text-[#F5ECD7]">Account Security</CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8B6F47] mt-1 font-sans">Change your login credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="new-pass" className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-semibold">
                New Password
              </Label>
              <Input 
                id="new-pass" 
                type="password" 
                placeholder="••••••••" 
                className="h-10 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/30 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
              />
            </div>
            <Button 
              variant="outline" 
              className="w-fit h-9 bg-transparent hover:bg-[#D4A354]/10 text-[#D4A354] border border-[#D4A354]/40 hover:border-[#D4A354] rounded-none text-[10px] uppercase tracking-widest font-semibold cursor-pointer"
            >
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSave} 
          className="gap-2 px-8 h-12 bg-[#D4A354] hover:bg-[#D4A354]/90 text-[#1A1209] rounded-none uppercase tracking-[0.08em] text-xs font-semibold hover:shadow-[0_0_15px_rgba(212,163,84,0.2)] transition-all cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
