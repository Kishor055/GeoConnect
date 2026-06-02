'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Navigation, Crosshair, X, MessageSquare, UserPlus, List, Map as MapIcon, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS, UserProfile } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { recommendConnections, RecommendConnectionsOutput } from '@/ai/flows/recommend-connections';

type ViewMode = 'map' | 'list';

export default function MapPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendConnectionsOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const { toast } = useToast();

  const filters = ['All', 'Tech', 'Fitness', 'Design', 'Coffee'];

  useEffect(() => {
    setIsLoaded(true);
    async function getAiRecommendations() {
      setIsLoadingAi(true);
      try {
        const result = await recommendConnections({
          userInterests: ['Tech', 'Coffee', 'Design'],
          nearbyProfiles: MOCK_USERS.map(u => ({
            id: u.id,
            name: u.name,
            bio: u.bio,
            interests: u.interests,
            distance: u.distance
          }))
        });
        setRecommendations(result);
      } catch (err) {
        console.error('AI Flow error:', err);
      } finally {
        setIsLoadingAi(false);
      }
    }
    getAiRecommendations();
  }, []);

  const handleRecenter = () => {
    toast({
      title: "Recalibrating GPS",
      description: "Recentering map to your current location.",
    });
  };

  const handleMarkerClick = (user: UserProfile) => {
    setSelectedUser(user);
    const match = recommendations?.recommendations.find(r => r.id === user.id);
    if (match) {
      toast({
        title: `Match: ${match.compatibilityScore}%`,
        description: match.matchReason,
      });
    }
  };

  const filteredUsers = activeFilter === 'All' 
    ? MOCK_USERS 
    : MOCK_USERS.filter(u => u.interests.some(i => i.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background Map (Only in Map View) */}
      <div className={cn(
        "absolute inset-0 map-dark-theme transition-opacity duration-700 pointer-events-none",
        viewMode === 'map' ? "opacity-30" : "opacity-0"
      )}>
        <div className="w-full h-full bg-[url('https://picsum.photos/seed/map-grid/1600/1200')] bg-cover" />
      </div>

      {/* Dynamic Header */}
      <div className="absolute top-8 left-0 right-0 z-40 px-6 space-y-4">
        <header className="flex items-center justify-between">
          <div className="flex bg-black/40 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase italic transition-all",
                viewMode === 'map' ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <MapIcon className="h-3 w-3" /> Map
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase italic transition-all",
                viewMode === 'list' ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <List className="h-3 w-3" /> Networking
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-full border-none">
              <Search className="h-5 w-5 text-white/60" />
            </Button>
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/20 ring-2 ring-black">
                <AvatarImage src="https://picsum.photos/seed/me/100/100" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-black rounded-full" />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <Badge 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full cursor-pointer transition-all border-none font-black uppercase text-[8px] italic tracking-widest",
                activeFilter === filter ? "bg-white text-black" : "bg-black/40 text-white/40 glass"
              )}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full pt-32">
        {viewMode === 'map' ? (
          /* Map Markers */
          <div className="relative h-full w-full">
            {isLoaded && filteredUsers.map((user) => {
              const match = recommendations?.recommendations.find(r => r.id === user.id);
              const isHighMatch = match && match.compatibilityScore > 80;
              
              return (
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
                      "p-[3px] rounded-3xl shadow-2xl transition-all duration-300",
                      isHighMatch ? "bg-gradient-to-tr from-yellow-400 via-primary to-purple-600 animate-pulse" : "bg-white/20 glass border-none"
                    )}>
                      <Avatar className="h-12 w-12 rounded-[21px] border-2 border-black">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {isHighMatch && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full text-black shadow-lg">
                          <Sparkles className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 px-2 py-0.5 rounded-full glass border-none backdrop-blur-md">
                      <span className="text-[8px] font-black text-white tracking-tighter uppercase italic">
                        {user.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Networking List View */
          <div className="px-6 h-full overflow-y-auto no-scrollbar pb-32 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 italic">AI Powered Social Discovery</h2>
            </div>
            {filteredUsers.map((user) => {
              const match = recommendations?.recommendations.find(r => r.id === user.id);
              return (
                <div 
                  key={user.id} 
                  className="glass rounded-[2rem] p-5 flex items-center gap-4 relative overflow-hidden group hover:bg-white/5 transition-all"
                  onClick={() => handleMarkerClick(user)}
                >
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-primary/20 rounded-2xl">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {match && (
                      <div className="absolute -bottom-2 -right-2 bg-primary px-2 py-0.5 rounded-full text-[8px] font-black italic uppercase">
                        {match.compatibilityScore}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black italic uppercase text-sm tracking-tight">{user.name}</h3>
                      <span className="text-[8px] font-bold text-primary">{user.distance} away</span>
                    </div>
                    <p className="text-[10px] text-white/40 mb-3 truncate italic">{user.status}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 rounded-xl bg-primary text-[8px] font-black uppercase flex-1 gap-1">
                        <UserPlus className="h-3 w-3" /> Connect
                      </Button>
                      <Button variant="secondary" size="sm" className="h-7 w-9 rounded-xl bg-white/5 hover:bg-white/10">
                        <MessageSquare className="h-3 w-3 text-white/60" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected User Overlay (Only in Map View) */}
      {viewMode === 'map' && selectedUser && (
        <div className="absolute bottom-36 left-6 right-6 z-30 animate-in slide-in-from-bottom-10 duration-300">
          <div className="glass rounded-[2.5rem] p-6 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-3 right-3 h-8 w-8 rounded-full text-white/40 hover:text-white"
              onClick={() => setSelectedUser(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <Avatar className="h-20 w-20 border-2 border-primary/20 rounded-3xl">
              <AvatarImage src={selectedUser.avatar} />
              <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <h3 className="font-black italic uppercase text-lg tracking-tighter">{selectedUser.name}</h3>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-[10px] text-white/60 italic truncate">{selectedUser.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-10 rounded-2xl bg-primary text-[10px] font-black uppercase flex-1 gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                  <UserPlus className="h-4 w-4" /> Connect Now
                </Button>
                <Button variant="secondary" size="icon" className="h-10 w-12 rounded-2xl bg-white/5 border border-white/5">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Controls */}
      {viewMode === 'map' && (
        <div className="absolute bottom-32 right-6 flex flex-col gap-4 z-20">
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-2xl glass border-none shadow-2xl"
            onClick={handleRecenter}
          >
            <Crosshair className="h-6 w-6 text-white/60" />
          </Button>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full bg-primary shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95"
            onClick={() => {
              toast({
                title: "Neural Scan",
                description: "Updating discovery parameters for your current quadrant.",
              });
            }}
          >
            <Navigation className="h-7 w-7 text-white" />
          </Button>
        </div>
      )}
    </div>
  );
}
