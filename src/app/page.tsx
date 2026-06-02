
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

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Hello');
  const [recommendations, setRecommendations] = useState<RecommendConnectionsOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-event');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    async function getAiRecommendations() {
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

  return (
    <div className="max-w-md mx-auto space-y-6 min-h-screen pb-24 bg-background">
      {/* Dynamic Header */}
      <header className="px-4 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-20">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter italic text-primary">GEOSOCIAL</h1>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">Reality Unlocked</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
          <Link href="/profile">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="https://picsum.photos/seed/me/100/100" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      {/* Stories Row */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <div className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="relative h-16 w-16 rounded-3xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-secondary/20">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-bold uppercase opacity-60">Add Story</span>
          </div>
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[70px]">
              <div className="h-16 w-16 rounded-3xl p-[3px] bg-gradient-to-tr from-primary to-purple-500">
                <div className="h-full w-full rounded-[21px] border-2 border-background overflow-hidden bg-secondary">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    width={60} 
                    height={60} 
                    className="object-cover h-full w-full" 
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase truncate w-full text-center">{user.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence Card */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-primary/30 to-purple-600/20 border-none glass overflow-hidden relative rounded-[2rem]">
          <div className="absolute top-0 right-0 p-4">
            <Sparkles className="h-8 w-8 text-white/40 animate-pulse" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              Neural Discovery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingAi ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Analyzing Neighborhood...</p>
              </div>
            ) : recommendations && recommendations.recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.recommendations.slice(0, 2).map((rec) => {
                  const user = MOCK_USERS.find(u => u.id === rec.id);
                  if (!user) return null;
                  return (
                    <div key={rec.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl glass-card transition-transform active:scale-95">
                      <Avatar className="h-12 w-12 rounded-2xl">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold truncate">{user.name}</p>
                          <Badge variant="outline" className="text-[8px] h-4 px-1 border-primary/30 text-primary uppercase font-bold">
                            {rec.compatibilityScore}% match
                          </Badge>
                        </div>
                        <p className="text-[10px] text-white/60 truncate italic mt-0.5">"{rec.matchReason}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <Button size="lg" className="w-full gap-2 rounded-2xl bg-primary shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-xs font-bold uppercase" asChild>
              <Link href="/map">Meet Nearby <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Location */}
      <div className="px-4">
        <Card className="relative h-64 overflow-hidden rounded-[2rem] border-none glass group transition-all">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
            <div className="space-y-1">
              <Badge className="bg-primary backdrop-blur-sm border-none mb-2 text-[8px] uppercase font-black px-3 py-1">Trending Zone</Badge>
              <h2 className="text-2xl font-black text-white leading-tight">Bushwick Collective Art Walk</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-black ring-0">
                      <AvatarImage src={`https://picsum.photos/seed/a${i}/50/50`} />
                    </Avatar>
                  ))}
                </div>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-tight">+142 others here</p>
              </div>
            </div>
          </CardContent>
          <Button size="icon" className="absolute bottom-6 right-6 rounded-full bg-white text-black hover:bg-primary hover:text-white h-12 w-12 shadow-2xl">
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Card>
      </div>

      {/* Safety Banner */}
      <div className="px-4">
        <div className="bg-green-500/5 border border-green-500/20 glass rounded-2xl py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest">Quantum Encryption Active</span>
          </div>
          <Badge variant="outline" className="text-[8px] border-green-500/30 text-green-500 bg-green-500/10 font-bold uppercase">Safe Zone</Badge>
        </div>
      </div>
    </div>
  );
}
