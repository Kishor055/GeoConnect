'use client';

import { useEffect, useState } from 'react';
import { Sparkles, MapPin, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
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
    <div className="max-w-md mx-auto p-4 space-y-6 min-h-screen">
      <header className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, User!</h1>
          <p className="text-sm text-muted-foreground">Discover what is happening nearby.</p>
        </div>
        <Avatar className="h-12 w-12 border-2 border-primary">
          <AvatarImage src="https://picsum.photos/seed/me/100/100" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </header>

      {/* AI Recommendation Banner */}
      <Card className="bg-gradient-to-br from-primary/20 to-purple-500/20 border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            AI Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Based on your love for <Badge variant="secondary">Coffee</Badge> and <Badge variant="secondary">Tech</Badge>, we found 3 people you should meet nearby.</p>
          <div className="flex -space-x-3 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="border-2 border-background h-10 w-10">
                <AvatarImage src={`https://picsum.photos/seed/suggest${i}/100/100`} />
              </Avatar>
            ))}
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold border-2 border-background">
              +12
            </div>
          </div>
          <Button size="sm" className="w-full gap-2">
            View Recommendations <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/map" className="contents">
          <Card className="hover:bg-accent transition-colors cursor-pointer border-none bg-secondary/30">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-blue-500/20 text-blue-500">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold">Live Map</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/feed" className="contents">
          <Card className="hover:bg-accent transition-colors cursor-pointer border-none bg-secondary/30">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-orange-500/20 text-orange-500">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold">Trending</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Nearby Events */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Nearby Events
          </h2>
          <Button variant="link" size="sm" className="text-primary">See all</Button>
        </div>
        
        <div className="space-y-3">
          {[
            { title: 'Tech Meetup', location: 'Innovation Hub', time: 'Today, 6:00 PM' },
            { title: 'Morning Yoga', location: 'Central Park', time: 'Tomorrow, 8:00 AM' }
          ].map((event, i) => (
            <Card key={i} className="bg-secondary/20 border-none">
              <CardContent className="p-3 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {i + 14}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{event.location} • {event.time}</p>
                </div>
                <Button size="sm" variant="ghost">RSVP</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nearby Discovery */}
      <section className="space-y-4 pb-20">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Discovery
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden border-none bg-secondary/30">
              <div className="relative aspect-square">
                <Image 
                  src={`https://picsum.photos/seed/discovery${i}/300/300`} 
                  alt="Discovery" 
                  fill 
                  className="object-cover"
                  data-ai-hint="person portrait"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-[8px] h-4">Online</Badge>
                </div>
              </div>
              <div className="p-2 text-center">
                <p className="text-xs font-bold">User {i}</p>
                <p className="text-[10px] text-muted-foreground">Designer • 2km</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
