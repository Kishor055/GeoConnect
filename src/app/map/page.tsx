'use client';

import { useState, useEffect } from 'react';
import { Search, Navigation, Crosshair, X, MessageSquare, UserPlus, List, Map as MapIcon, Sparkles, Activity, ShieldCheck, Wifi, Globe, Zap } from 'lucide-react';
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
      description: "Locked on Manhattan Sector 7. Accuracy: 98%.",
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
      {/* REAL MAP LAYER */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        viewMode === 'map' ? "opacity-100" : "opacity-0"
      )}>
        {/* Stylized Realistic Map Background (Manhattan) */}
        <div className="absolute inset-0 opacity-60">
          <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 brightness-50"
            style={{ filter: 'grayscale(1) brightness(0.4) contrast(1.5)' }}
          />
        </div>
        
        {/* Lab Grid & Data Scan Overlay */}
        <div className="absolute inset-0 lab-grid opacity-30 pointer-events-none" />
        
        {/* Dynamic Scanning Pulse */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full">
          <div className="absolute animate-scan-ping bg-primary/20 rounded-full w-[500px] h-[500px]" />
          <div className="absolute animate-scan-ping bg-primary/10 rounded-full w-[800px] h-[800px] delay-1000" />
        </div>
      </div>

      {/* LAB HUD HUD OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none p-6">
        <div className="h-full w-full border border-white/5 rounded-[2rem] relative">
          {/* HUD Brackets */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-[2rem]" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/60 rounded-tr-[2rem]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/60 rounded-bl-[2rem]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-[2rem]" />
          
          {/* Side Telemetry (Left) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-12 hidden md:block opacity-50">
            <div className="space-y-1">
              <p className="text-[7px] uppercase tracking-[0.4em]">Node-ID</p>
              <p className="text-[10px] font-black text-primary">NY-772-B</p>
            </div>
            <div className="space-y-1">
              <p className="text-[7px] uppercase tracking-[0.4em]">Signal-R</p>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={cn("h-3 w-1", i <= 4 ? "bg-primary" : "bg-white/10")} />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[7px] uppercase tracking-[0.4em]">Latency</p>
              <p className="text-[10px] font-black text-primary">14ms</p>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 opacity-60">
             <div className="flex items-center gap-2">
                <Globe className="h-3 w-3 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-[8px] font-black tracking-widest uppercase">Live-Sync</span>
             </div>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span className="text-[8px] font-black tracking-widest uppercase">5G-Quantum</span>
             </div>
          </div>
        </div>
      </div>

      {/* INTERFACE CONTROLS */}
      <div className="absolute top-8 left-0 right-0 z-40 px-8 space-y-6">
        <header className="flex items-center justify-between pointer-events-auto">
          <div className="flex bg-black/80 backdrop-blur-2xl p-1.5 rounded-[1.8rem] border border-white/10 shadow-2xl">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase italic tracking-[0.2em] transition-all",
                viewMode === 'map' ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-white/40 hover:text-white"
              )}
            >
              <MapIcon className="h-3 w-3" /> Map-Lab
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase italic tracking-[0.2em] transition-all",
                viewMode === 'list' ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-white/40 hover:text-white"
              )}
            >
              <List className="h-3 w-3" /> Signals
            </button>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[8px] font-black text-primary uppercase italic">Agent Riviera</span>
                <span className="text-[7px] text-white/40 font-bold uppercase">Manhattan Dist. 7</span>
             </div>
             <Avatar className="h-12 w-12 border-2 border-primary/40 p-1 bg-black">
               <AvatarImage src="https://picsum.photos/seed/lab-user/100/100" className="rounded-full" />
               <AvatarFallback>ME</AvatarFallback>
             </Avatar>
          </div>
        </header>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pointer-events-auto pb-2">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-full whitespace-nowrap text-[9px] font-black uppercase italic tracking-widest transition-all border",
                activeFilter === filter ? "bg-white text-black border-white shadow-xl" : "bg-black/60 text-white/40 border-white/10 hover:border-white/30 backdrop-blur-md"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC MARKERS ON MAP */}
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
                    {/* Pulsing Proximity Halo */}
                    <div className={cn(
                      "absolute -inset-6 rounded-full border border-primary/0 transition-all duration-1000",
                      selectedUser?.id === user.id ? "border-primary/50 scale-150 animate-pulse" : "group-hover:border-primary/20"
                    )} />

                    {/* Node Core */}
                    <div className={cn(
                      "p-1.5 rounded-[1.4rem] shadow-2xl transition-all duration-300 relative",
                      isHighMatch ? "bg-gradient-to-tr from-primary via-purple-600 to-primary animate-pulse border-none shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "bg-white/10 glass border-white/20"
                    )}>
                      <Avatar className="h-14 w-14 rounded-[1.2rem] border border-black/50">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {/* Signal Status Dot */}
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 border-2 border-black rounded-full" />
                    </div>

                    {/* HUD Metadata Tag */}
                    <div className="mt-4 px-4 py-1.5 rounded-[0.8rem] glass border-white/10 flex items-center gap-2 backdrop-blur-xl group-hover:border-primary/40 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      <span className="text-[8px] font-black text-white tracking-[0.2em] uppercase italic leading-none">
                        {user.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* TELEMETRY SIGNALS LIST */
          <div className="px-8 h-full overflow-y-auto no-scrollbar pb-48 space-y-4">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/80 italic">Signal-Intel Hub</h2>
              </div>
              <Badge variant="outline" className="text-[8px] border-primary/40 text-primary font-black uppercase tracking-widest italic px-3">
                {filteredUsers.length} Nodes Active
              </Badge>
            </div>
            
            {filteredUsers.map((user) => {
              const match = recommendations?.recommendations.find(r => r.id === user.id);
              return (
                <div 
                  key={user.id} 
                  className="glass rounded-[2rem] p-6 flex items-center gap-6 relative overflow-hidden group hover:bg-white/5 transition-all cursor-pointer border-white/10 hover:border-primary/30"
                  onClick={() => handleMarkerClick(user)}
                >
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-white/10 rounded-[1.5rem] p-1">
                      <AvatarImage src={user.avatar} className="rounded-[1.2rem] object-cover" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {match && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white px-3 py-1 rounded-[0.6rem] text-[9px] font-black italic shadow-lg shadow-primary/40">
                        {match.compatibilityScore}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black italic uppercase text-sm tracking-[0.1em] text-white">{user.name}</h3>
                        <p className="text-[9px] text-primary uppercase font-black tracking-tighter mt-0.5">{user.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{user.distance}</p>
                         <p className="text-[7px] text-white/20 uppercase mt-1">TS: {user.telemetry.lastSeen}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-3 w-3 text-primary/60" /> {user.telemetry.signal}%
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-primary/60" /> {user.telemetry.activity}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <Button size="sm" className="h-9 rounded-[1rem] bg-primary text-[9px] font-black uppercase flex-1 shadow-xl shadow-primary/20 italic tracking-widest">
                        Initialize Link
                      </Button>
                      <Button variant="secondary" size="sm" className="h-9 w-11 rounded-[1rem] bg-white/5 border border-white/10 hover:border-primary/20">
                        <MessageSquare className="h-4 w-4 text-white/60" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SELECTION HUD PANEL */}
      {viewMode === 'map' && selectedUser && (
        <div className="absolute bottom-32 left-8 right-8 z-50 animate-in slide-in-from-bottom-20 duration-500">
          <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)] border-white/10">
            {/* Animated Scan Line Overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-transparent opacity-50 animate-pulse" />
            
            <button 
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2"
              onClick={() => setSelectedUser(null)}
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-8">
              <div className="relative">
                <Avatar className="h-28 w-28 rounded-[2rem] border-2 border-white/10 p-1 bg-black/40">
                  <AvatarImage src={selectedUser.avatar} className="rounded-[1.8rem] object-cover" />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 -left-3 bg-green-500 p-2 rounded-[1rem] shadow-xl shadow-green-500/30">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-5">
                <div>
                  <h3 className="font-black italic uppercase text-2xl tracking-tight text-white">{selectedUser.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-[0.6rem] italic">
                      {selectedUser.telemetry.activity}
                    </span>
                    <span className="text-[9px] text-white/40 uppercase font-black tracking-widest italic">{selectedUser.distance} RADAR PROX</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1 rounded-[1.2rem] h-14 bg-primary text-[11px] font-black uppercase italic tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                    Establish Link
                  </Button>
                  <Button variant="secondary" size="icon" className="h-14 w-14 rounded-[1.2rem] bg-white/5 border border-white/10 group-hover:border-primary/40 transition-all">
                    <MessageSquare className="h-6 w-6 text-white/60" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Meta-Intel Grid */}
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mb-2">Signal TS</p>
                <p className="text-[10px] font-black text-white/80">{selectedUser.telemetry.lastSeen}</p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mb-2">Nodes-Shared</p>
                <p className="text-[10px] font-black text-white/80">{selectedUser.interests.length}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mb-2">Enc-Secure</p>
                <p className="text-[10px] font-black text-green-500">AES-256</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HUD ACTIONS */}
      {viewMode === 'map' && (
        <div className="absolute bottom-32 right-8 flex flex-col gap-4 z-40 pointer-events-auto">
          <button 
            className="h-14 w-14 rounded-[1.2rem] glass border-white/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all shadow-2xl"
            onClick={handleRecenter}
          >
            <Crosshair className="h-7 w-7 text-primary" />
          </button>
          <button 
            className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all group"
            onClick={() => {
              toast({
                title: "Broadcasting Node",
                description: "Manhattan Sector 7 node is now visible to nearby peers.",
              });
            }}
          >
            <Navigation className="h-9 w-9 text-white group-hover:animate-pulse" />
          </button>
        </div>
      )}
    </div>
  );
}
