'use client';

import { useState, useEffect } from 'react';
import { Settings, MapPin, Grid, Bookmark, Heart, Edit2, Sparkles, Instagram, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { summarizeUserProfileBio } from '@/ai/flows/summarize-user-profile-bio';

export default function ProfilePage() {
  const [bioSummary, setBioSummary] = useState<string>('');
  const [isLoadingBio, setIsLoadingBio] = useState(false);
  const [isInstaConnected, setIsInstaConnected] = useState(false);

  const rawBio = "Avid explorer of urban spaces, coffee enthusiast, and tech entrepreneur. Always looking for the best rooftop views and hidden gardens in the city.";

  useEffect(() => {
    async function getSummary() {
      setIsLoadingBio(true);
      try {
        const result = await summarizeUserProfileBio({ bio: rawBio });
        setBioSummary(result.summary);
      } catch (err) {
        setBioSummary("Passionate about local exploration and community connection.");
      } finally {
        setIsLoadingBio(false);
      }
    }
    getSummary();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight uppercase italic font-black">Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <div className="p-6 text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-purple-500 to-pink-500 rounded-full blur-md opacity-30 animate-pulse" />
          <Avatar className="h-32 w-32 border-4 border-background relative ring-2 ring-white/5">
            <AvatarImage src="https://picsum.photos/seed/me/200/200" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Alex Rivera</h2>
            <CheckCircle2 className="h-5 w-5 text-primary fill-primary/20" />
          </div>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-1 opacity-60">
            <MapPin className="h-3 w-3" /> Brooklyn, New York
          </p>
        </div>

        {/* AI Bio Summary Card */}
        <Card className="bg-secondary/20 border-none glass overflow-hidden rounded-[2rem]">
          <CardContent className="p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">
              <Sparkles className="h-3 w-3" /> Neural Identity Summary
            </div>
            {isLoadingBio ? (
              <div className="space-y-2">
                <div className="h-3 w-full bg-primary/10 animate-pulse rounded-full" />
                <div className="h-3 w-2/3 bg-primary/10 animate-pulse rounded-full mx-auto" />
              </div>
            ) : (
              <p className="text-xs font-medium text-white/80 leading-relaxed italic">
                "{bioSummary}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Instagram Integration Card */}
        <Card className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-none glass rounded-[2rem] overflow-hidden">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-tight">Instagram</p>
                <p className="text-[10px] text-muted-foreground font-bold">
                  {isInstaConnected ? '@alex_explorer' : 'Not Connected'}
                </p>
              </div>
            </div>
            <Button 
              variant={isInstaConnected ? "secondary" : "default"}
              size="sm" 
              className="rounded-xl font-bold uppercase text-[10px] h-8 px-4"
              onClick={() => setIsInstaConnected(!isInstaConnected)}
            >
              {isInstaConnected ? 'Syncing' : 'Connect'}
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-8 py-2">
          <div className="text-center group cursor-pointer">
            <p className="font-black text-lg group-active:scale-90 transition-transform">1.2k</p>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Followers</p>
          </div>
          <div className="text-center group cursor-pointer">
            <p className="font-black text-lg group-active:scale-90 transition-transform">842</p>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Following</p>
          </div>
          <div className="text-center group cursor-pointer">
            <p className="font-black text-lg group-active:scale-90 transition-transform">156</p>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Posts</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 rounded-2xl h-12 bg-primary font-black uppercase italic tracking-wider shadow-lg shadow-primary/20">
            Edit Identity
          </Button>
          <Button variant="secondary" size="icon" className="rounded-2xl h-12 w-12 glass border-none">
            <LinkIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="w-full bg-transparent border-t border-white/5 rounded-none p-0 h-16">
          <TabsTrigger value="grid" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all">
            <Grid className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="likes" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all">
            <Heart className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all">
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="p-0.5 m-0">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image 
                  src={`https://picsum.photos/seed/profile${i + 20}/400/400`} 
                  alt="Post" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint="lifestyle photo"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
