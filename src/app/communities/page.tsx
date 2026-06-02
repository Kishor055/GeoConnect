
'use client';

import { Search, Plus, MapPin, Users2, Globe, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const COMMUNITIES = [
  {
    id: 'c1',
    name: 'Brooklyn Tech Hub',
    members: '1.2k',
    type: 'Public',
    location: 'DUMBO, NY',
    image: 'https://picsum.photos/seed/comm1/600/300',
    description: 'Local developers, designers and tech enthusiasts.'
  },
  {
    id: 'c2',
    name: 'Morning Runners Club',
    members: '450',
    type: 'Public',
    location: 'Prospect Park',
    image: 'https://picsum.photos/seed/comm2/600/300',
    description: 'Early morning cardio and coffee sessions.'
  },
  {
    id: 'c3',
    name: 'Secret Supper Society',
    members: '85',
    type: 'Private',
    location: 'Hidden Venues',
    image: 'https://picsum.photos/seed/comm3/600/300',
    description: 'Exclusive underground dining experiences.'
  }
];

export default function CommunitiesPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background pb-24">
      <header className="px-4 pt-8 pb-4 space-y-6 sticky top-0 bg-background/80 backdrop-blur-xl z-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight uppercase italic">Communities</h1>
          <Button size="icon" className="rounded-2xl bg-primary h-11 w-11">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search nearby squads..." 
            className="pl-12 h-12 glass border-none rounded-2xl bg-secondary/30"
          />
        </div>
      </header>

      <div className="p-4 space-y-6">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Suggested for you</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {COMMUNITIES.map((comm) => (
              <Card key={comm.id} className="min-w-[200px] bg-secondary/20 border-none glass overflow-hidden rounded-[2rem] transition-all active:scale-95">
                <CardContent className="p-0">
                  <div className="relative h-24">
                    <Image src={comm.image} alt={comm.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="text-xs font-black truncate">{comm.name}</h3>
                    <div className="flex items-center gap-1 text-[8px] font-bold uppercase text-white/60">
                      <Users2 className="h-3 w-3" />
                      {comm.members} Members
                    </div>
                    <Button className="w-full h-8 text-[10px] font-black uppercase rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white">
                      Join Squad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Live Nearby</h2>
          <div className="space-y-4">
            {COMMUNITIES.map((comm) => (
              <Card key={comm.id} className="bg-secondary/10 border-none glass rounded-[2rem] overflow-hidden group">
                <CardContent className="p-0 flex items-stretch">
                  <div className="relative w-32 shrink-0">
                    <Image src={comm.image} alt={comm.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                  </div>
                  <div className="p-5 flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-black">{comm.name}</h3>
                      {comm.type === 'Private' ? (
                        <Lock className="h-3 w-3 text-primary" />
                      ) : (
                        <Globe className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                      {comm.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                        <MapPin className="h-3 w-3 text-primary" />
                        {comm.location}
                      </div>
                      <Badge className="bg-white/5 border border-white/10 text-[8px] px-2 py-0.5">
                        {comm.members}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
