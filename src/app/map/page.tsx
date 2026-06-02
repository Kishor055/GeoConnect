
'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Plus, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const mockUsers = [
  { id: '1', name: 'Alex', x: '45%', y: '30%', avatar: 'https://picsum.photos/seed/a1/100/100', status: 'Coffee?' },
  { id: '2', name: 'Sarah', x: '60%', y: '50%', avatar: 'https://picsum.photos/seed/a2/100/100', status: 'At the Park' },
  { id: '3', name: 'James', x: '30%', y: '65%', avatar: 'https://picsum.photos/seed/a3/100/100', status: 'Working' },
];

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden snap-map-bg">
      {/* Search Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search nearby..." 
            className="pl-10 glass bg-background/40 border-none shadow-2xl h-12 rounded-full"
          />
        </div>
        <Button size="icon" className="rounded-full h-12 w-12 glass bg-background/40 border-none">
          <Navigation className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Markers (Mock) */}
      {isLoaded && mockUsers.map((user) => (
        <div 
          key={user.id}
          className="absolute transition-all duration-1000 animate-in fade-in zoom-in"
          style={{ left: user.x, top: user.y }}
        >
          <div className="group relative cursor-pointer">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Card className="px-2 py-1 text-[10px] whitespace-nowrap glass">
                {user.status}
              </Card>
            </div>
            <div className="p-1 rounded-full bg-primary shadow-lg ring-4 ring-primary/20 animate-pulse">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-3">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:scale-105 transition-transform">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Nearby Preview */}
      <div className="absolute bottom-4 left-4 right-20 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {mockUsers.map((user) => (
          <Card key={user.id} className="flex-shrink-0 w-32 glass p-2 flex flex-col items-center space-y-2 border-none">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-xs font-bold truncate">{user.name}</p>
              <p className="text-[10px] text-muted-foreground">0.4 km away</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
