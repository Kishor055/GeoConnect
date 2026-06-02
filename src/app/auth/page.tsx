'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const orbits = [
  { seed: 'a1', delay: '0s', size: 'h-10 w-10' },
  { seed: 'a2', delay: '-4s', size: 'h-12 w-12' },
  { seed: 'a3', delay: '-8s', size: 'h-8 w-8' },
  { seed: 'a4', delay: '-12s', size: 'h-14 w-14' },
  { seed: 'a5', delay: '-16s', size: 'h-10 w-10' },
];

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Orbital Avatars */}
      <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center mb-12">
        {/* Main Center Profile */}
        <div className="z-20 relative p-1 rounded-full border-2 border-white/10">
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage src="https://picsum.photos/seed/thor/400/400" />
            <AvatarFallback>TR</AvatarFallback>
          </Avatar>
        </div>

        {/* Orbiting Ring */}
        <div className="absolute inset-0 border border-dashed border-white/10 rounded-full" />

        {orbits.map((item, idx) => (
          <div
            key={idx}
            className="absolute animate-orbit flex items-center justify-center"
            style={{ animationDelay: item.delay }}
          >
            <Avatar className={item.size}>
              <AvatarImage src={`https://picsum.photos/seed/${item.seed}/100/100`} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>

      <div className="space-y-4 max-w-xs z-10">
        <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
          Capture Life<br />One Snap at a Time
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed px-4">
          From quick chats to creative snaps, express yourself freely and share what makes your day unique.
        </p>
      </div>

      <div className="mt-12 w-full max-w-xs space-y-4 z-10">
        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full h-14" asChild>
          <Link href="/">Log in</Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          Don't have an account? <Link href="/" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
      </div>

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}