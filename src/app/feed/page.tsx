'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { MOCK_POSTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function FeedPage() {
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    const isLiked = !likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: isLiked }));
    if (isLiked) {
      toast({
        title: "Post Liked",
        description: "Added to your favorite snaps.",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Shared",
      description: "Link copied to clipboard.",
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter uppercase text-primary">GEOSOCIAL</h1>
        <Button variant="ghost" size="icon" className="relative">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
        </Button>
      </header>

      <div className="p-4 space-y-6">
        {MOCK_POSTS.map((post) => (
          <Card key={post.id} className="border-none bg-secondary/20 overflow-hidden rounded-[2rem] glass">
            <CardHeader className="p-4 flex-row items-center space-x-3 space-y-0">
              <Avatar className="ring-2 ring-primary/20">
                <AvatarImage src={`https://picsum.photos/seed/${post.userId}/100/100`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-black uppercase italic">{post.userId === 'u1' ? 'Elena Fisher' : 'Marcus Wright'}</p>
                <div className="flex items-center text-[8px] text-muted-foreground font-bold uppercase tracking-widest">
                  <MapPin className="h-2 w-2 mr-1 text-primary" />
                  {post.location}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 relative aspect-[4/5] mx-2 mb-2 rounded-[1.5rem] overflow-hidden">
              <Image 
                src={post.imageUrl} 
                alt="Post content" 
                fill 
                className="object-cover"
                data-ai-hint="lifestyle"
              />
            </CardContent>
            <CardFooter className="flex-col items-start p-4 gap-3 pt-0">
              <div className="flex items-center gap-4 w-full">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 transition-colors",
                    likedPosts[post.id] ? "text-red-500 fill-red-500" : "text-white/60 hover:text-red-500"
                  )}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-primary">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-primary" onClick={handleShare}>
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
                  {post.likes + (likedPosts[post.id] ? 1 : 0)} LIKES
                </p>
                <p className="text-xs">
                  <span className="font-black italic uppercase mr-2">{post.userId === 'u1' ? 'Elena' : 'Marcus'}</span>
                  <span className="text-white/70">{post.caption}</span>
                </p>
                <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-2">{post.time}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
