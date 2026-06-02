
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Home, Play, Users2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/map', icon: Map, label: 'Map' },
  { href: '/reels', icon: Play, label: 'Reels' },
  { href: '/communities', icon: Users2, label: 'Social' },
  { href: '/profile', icon: User, label: 'Me' },
];

export function BottomNav() {
  const pathname = usePathname();
  
  if (pathname === '/auth') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background/80 backdrop-blur-xl border-t border-white/5 h-20 px-4 md:hidden pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 transition-all flex-1 py-2",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-colors",
              isActive && "bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            )}>
              <Icon className={cn("h-6 w-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
            </div>
            <span className={cn(
              "text-[9px] font-bold tracking-tight uppercase transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
