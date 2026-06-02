'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Loader2, Plus, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { recommendConnections, RecommendConnectionsOutput } from '@/ai/flows/recommend-connections';
import { MOCK_USERS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState<RecommendConnectionsOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const { toast } = useToast();
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-event');

  useEffect(() => {
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

  const handleAddStory = () => {
    toast({
      title: "Opening Camera",
      description: "Prepare to capture your moment.",
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6 min-h-screen pb-24 bg-background overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="px-4 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-20">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter italic text-primary uppercase leading-none">GEOSOCIAL</h1>
          <p className="text-[8px] uppercase font-black tracking-[0.3em] text-white/40 mt-1">Reality Unlocked</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative text-white/60 hover:text-primary"
            onClick={() => toast({ title: "Notifications", description: "No new activity nearby." })}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
          <Link href="/profile">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary transition-all">
              <AvatarImage src="https://picsum.photos/seed/me/100/100" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      {/* Stories Row */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={handleAddStory}
            className="flex flex-col items-center gap-1 min-w-[70px] group transition-transform active:scale-90"
          >
            <div className="relative h-16 w-16 rounded-3xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-secondary/20 group-hover:border-primary/50 transition-colors">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Add Story</span>
          </button>
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer active:scale-95 transition-transform">
              <div className="h-16 w-16 rounded-3xl p-[3px] bg-gradient-to-tr from-primary to-purple-500">
                <div className="h-full w-full rounded-[21px] border-2 border-background overflow-hidden bg-secondary relative">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
              <span className="text-[8px] font-black uppercase italic truncate w-full text-center tracking-widest">{user.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence Card */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-primary/30 to-purple-600/20 border-none glass overflow-hidden relative rounded-[2.5rem]">
          <div className="absolute top-0 right-0 p-4">
            <Sparkles className="h-8 w-8 text-white/20 animate-pulse" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black italic uppercase flex items-center gap-2 tracking-tighter text-white">
              Neural Discovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingAi ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 italic">Analyzing Neighborhood...</p>
              </div>
            ) : recommendations && recommendations.recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.recommendations.slice(0, 2).map((rec) => {
                  const user = MOCK_USERS.find(u => u.id === rec.id);
                  if (!user) return null;
                  return (
                    <div 
                      key={rec.id} 
                      className="flex items-center gap-3 bg-white/5 p-3 rounded-[1.5rem] glass border-none transition-all active:scale-95 cursor-pointer group"
                      onClick={() => toast({ title: "Neural Match", description: `You have ${rec.compatibilityScore}% shared interests with ${user.name}!` })}
                    >
                      <Avatar className="h-12 w-12 rounded-[1rem] ring-2 ring-white/5 group-hover:ring-primary/50 transition-all">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-black italic uppercase truncate text-white tracking-tight">{user.name}</p>
                          <Badge className="text-[7px] h-4 px-1.5 bg-primary/20 text-primary uppercase font-black italic tracking-widest border-none">
                            {rec.compatibilityScore}% MATCH
                          </Badge>
                        </div>
                        <p className="text-[9px] text-white/50 truncate italic mt-0.5 font-medium tracking-tight">"{rec.matchReason}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <Button size="lg" className="w-full gap-2 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-[10px] font-black uppercase italic tracking-widest" asChild>
              <Link href="/map">Meet Nearby <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Location */}
      <div className="px-4">
        <Card className="relative h-64 overflow-hidden rounded-[2.5rem] border-none glass group transition-all cursor-pointer active:scale-98" onClick={() => toast({ title: "Featured Event", description: "Redirecting to Collective Art Walk details..." })}>
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
            <div className="space-y-1">
              <Badge className="bg-primary backdrop-blur-sm border-none mb-2 text-[8px] uppercase font-black px-3 py-1 italic tracking-widest">Trending Zone</Badge>
              <h2 className="text-2xl font-black text-white leading-tight uppercase italic tracking-tighter">Bushwick Collective Art Walk</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-black ring-0">
                      <AvatarImage src={`https://picsum.photos/seed/a${i}/50/50`} />
                    </Avatar>
                  ))}
                </div>
                <p className="text-[9px] text-white/50 font-black uppercase tracking-widest">+142 others here</p>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-6 right-6 rounded-full bg-white text-black hover:bg-primary hover:text-white h-12 w-12 shadow-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
            <ArrowRight className="h-6 w-6" />
          </div>
        </Card>
      </div>

      {/* Safety Banner */}
      <div className="px-4">
        <div className="bg-green-500/5 border border-green-500/20 glass rounded-[1.5rem] py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span className="text-[8px] font-black text-green-200/60 uppercase tracking-[0.2em] italic">Quantum Encryption Active</span>
          </div>
          <Badge className="text-[7px] border-none text-green-500 bg-green-500/10 font-black uppercase italic tracking-widest">Safe Zone</Badge>
        </div>
      </div>
    </div>
  );
}
