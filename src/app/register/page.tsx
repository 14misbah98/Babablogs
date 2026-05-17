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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 animate-fade-in-up font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-3xl font-bold mb-2 tracking-tight hover:opacity-90 active:scale-98 transition-all">
            <Library className="h-7 w-7 text-primary" />
            <span>Baba<span className="text-muted-foreground font-light italic">Blogs</span> <span className="font-sans text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 ml-1.5 align-middle">Archive</span></span>
          </Link>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Join our community of authors</p>
        </div>

        <Card className="border border-border/20 shadow-premium rounded-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif">Create an Account</CardTitle>
            <CardDescription className="font-sans">
              Enter your details to register as a new author.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 font-sans">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" className="h-10 border border-border/40 hover:border-primary/20 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold text-muted-foreground">Username</Label>
                <Input id="username" name="username" placeholder="johndoe" className="h-10 border border-border/40 hover:border-primary/20 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" className="h-10 border border-border/40 hover:border-primary/20 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg transition-all" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 font-sans">
              <Button type="submit" className="w-full h-11 rounded-full font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
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
