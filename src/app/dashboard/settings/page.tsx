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
    // In a real app, this would call a server action to save to JSON
    toast.success('Settings Saved', {
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and platform preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              <CardTitle className="font-serif">Author Profile</CardTitle>
            </div>
            <CardDescription>How you appear across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="author-name">Display Name</Label>
              <Input 
                id="author-name" 
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author-bio">Short Bio</Label>
              <Input id="author-bio" placeholder="A brief description of your work..." />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <CardTitle className="font-serif">Platform Configuration</CardTitle>
            </div>
            <CardDescription>Global settings for BabaBlogs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Website Title</Label>
              <Input 
                id="site-name" 
                value={platformName} 
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-lang">Default Archive Language</Label>
              <Input 
                id="default-lang" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <CardTitle className="font-serif">Account Security</CardTitle>
            </div>
            <CardDescription>Change your login credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-pass">New Password</Label>
              <Input id="new-pass" type="password" placeholder="••••••••" />
            </div>
            <Button variant="outline" className="w-fit">Update Password</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="gap-2 px-8">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
