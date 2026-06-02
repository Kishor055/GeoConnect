
'use client';

import { Heart, MessageCircle, Share2, Music, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const REELS = [
  {
    id: 'r1',
    user: { name: 'Elena Fisher', avatar: 'https://picsum.photos/seed/user1/100/100' },
    content: 'https://picsum.photos/seed/reel1/1080/1920',
    caption: 'Chasing sunsets in Brooklyn 🌅 #citylife #vibes',
    likes: '12.4k',
    comments: '456',
    music: 'Midnight City - M83'
  },
  {
    id: 'r2',
    user: { name: 'Marcus Wright', avatar: 'https://picsum.photos/seed/user2/100/100' },
    content: 'https://picsum.photos/seed/reel2/1080/1920',
    caption: 'Morning brew perfection at The Local Grind ☕️',
    likes: '8.2k',
    comments: '231',
    music: 'Coffee Shop Jazz'
  }
];

export default function ReelsPage() {
  return (
    <div className="max-w-md mx-auto bg-black reels-container">
      {REELS.map((reel) => (
        <div key={reel.id} className="reel-item relative group">
          <Image 
            src={reel.content} 
            alt="Reel content" 
            fill 
            className="object-cover"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Right Actions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
            <div className="flex flex-col items-center gap-1">
              <div className="relative mb-2">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src={reel.user.avatar} />
                  <AvatarFallback>{reel.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary rounded-full p-0.5">
                  <UserPlus className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
                <Heart className="h-7 w-7" />
              </Button>
              <span className="text-[10px] font-bold text-white">{reel.likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
                <MessageCircle className="h-7 w-7" />
              </Button>
              <span className="text-[10px] font-bold text-white">{reel.comments}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
              <Share2 className="h-7 w-7" />
            </Button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-4 right-20 z-10 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-black text-white">@{reel.user.name.toLowerCase().replace(' ', '_')}</h3>
              <p className="text-xs text-white/90 leading-relaxed">{reel.caption}</p>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Music className="h-3 w-3 animate-pulse" />
              <marquee className="text-[10px] font-bold w-32 uppercase">{reel.music}</marquee>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
