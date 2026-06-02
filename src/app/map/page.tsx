'use client';

import { useState, useEffect } from 'react';
import { Search, Navigation, Crosshair, X, MessageSquare, UserPlus, List, Map as MapIcon, Sparkles, Activity, ShieldCheck, Wifi } from 'lucide-react';
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
  const [scanPulse, setScanPulse] = useState(true);
  const { toast } = useToast();

  const filters = ['All', 'Networking', 'Events', 'Safety', 'Alerts'];

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

    const interval = setInterval(() => setScanPulse(prev => !prev), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRecenter = () => {
    toast({
      title: "GPS Re-Calibration",
      description: "Map Lab locked on your current geo-signature.",
    });
  };

  const handleMarkerClick = (user: UserProfile) => {
    setSelectedUser(user);
    const match = recommendations?.recommendations.find(r => r.id === user.id);
    if (match && match.compatibilityScore > 70) {
      toast({
        title: `Neural Match: ${match.compatibilityScore}%`,
        description: match.matchReason,
      });
    }
  };

  const filteredUsers = activeFilter === 'All' 
    ? MOCK_USERS 
    : MOCK_USERS.filter(u => u.interests.some(i => i.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-mono">
      {/* MAP LAB BACKGROUND */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        viewMode === 'map' ? "opacity-100" : "opacity-0"
      )}>
        {/* Lab Grid */}
        <div className="absolute inset-0 lab-grid opacity-20 pointer-events-none" />
        
        {/* Dynamic Map Content */}
        <div className="absolute inset-0 map-dark-theme opacity-30">
          <div className="w-full h-full bg-[url('https://picsum.photos/seed/lab-vibe/1600/1200')] bg-cover" />
        </div>

        {/* Scanning Animation */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full">
          <div className="absolute animate-scan-ping bg-primary/20 rounded-full w-[400px] h-[400px]" />
          <div className="absolute animate-scan-ping bg-primary/10 rounded-full w-[600px] h-[600px] delay-700" />
        </div>
      </div>

      {/* LAB HUD OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none p-6">
        <div className="h-full w-full border border-white/5 rounded-[2rem] relative">
          {/* Corner Elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-3xl" />
          
          {/* Side Telemetry */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-8 hidden md:block">
            <div className="space-y-1">
              <p className="text-[8px] text-white/40 uppercase tracking-widest">Longitude</p>
              <p className="text-[10px] font-bold text-primary">-118.2437</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] text-white/40 uppercase tracking-widest">Latitude</p>
              <p className="text-[10px] font-bold text-primary">34.0522</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] text-white/40 uppercase tracking-widest">Accuracy</p>
              <p className="text-[10px] font-bold text-primary">+/- 4m</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROL INTERFACE */}
      <div className="absolute top-8 left-0 right-0 z-40 px-6 space-y-4">
        <header className="flex items-center justify-between pointer-events-auto">
          <div className="flex bg-black/60 backdrop-blur-xl p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase italic tracking-widest transition-all",
                viewMode === 'map' ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <MapIcon className="h-3 w-3" /> Live Lab
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase italic tracking-widest transition-all",
                viewMode === 'list' ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <List className="h-3 w-3" /> Signals
            </button>
          </div>
          
          <div className="flex items-center gap-2">
             <Badge className="bg-primary/10 border-none text-primary text-[8px] px-3 py-1 font-black italic tracking-widest uppercase">
              Lab Active
            </Badge>
            <Avatar className="h-10 w-10 border-2 border-primary/20 ring-2 ring-black">
              <AvatarImage src="https://picsum.photos/seed/lab-user/100/100" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full whitespace-nowrap text-[8px] font-black uppercase italic tracking-widest transition-all border",
                activeFilter === filter ? "bg-white text-black border-white" : "bg-black/60 text-white/40 border-white/5 hover:border-white/20"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="h-full pt-32">
        {viewMode === 'map' ? (
          <div className="relative h-full w-full">
            {isLoaded && filteredUsers.map((user) => {
              const match = recommendations?.recommendations.find(r => r.id === user.id);
              const isHighMatch = match && match.compatibilityScore > 80;
              
              return (
                <div 
                  key={user.id}
                  className="absolute transition-all duration-700 animate-in fade-in zoom-in"
                  style={{ left: user.location.x, top: user.location.y }}
                >
                  <button 
                    onClick={() => handleMarkerClick(user)}
                    className={cn(
                      "group relative flex flex-col items-center transition-transform hover:scale-110 active:scale-95",
                      selectedUser?.id === user.id ? "scale-125 z-30" : "z-10"
                    )}
                  >
                    {/* Signal Ring */}
                    <div className={cn(
                      "absolute -inset-4 rounded-full border border-primary/0 transition-all duration-700",
                      selectedUser?.id === user.id ? "border-primary/40 scale-150 animate-pulse" : "group-hover:border-primary/20"
                    )} />

                    <div className={cn(
                      "p-1 rounded-[1.2rem] shadow-2xl transition-all duration-300",
                      isHighMatch ? "bg-gradient-to-tr from-primary to-purple-600 animate-pulse" : "bg-white/10 glass border-white/5"
                    )}>
                      <Avatar className="h-12 w-12 rounded-[1rem] border border-black/50">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Tag */}
                    <div className="mt-3 px-3 py-1 rounded-full glass border-white/5 flex items-center gap-1.5 backdrop-blur-md">
                      <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                      <span className="text-[7px] font-black text-white/80 tracking-widest uppercase italic leading-none">
                        {user.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* TELEMETRY LIST VIEW */
          <div className="px-6 h-full overflow-y-auto no-scrollbar pb-40 space-y-4">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 italic">Signal Intelligence Hub</h2>
            </div>
            
            {filteredUsers.map((user) => {
              const match = recommendations?.recommendations.find(r => r.id === user.id);
              return (
                <div 
                  key={user.id} 
                  className="glass rounded-3xl p-5 flex items-center gap-5 relative overflow-hidden group hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => handleMarkerClick(user)}
                >
                  <div className="relative">
                    <Avatar className="h-16 w-16 border border-white/10 rounded-2xl p-0.5">
                      <AvatarImage src={user.avatar} className="rounded-[14px] object-cover" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {match && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white px-2 py-0.5 rounded-lg text-[8px] font-black italic">
                        {match.compatibilityScore}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black italic uppercase text-xs tracking-wider">{user.name}</h3>
                        <p className="text-[8px] text-primary uppercase font-bold tracking-tighter">{user.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-bold text-white/40 uppercase">{user.distance}</p>
                         <p className="text-[7px] text-white/20 uppercase">Last seen: {user.telemetry.lastSeen}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[7px] font-black text-white/40 uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <Wifi className="h-2 w-2 text-primary" /> Signal: {user.telemetry.signal}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-2 w-2 text-primary" /> State: {user.telemetry.activity}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <Button size="sm" className="h-7 rounded-xl bg-primary text-[8px] font-black uppercase flex-1 shadow-lg shadow-primary/20">
                        Connect
                      </Button>
                      <Button variant="secondary" size="sm" className="h-7 w-9 rounded-xl bg-white/5 border border-white/5">
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

      {/* SELECTED USER HUD */}
      {viewMode === 'map' && selectedUser && (
        <div className="absolute bottom-36 left-6 right-6 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <div className="glass rounded-[2rem] p-6 relative overflow-hidden group">
            {/* HUD Scan Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-transparent opacity-50" />
            
            <button 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              onClick={() => setSelectedUser(null)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 rounded-[2rem] border border-white/10 p-1">
                  <AvatarImage src={selectedUser.avatar} className="rounded-[1.8rem] object-cover" />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -left-2 bg-green-500 p-1 rounded-full shadow-lg shadow-green-500/20">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-4">
                <div>
                  <h3 className="font-black italic uppercase text-xl tracking-tighter text-white">{selectedUser.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                     <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded italic">
                      {selectedUser.telemetry.activity}
                    </span>
                    <span className="text-[8px] text-white/40 uppercase font-black tracking-widest italic">{selectedUser.distance} Away</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="lg" className="flex-1 rounded-2xl h-12 bg-primary text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/30">
                    Neural Link
                  </Button>
                  <Button variant="secondary" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all">
                    <MessageSquare className="h-5 w-5 text-white/60" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Meta Stats */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[7px] text-white/30 uppercase tracking-widest mb-1">Last Seen</p>
                <p className="text-[9px] font-black text-white/80">{selectedUser.telemetry.lastSeen}</p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-[7px] text-white/30 uppercase tracking-widest mb-1">Interests</p>
                <p className="text-[9px] font-black text-white/80">{selectedUser.interests.length}</p>
              </div>
              <div className="text-center">
                <p className="text-[7px] text-white/30 uppercase tracking-widest mb-1">Proximity</p>
                <p className="text-[9px] font-black text-white/80">High</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION INTERFACE */}
      {viewMode === 'map' && (
        <div className="absolute bottom-32 right-6 flex flex-col gap-4 z-40 pointer-events-auto">
          <button 
            className="h-12 w-12 rounded-2xl glass border-white/5 flex items-center justify-center hover:bg-white/5 transition-all shadow-2xl"
            onClick={handleRecenter}
          >
            <Crosshair className="h-6 w-6 text-primary" />
          </button>
          <button 
            className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all group"
            onClick={() => {
              toast({
                title: "Laboratory Pulse",
                description: "Broadcasting geo-signature to nearby networking nodes.",
              });
            }}
          >
            <Navigation className="h-8 w-8 text-white group-hover:animate-pulse" />
          </button>
        </div>
      )}
    </div>
  );
}