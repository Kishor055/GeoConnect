
'use client';

import { useEffect, useState } from 'react';
import { Sparkles, MapPin, Users, TrendingUp, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 min-h-screen pb-24">
      <header className="flex justify-between items-center py-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic text-primary">GEOSOCIAL</h1>
          <p className="text-sm font-medium text-muted-foreground">{greeting}, Alex! ✨</p>
        </div>
        <Link href="/profile">
          <Avatar className="h-12 w-12 border-2 border-primary shadow-lg shadow-primary/20">
            <AvatarImage src="https://picsum.photos/seed/me/100/100" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </Link>
      </header>

      {/* AI Recommendation Banner */}
      <Card className="bg-gradient-to-br from-primary/30 to-purple-600/30 border-none glass overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            AI Matchmaker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">We noticed you're near <span className="font-bold text-primary">Williamsburg</span>. 3 people with matching interests are hanging out nearby!</p>
          <div className="flex -space-x-4 overflow-hidden py-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="border-4 border-background h-12 w-12 shadow-xl ring-2 ring-primary/20">
                <AvatarImage src={`https://picsum.photos/seed/suggest${i}/100/100`} />
              </Avatar>
            ))}
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold border-4 border-background shadow-xl">
              +12
            </div>
          </div>
          <Button size="lg" className="w-full gap-2 rounded-2xl bg-primary text-white hover:scale-105 transition-transform">
            Connect Now <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Discovery Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/map" className="contents">
          <Card className="hover:bg-accent/40 transition-all cursor-pointer border-none bg-secondary/20 glass group active:scale-95">
            <CardContent className="p-6 flex flex-col items-center gap-3">
              <div className="p-4 rounded-3xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <MapPin className="h-8 w-8" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">Map View</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/feed" className="contents">
          <Card className="hover:bg-accent/40 transition-all cursor-pointer border-none bg-secondary/20 glass group active:scale-95">
            <CardContent className="p-6 flex flex-col items-center gap-3">
              <div className="p-4 rounded-3xl bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <TrendingUp className="h-8 w-8" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">Feed</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Trust & Safety Status */}
      <Card className="bg-green-500/10 border-none glass py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <span className="text-xs font-medium">Safe Mode Active</span>
        </div>
        <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-500">Approx. Location</Badge>
      </Card>

      {/* Nearby Events Preview */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
            <Calendar className="h-5 w-5 text-primary" />
            Active Nearby
          </h2>
          <Button variant="link" size="sm" className="text-primary font-bold" asChild>
            <Link href="/events">See All</Link>
          </Button>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'Indie Creator Meet', location: 'Design Hub', time: 'In 2 hours', attendees: 12 },
            { title: 'Morning Run', location: 'McCarren Park', time: 'Tomorrow 8AM', attendees: 8 }
          ].map((event, i) => (
            <Card key={i} className="bg-secondary/10 border-none glass hover:bg-secondary/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex flex-col items-center justify-center text-primary border border-white/5 shadow-inner">
                  <span className="text-lg font-black">{i + 14}</span>
                  <span className="text-[8px] uppercase font-bold">OCT</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate">{event.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-tight">
                    {event.location} • {event.time}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-primary/10 text-primary text-[8px] h-5 rounded-lg border-none">
                    {event.attendees} going
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black">RSVP</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
