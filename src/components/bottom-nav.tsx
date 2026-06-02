'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, LayoutGrid, Camera, Zap, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/chat', icon: Users, label: 'Friends' },
  { href: '/reels', icon: LayoutGrid, label: 'Stories' },
  { href: '/', icon: Camera, label: '', center: true },
  { href: '/feed', icon: Zap, label: 'ZAP' },
  { href: '/events', icon: Calendar, label: 'Events' },
];

export function BottomNav() {
  const pathname = usePathname();
  
  if (pathname === '/auth') return null;

  return (
    <nav className="pill-nav px-4 min-w-[340px]">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        if (item.center) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative -top-1"
            >
              <div className={cn(
                "p-3 rounded-full bg-background border-2 transition-all duration-300",
                isActive ? "border-primary scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "border-white/10"
              )}>
                <Icon className="h-6 w-6 text-foreground" strokeWidth={2.5} />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 px-3 transition-all",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-5 w-5 mb-1", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
            <span className="text-[10px] font-bold tracking-tight uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}