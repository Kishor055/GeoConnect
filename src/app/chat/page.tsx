
'use client';

import { Search, Plus, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

const chats = [
  { id: '1', name: 'Alex Rivera', lastMsg: 'See you at the park! 🌳', time: '2m ago', unread: 2, avatar: 'https://picsum.photos/seed/a1/100/100', online: true },
  { id: '2', name: 'Design Group', lastMsg: 'Sarah: Love the new map icons.', time: '15m ago', unread: 0, avatar: 'https://picsum.photos/seed/g1/100/100', online: false },
  { id: '3', name: 'Marcus Wright', lastMsg: 'Sent a photo', time: '1h ago', unread: 0, avatar: 'https://picsum.photos/seed/a2/100/100', online: true },
  { id: '4', name: 'Elena Fisher', lastMsg: 'How was the meetup yesterday?', time: '3h ago', unread: 0, avatar: 'https://picsum.photos/seed/a3/100/100', online: false },
];

export default function ChatListPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background flex flex-col">
      <header className="p-4 bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-secondary/50"><Plus className="h-6 w-6" /></button>
            <button className="p-2 rounded-full hover:bg-secondary/50"><MoreVertical className="h-6 w-6" /></button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-10 bg-secondary/30 border-none h-11 rounded-xl" />
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/30 transition-colors active:scale-95 duration-100">
                <div className="relative">
                  <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                      {chat.lastMsg}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center font-bold">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
