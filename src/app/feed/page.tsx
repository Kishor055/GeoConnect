
'use client';

import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const posts = [
  {
    id: '1',
    user: { name: 'Elena Fisher', avatar: 'https://picsum.photos/seed/user1/100/100' },
    location: 'Sunset Cliffs, CA',
    image: 'https://picsum.photos/seed/post1/600/800',
    caption: 'Best sunset I have seen in a long time! 🌅',
    likes: 124,
    time: '2h ago'
  },
  {
    id: '2',
    user: { name: 'Marcus Wright', avatar: 'https://picsum.photos/seed/user2/100/100' },
    location: 'The Local Grind',
    image: 'https://picsum.photos/seed/post2/600/800',
    caption: 'Morning fueling station. Highly recommend the oat latte here! ☕️',
    likes: 56,
    time: '4h ago'
  }
];

export default function FeedPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b">
        <h1 className="text-xl font-bold italic tracking-tighter">GEOSOCIAL</h1>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </header>

      <div className="p-4 space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-none bg-secondary/20 overflow-hidden rounded-2xl">
            <CardHeader className="p-4 flex-row items-center space-x-3 space-y-0">
              <Avatar>
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-bold">{post.user.name}</p>
                <div className="flex items-center text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {post.location}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 relative aspect-[4/5]">
              <Image 
                src={post.image} 
                alt="Post content" 
                fill 
                className="object-cover"
                data-ai-hint="scenic post"
              />
            </CardContent>
            <CardFooter className="flex-col items-start p-4 gap-3">
              <div className="flex items-center gap-4 w-full">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold">{post.likes} likes</p>
                <p className="text-xs">
                  <span className="font-bold mr-2">{post.user.name}</span>
                  {post.caption}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase">{post.time}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
