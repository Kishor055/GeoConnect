'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Navigation, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/lib/mock-data';

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#121212]">
      {/* Background Map Simulation */}
      <div className="absolute inset-0 map-dark-theme opacity-30 grayscale pointer-events-none">
        <div className="w-full h-full bg-[url('https://picsum.photos/seed/map3/1600/1200')] bg-cover" />
      </div>

      {/* Header */}
      <div className="absolute top-10 left-6 right-6 z-20 flex items-center justify-between">
        <Avatar className="h-10 w-10 border-2 border-white/20">
          <AvatarImage src="https://picsum.photos/seed/me/100/100" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Search className="h-7 w-7" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <Bell className="h-7 w-7" />
            </Button>
            <div className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-black" />
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-[45%] left-[45%] h-32 w-32 bg-primary/40 rounded-full blur-[60px] animate-pulse" />
      <div className="absolute top-[30%] right-[20%] h-24 w-24 bg-red-500/30 rounded-full blur-[50px]" />

      {/* Map Markers */}
      {isLoaded && MOCK_USERS.map((user, idx) => (
        <div 
          key={user.id}
          className="absolute transition-all duration-1000 animate-in fade-in zoom-in text-center"
          style={{ left: user.location.x, top: user.location.y }}
        >
          <div className="group relative cursor-pointer flex flex-col items-center">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-primary to-purple-500 shadow-2xl">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <span className="mt-1 text-[10px] font-bold text-white/80 tracking-tight">
              {user.name.split(' ')[0]}
            </span>
            {idx === 1 && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-black" />
            )}
          </div>
        </div>
      ))}

      {/* Floating Map Controls */}
      <div className="absolute bottom-32 right-6 flex flex-col gap-4 z-20">
        <Button size="icon" className="h-12 w-12 rounded-2xl glass border-none">
          <Crosshair className="h-6 w-6 text-white/60" />
        </Button>
        <Button size="icon" className="h-14 w-14 rounded-full bg-primary shadow-xl hover:scale-105 transition-transform active:scale-95">
          <Navigation className="h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
}