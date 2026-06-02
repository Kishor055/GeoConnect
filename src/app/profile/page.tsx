'use client';

import { useState, useEffect } from 'react';
import { Settings, MapPin, Grid, Bookmark, Heart, Edit2, Sparkles, Instagram, Link as LinkIcon, CheckCircle2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { summarizeUserProfileBio } from '@/ai/flows/summarize-user-profile-bio';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [bioSummary, setBioSummary] = useState<string>('');
  const [isLoadingBio, setIsLoadingBio] = useState(false);
  const [isInstaConnected, setIsInstaConnected] = useState(false);
  const { toast } = useToast();

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

  const handleEdit = () => {
    toast({
      title: "Identity Editor",
      description: "Profile updates will be synced with Neural Cloud.",
    });
  };

  const handleInstaToggle = () => {
    const newState = !isInstaConnected;
    setIsInstaConnected(newState);
    toast({
      title: newState ? "Instagram Synced" : "Account Disconnected",
      description: newState ? "Importing your latest media and followers..." : "Media sync stopped.",
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
        <h1 className="text-xl font-black italic uppercase tracking-tighter text-white">Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white" onClick={() => toast({ title: "Settings", description: "Privacy and account settings loaded." })}>
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <div className="p-6 text-center space-y-6">
        <div className="relative inline-block group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-purple-500 to-pink-500 rounded-full blur-md opacity-30 animate-pulse group-hover:opacity-60 transition-opacity" />
          <Avatar className="h-32 w-32 border-4 border-background relative ring-2 ring-white/5 cursor-pointer active:scale-95 transition-transform">
            <AvatarImage src="https://picsum.photos/seed/me/200/200" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary border-4 border-background hover:scale-110 active:scale-90" onClick={handleEdit}>
            <Edit2 className="h-3 w-3 text-white" />
          </Button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Alex Rivera</h2>
            <CheckCircle2 className="h-5 w-5 text-primary fill-primary/20" />
          </div>
          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em] flex items-center justify-center gap-1 opacity-60 italic">
            <MapPin className="h-3 w-3 text-primary" /> Brooklyn, New York
          </p>
        </div>

        {/* AI Bio Summary Card */}
        <Card className="bg-secondary/20 border-none glass overflow-hidden rounded-[2.5rem]">
          <CardContent className="p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.3em] mb-3 italic">
              <Sparkles className="h-3 w-3" /> Neural Identity Summary
            </div>
            {isLoadingBio ? (
              <div className="space-y-2">
                <div className="h-2 w-full bg-primary/10 animate-pulse rounded-full" />
                <div className="h-2 w-2/3 bg-primary/10 animate-pulse rounded-full mx-auto" />
              </div>
            ) : (
              <p className="text-[11px] font-bold text-white/80 leading-relaxed italic tracking-tight px-4">
                "{bioSummary}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Instagram Integration Card */}
        <Card className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-none glass rounded-[2rem] overflow-hidden group hover:scale-102 transition-transform">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90">Instagram</p>
                <p className="text-[9px] text-muted-foreground font-bold tracking-tight">
                  {isInstaConnected ? '@alex_explorer' : 'Not Connected'}
                </p>
              </div>
            </div>
            <Button 
              variant={isInstaConnected ? "secondary" : "default"}
              size="sm" 
              className={cn(
                "rounded-xl font-black uppercase italic text-[8px] h-8 px-4 tracking-widest transition-all",
                isInstaConnected ? "bg-white/5 text-white/60 hover:bg-white/10" : "bg-primary text-white shadow-lg shadow-primary/20"
              )}
              onClick={handleInstaToggle}
            >
              {isInstaConnected ? 'Syncing' : 'Connect'}
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-10 py-2">
          <div className="text-center group cursor-pointer active:scale-95 transition-transform">
            <p className="font-black text-xl italic uppercase tracking-tighter text-white">1.2k</p>
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">Followers</p>
          </div>
          <div className="text-center group cursor-pointer active:scale-95 transition-transform">
            <p className="font-black text-xl italic uppercase tracking-tighter text-white">842</p>
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">Following</p>
          </div>
          <div className="text-center group cursor-pointer active:scale-95 transition-transform">
            <p className="font-black text-xl italic uppercase tracking-tighter text-white">156</p>
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] italic">Posts</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 rounded-2xl h-12 bg-primary font-black uppercase italic tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-[11px]"
            onClick={handleEdit}
          >
            Edit Identity
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-2xl h-12 w-12 glass border-none text-white/60 hover:text-primary active:scale-90 transition-all"
            onClick={() => toast({ title: "Link Copied", description: "Profile URL is ready to share." })}
          >
            <LinkIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="w-full bg-transparent border-t border-white/5 rounded-none p-0 h-16">
          <TabsTrigger value="grid" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all text-white/40 data-[state=active]:text-primary">
            <Grid className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="likes" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all text-white/40 data-[state=active]:text-primary">
            <Heart className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1 h-full rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 border-primary transition-all text-white/40 data-[state=active]:text-primary">
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="p-0.5 m-0 animate-in fade-in duration-300">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer" onClick={() => toast({ title: "Media Insight", description: "View post analytics and engagement." })}>
                <Image 
                  src={`https://picsum.photos/seed/profile${i + 20}/400/400`} 
                  alt="Post" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint="lifestyle"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-3 w-3 fill-white" />
                      <span className="text-[10px] font-black">42</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
