'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { registerUser } from '@/app/actions';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    try {
      const result = await registerUser(formData);
      if (result.success) {
        toast.success('Account created!', {
          description: 'You can now log in with your credentials.',
        });
        router.push('/login');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-12 animate-fade-in-up font-body">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-serif text-2xl font-bold mb-2 tracking-tight hover:opacity-90 active:scale-98 transition-all text-foreground">
            <Library className="h-6 w-6 text-primary" />
            <span>
              Baba<span className="text-muted-foreground font-light italic">Blogs</span> 
              <span className="font-sans text-[9px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/20 ml-1.5 align-middle">
                Archive
              </span>
            </span>
          </Link>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] font-sans font-semibold mt-2">
            Join our community of authors
          </p>
        </div>

        <Card className="border border-primary/20 bg-secondary/80 backdrop-blur-md shadow-premium rounded-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-serif font-bold text-foreground">Create an Account</CardTitle>
            <CardDescription className="font-sans text-muted-foreground text-sm">
              Enter your details to register as a new author.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 font-sans">
              {error && (
                <div className="bg-destructive/30 border border-destructive/30 text-destructive-foreground text-xs p-3 rounded-none">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-sans uppercase tracking-widest font-semibold text-muted-foreground">
                  Full Name
                </Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  className="h-11 bg-background/40 border border-primary/20 hover:border-primary/40 focus-visible:border-primary text-foreground placeholder:text-muted-foreground/40 shadow-premium focus-visible:ring-1 focus-visible:ring-primary/10 rounded-none transition-all text-sm font-sans" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-sans uppercase tracking-widest font-semibold text-muted-foreground">
                  Username
                </Label>
                <Input 
                  id="username" 
                  name="username" 
                  placeholder="johndoe" 
                  className="h-11 bg-background/40 border border-primary/20 hover:border-primary/40 focus-visible:border-primary text-foreground placeholder:text-muted-foreground/40 shadow-premium focus-visible:ring-1 focus-visible:ring-primary/10 rounded-none transition-all text-sm font-sans" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-sans uppercase tracking-widest font-semibold text-muted-foreground">
                  Password
                </Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-11 bg-background/40 border border-primary/20 hover:border-primary/40 focus-visible:border-primary text-foreground placeholder:text-muted-foreground/40 shadow-premium focus-visible:ring-1 focus-visible:ring-primary/10 rounded-none transition-all text-sm font-sans" 
                  required 
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-5 pt-4 pb-6 font-sans">
              <Button 
                type="submit" 
                className="w-full h-11 rounded-none font-sans uppercase tracking-[0.08em] text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-[0_0_15px_hsl(var(--primary) / 0.2)] flex items-center justify-center gap-2 cursor-pointer" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 text-primary-foreground" />
                    Sign Up
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
