
'use client';

import { useState, useEffect } from 'react';
import { Settings, MapPin, Grid, Bookmark, Heart, Edit2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { summarizeUserProfileBio } from '@/ai/flows/summarize-user-profile-bio';

export default function ProfilePage() {
  const [bioSummary, setBioSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const rawBio = "Avid explorer of urban spaces, coffee enthusiast, and tech entrepreneur. Always looking for the best rooftop views and hidden gardens in the city.";

  useEffect(() => {
    async function getSummary() {
      setIsLoading(true);
      try {
        const result = await summarizeUserProfileBio({ bio: rawBio });
        setBioSummary(result.summary);
      } catch (err) {
        setBioSummary("Passionate about local exploration and community connection.");
      } finally {
        setIsLoading(false);
      }
    }
    getSummary();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-20">
      <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight">Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      <div className="p-6 text-center space-y-4">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur opacity-25" />
          <Avatar className="h-28 w-28 border-4 border-background relative">
            <AvatarImage src="https://picsum.photos/seed/me/200/200" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Alex Rivera</h2>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <MapPin className="h-3 w-3" /> Brooklyn, NY
          </p>
        </div>

        {/* AI Bio Summary Card */}
        <Card className="bg-secondary/20 border-none glass overflow-hidden">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
              <Sparkles className="h-3 w-3" /> AI Summary
            </div>
            {isLoading ? (
              <div className="h-4 w-full bg-primary/10 animate-pulse rounded" />
            ) : (
              <p className="text-xs italic text-muted-foreground leading-relaxed">
                "{bioSummary}"
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-8 py-2">
          <div className="text-center">
            <p className="font-bold">1.2k</p>
            <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">842</p>
            <p className="text-[10px] text-muted-foreground uppercase">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">156</p>
            <p className="text-[10px] text-muted-foreground uppercase">Posts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 rounded-full h-11 bg-primary">
            Edit Profile
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full h-11 w-11">
            <Edit2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="w-full bg-transparent border-t border-white/5 rounded-none p-0 h-14">
          <TabsTrigger value="grid" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 border-primary">
            <Grid className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="likes" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 border-primary">
            <Heart className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 border-primary">
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="p-1">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="relative aspect-square">
                <Image 
                  src={`https://picsum.photos/seed/profile${i}/400/400`} 
                  alt="Post" 
                  fill 
                  className="object-cover"
                  data-ai-hint="lifestyle photo"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
