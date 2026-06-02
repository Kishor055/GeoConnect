
'use client';

import { useState, useEffect } from 'react';
import { Search, Navigation, Layers, Compass, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_USERS } from '@/lib/mock-data';

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden snap-map-bg">
      {/* Search Header */}
      <div className="absolute top-8 left-4 right-4 z-20 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search the neighborhood..." 
              className="pl-12 glass bg-background/30 border-none shadow-2xl h-14 rounded-3xl"
            />
          </div>
          <Button size="icon" className="rounded-3xl h-14 w-14 glass bg-background/30 border-none text-primary">
            <Navigation className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Friends', 'Meetups', 'Parties', 'Cafes'].map((f) => (
            <Badge key={f} className="glass bg-black/40 border-white/5 px-4 py-2 rounded-2xl cursor-pointer hover:bg-primary transition-colors text-[10px] font-bold uppercase tracking-widest">
              {f}
            </Badge>
          ))}
        </div>
      </div>

      {/* Map Markers (Mock) */}
      {isLoaded && MOCK_USERS.map((user) => (
        <div 
          key={user.id}
          className="absolute transition-all duration-1000 animate-in fade-in zoom-in"
          style={{ left: user.location.x, top: user.location.y }}
        >
          <div className="group relative cursor-pointer">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2">
              <Card className="px-3 py-1.5 text-[10px] whitespace-nowrap glass rounded-xl font-bold uppercase tracking-tighter">
                {user.status}
              </Card>
            </div>
            <div className="p-[2px] rounded-[2rem] bg-gradient-to-tr from-primary to-purple-500 shadow-2xl ring-8 ring-primary/10 animate-pulse">
              <div className="h-12 w-12 rounded-[1.9rem] overflow-hidden border-2 border-background bg-secondary">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.avatar} className="object-cover" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Floating Controls */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-4 z-20">
        <Button size="icon" className="h-12 w-12 rounded-2xl glass bg-background/40 border-none shadow-2xl">
          <Layers className="h-5 w-5" />
        </Button>
        <Button size="icon" className="h-12 w-12 rounded-2xl glass bg-background/40 border-none shadow-2xl">
          <Compass className="h-5 w-5" />
        </Button>
        <Button size="icon" className="h-16 w-16 rounded-[2rem] shadow-[0_15px_30px_rgba(139,92,246,0.4)] bg-primary hover:scale-105 transition-transform active:scale-95">
          <Filter className="h-7 w-7" />
        </Button>
      </div>

      {/* Active Nearby Preview */}
      <div className="absolute bottom-6 left-4 right-24 flex gap-4 overflow-x-auto no-scrollbar pb-4 z-20">
        {MOCK_USERS.map((user) => (
          <Card key={user.id} className="flex-shrink-0 w-40 glass p-3 flex gap-3 items-center border-none rounded-[2rem] transition-all active:scale-95 cursor-pointer">
            <Avatar className="h-12 w-12 rounded-2xl ring-2 ring-primary/20">
              <AvatarImage src={user.avatar} className="object-cover" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-[10px] font-black truncate uppercase tracking-tighter">{user.name.split(' ')[0]}</p>
              <p className="text-[8px] text-primary font-bold uppercase mt-0.5">{user.distance}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
