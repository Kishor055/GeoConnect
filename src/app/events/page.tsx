'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Filter, Plus, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const eventData = [
  {
    id: '1',
    title: 'Rooftop Tech Mixer',
    date: 'Fri, Oct 24 • 7:00 PM',
    location: 'Cloud 9 Lounge, Manhattan',
    attendees: 42,
    placeholderId: 'event-tech',
    category: 'Networking',
    price: 'Free'
  },
  {
    id: '2',
    title: 'Community Garden Cleanup',
    date: 'Sat, Oct 25 • 9:00 AM',
    location: 'Prospect Park South',
    attendees: 15,
    placeholderId: 'event-garden',
    category: 'Volunteer',
    price: 'Free'
  },
  {
    id: '3',
    title: 'Indie Film Night',
    date: 'Sun, Oct 26 • 8:30 PM',
    location: 'The Bioscope Cinema',
    attendees: 28,
    placeholderId: 'event-film',
    category: 'Entertainment',
    price: '$15'
  }
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const categories = ['All', 'Networking', 'Volunteer', 'Entertainment', 'Fitness', 'Food'];

  const toggleRSVP = (eventId: string, title: string) => {
    const isGoing = !rsvps[eventId];
    setRsvps(prev => ({ ...prev, [eventId]: isGoing }));
    toast({
      title: isGoing ? "RSVP Confirmed" : "RSVP Cancelled",
      description: isGoing ? `See you at ${title}!` : `Maybe next time.`,
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <header className="p-4 bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Local Events</h1>
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-90"
            onClick={() => toast({ title: "Feature Pending", description: "Event creation coming soon!" })}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Find events..." className="pl-10 bg-secondary/30 border-none rounded-xl h-11" />
          </div>
          <Button variant="secondary" size="icon" className="rounded-xl h-11 w-11 bg-white/5">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <Badge 
              key={cat}
              variant={activeCategory === cat ? 'default' : 'secondary'}
              className={cn(
                "px-4 py-1.5 cursor-pointer whitespace-nowrap rounded-full transition-all border-none font-black uppercase text-[10px] italic",
                activeCategory === cat ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:text-white"
              )}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-6 mt-2">
        {eventData.map((event) => {
          const img = PlaceHolderImages.find(p => p.id === event.placeholderId);
          const isGoing = rsvps[event.id];
          return (
            <Card key={event.id} className="overflow-hidden border-none bg-secondary/20 glass rounded-[2.5rem]">
              <div className="relative aspect-video mx-2 mt-2 rounded-[2rem] overflow-hidden">
                {img && (
                  <Image 
                    src={img.imageUrl} 
                    alt={event.title} 
                    fill 
                    className="object-cover"
                    data-ai-hint={img.imageHint}
                  />
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary backdrop-blur-md text-white border-none font-black italic uppercase text-[8px]">
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="glass border-white/20 text-white font-black italic uppercase text-[8px]">
                    {event.price}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{event.title}</h3>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">{event.date}</p>
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    {event.location.split(',')[0]}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" />
                    {event.attendees + (isGoing ? 1 : 0)} GOING
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    className={cn(
                      "flex-1 rounded-2xl h-11 font-black uppercase italic tracking-wider transition-all active:scale-95 shadow-lg",
                      isGoing ? "bg-green-500 hover:bg-green-600 text-white" : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                    )}
                    onClick={() => toggleRSVP(event.id, event.title)}
                  >
                    {isGoing ? (
                      <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> I'm Going</span>
                    ) : "Interested"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="glass border-white/10 rounded-2xl h-11 px-6 font-black uppercase italic text-[10px]"
                    onClick={() => toast({ title: "Share Link", description: "Event link copied to clipboard!" })}
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
