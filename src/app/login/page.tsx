'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        toast.success('Welcome back!', {
          description: 'Successfully logged into the author portal.',
        });
        router.push('/dashboard');
      } else {
        const data = await res.json();
        toast.error('Login failed', {
          description: data.error || 'Invalid credentials',
        });
      }
    } catch (error) {
      toast.error('Error', {
        description: 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 animate-fade-in-up font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-serif text-2xl font-bold mb-2 tracking-tight hover:opacity-90 active:scale-98 transition-all">
            <Library className="h-6 w-6 text-primary" />
            <span>Baba<span className="text-muted-foreground font-light italic">Blogs</span> <span className="font-sans text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 ml-1.5 align-middle">Archive</span></span>
          </Link>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Author Portal Access</p>
        </div>

        <Card className="border border-border/20 shadow-premium rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
            <CardDescription className="font-sans">
              Enter your credentials to manage your digital archive.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 font-sans">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold text-muted-foreground">Username</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  className="h-10 border border-border/40 hover:border-primary/20 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 border border-border/40 hover:border-primary/20 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 font-sans">
              <Button type="submit" className="w-full h-11 rounded-full font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Access Dashboard'}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors italic">
            &larr; Return to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
