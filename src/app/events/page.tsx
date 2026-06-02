
'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
  const categories = ['All', 'Networking', 'Volunteer', 'Entertainment', 'Fitness', 'Food'];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-20">
      <header className="p-4 bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Local Events</h1>
          <Button size="icon" variant="ghost" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Find events..." className="pl-10 bg-secondary/30 border-none rounded-xl h-11" />
          </div>
          <Button variant="secondary" size="icon" className="rounded-xl h-11 w-11">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <Badge 
              key={cat}
              variant={activeCategory === cat ? 'default' : 'secondary'}
              className="px-4 py-1.5 cursor-pointer whitespace-nowrap rounded-full transition-all border-none"
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
          return (
            <Card key={event.id} className="overflow-hidden border-none bg-secondary/20 glass rounded-3xl">
              <div className="relative aspect-video">
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
                  <Badge className="bg-primary/80 backdrop-blur-md text-white border-none">
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="outline" className="glass border-white/20 text-white font-bold">
                    {event.price}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold leading-tight">{event.title}</h3>
                  <p className="text-sm text-primary font-medium">{event.date}</p>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {event.attendees} attending
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-2xl h-11 shadow-lg shadow-primary/20">
                    I'm Interested
                  </Button>
                  <Button variant="outline" className="glass border-white/10 rounded-2xl h-11 px-6">
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
