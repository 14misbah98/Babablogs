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
    <div className="min-h-screen flex items-center justify-center bg-[#1A1209] text-[#F5ECD7] px-4 animate-fade-in-up font-body">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-serif text-2xl font-bold mb-2 tracking-tight hover:opacity-90 active:scale-98 transition-all text-[#F5ECD7]">
            <Library className="h-6 w-6 text-[#D4A354]" />
            <span>
              Baba<span className="text-[#8B6F47] font-light italic">Blogs</span> 
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#D4A354] bg-[#D4A354]/5 px-2 py-0.5 rounded border border-[#D4A354]/20 ml-1.5 align-middle">
                Archive
              </span>
            </span>
          </Link>
          <p className="text-[10px] text-[#8B6F47] uppercase tracking-[0.12em] font-sans font-semibold mt-2">
            Author Portal Access
          </p>
        </div>

        <Card className="border border-[#D4A354]/20 bg-[#2C200F]/80 backdrop-blur-md shadow-premium rounded-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-serif font-bold text-[#F5ECD7]">Sign In</CardTitle>
            <CardDescription className="font-sans text-[#8B6F47] text-sm">
              Enter your credentials to manage your digital archive.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5 font-sans">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-sans uppercase tracking-widest font-semibold text-[#8B6F47]">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="admin"
                  className="h-11 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/40 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-sans uppercase tracking-widest font-semibold text-[#8B6F47]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 bg-[#1A1209]/40 border border-[#D4A354]/20 hover:border-[#D4A354]/40 focus-visible:border-[#D4A354] text-[#F5ECD7] placeholder:text-[#8B6F47]/40 shadow-premium focus-visible:ring-1 focus-visible:ring-[#D4A354]/10 rounded-none transition-all text-sm font-sans"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-5 pt-4 pb-6 font-sans">
              <Button 
                type="submit" 
                className="w-full h-11 rounded-none font-sans uppercase tracking-[0.08em] text-xs font-semibold bg-[#D4A354] hover:bg-[#D4A354]/90 text-[#1A1209] transition-all hover:shadow-[0_0_15px_rgba(212,163,84,0.2)] cursor-pointer" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-[#1A1209]" /> : 'Access Dashboard'}
              </Button>
              <p className="text-center text-xs text-[#8B6F47]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-[#D4A354] font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-xs font-sans uppercase tracking-wider">
          <Link href="/" className="text-[#8B6F47] hover:text-[#D4A354] transition-colors italic">
            &larr; Return to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
