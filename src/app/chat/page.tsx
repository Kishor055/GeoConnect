'use client';

import { Search, Bell, Ghost, MessageSquare, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const chats = [
  { id: '1', name: 'Jhonny Bairstow', status: '37 Min ago', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/b1/100/100' },
  { id: '2', name: 'John Smith', status: 'Active Now', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/b2/100/100' },
  { id: '3', name: 'Jane Cooper', status: 'Active Now', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/b3/100/100' },
  { id: '4', name: 'Sara Jonson', status: '40 Min ago', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/b4/100/100' },
  { id: '5', name: 'Emma', status: 'Active Now', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/b5/100/100' },
];

export default function ChatListPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-black flex flex-col text-white pb-24">
      <header className="p-6 flex items-center justify-between">
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-white/10">
            <AvatarImage src="https://picsum.photos/seed/me/100/100" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-black rounded-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Ghost className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Search className="h-6 w-6" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <Bell className="h-6 w-6" />
            </Button>
            <div className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-colors group">
              <div className="relative">
                <Avatar className="h-14 w-14 ring-2 ring-white/5">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -left-1 bg-secondary p-1 rounded-full text-[8px] font-bold">15</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-1">{chat.name}</h3>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                  <span>{chat.status}</span>
                  <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                  <span>{chat.distance} . California USA</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/5 hover:bg-white/10 rounded-xl">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/5 hover:bg-white/10 rounded-xl">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}