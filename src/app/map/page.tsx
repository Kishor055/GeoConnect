'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Navigation, Crosshair, X, MessageSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS, UserProfile } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleRecenter = () => {
    toast({
      title: "Recalibrating GPS",
      description: "Recentering map to your current location.",
    });
  };

  const handleMarkerClick = (user: UserProfile) => {
    setSelectedUser(user);
  };

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
        <div className="flex items-center gap-4 text-white/60">
          <Button variant="ghost" size="icon" className="hover:text-white">
            <Search className="h-7 w-7" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="hover:text-white">
              <Bell className="h-7 w-7" />
            </Button>
            <div className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-black" />
          </div>
        </div>
      </div>

      {/* Map Markers */}
      {isLoaded && MOCK_USERS.map((user) => (
        <div 
          key={user.id}
          className="absolute transition-all duration-500 animate-in fade-in zoom-in"
          style={{ left: user.location.x, top: user.location.y }}
        >
          <button 
            onClick={() => handleMarkerClick(user)}
            className={cn(
              "group relative flex flex-col items-center transition-transform hover:scale-110 active:scale-95",
              selectedUser?.id === user.id ? "scale-125 z-30" : "z-10"
            )}
          >
            <div className={cn(
              "p-[2px] rounded-full shadow-2xl transition-colors",
              selectedUser?.id === user.id ? "bg-primary" : "bg-gradient-to-tr from-primary to-purple-500"
            )}>
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full glass border-none">
              <span className="text-[8px] font-black text-white tracking-tighter uppercase italic">
                {user.name.split(' ')[0]}
              </span>
            </div>
          </button>
        </div>
      ))}

      {/* Selected User Card */}
      {selectedUser && (
        <div className="absolute bottom-36 left-6 right-6 z-30 animate-in slide-in-from-bottom-10 duration-300">
          <div className="glass rounded-[2rem] p-5 flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 h-8 w-8 rounded-full text-white/40 hover:text-white"
              onClick={() => setSelectedUser(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={selectedUser.avatar} />
              <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-black italic uppercase text-sm tracking-tight">{selectedUser.name}</h3>
              <p className="text-[10px] text-white/60 mb-2 truncate">{selectedUser.status}</p>
              <div className="flex gap-2">
                <Button size="sm" className="h-8 rounded-xl bg-primary text-[10px] font-black uppercase flex-1 gap-1">
                  <UserPlus className="h-3 w-3" /> Connect
                </Button>
                <Button variant="secondary" size="sm" className="h-8 w-10 rounded-xl bg-white/5">
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Controls */}
      <div className="absolute bottom-32 right-6 flex flex-col gap-4 z-20">
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-2xl glass border-none"
          onClick={handleRecenter}
        >
          <Crosshair className="h-6 w-6 text-white/60" />
        </Button>
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full bg-primary shadow-xl hover:scale-105 transition-transform active:scale-95"
          onClick={() => {
            toast({
              title: "Searching Proximity",
              description: "Updating discovery for new area...",
            });
          }}
        >
          <Navigation className="h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
}
