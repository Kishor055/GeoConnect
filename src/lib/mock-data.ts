export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  interests: string[];
  location: { x: string; y: string; label: string; lat: string; lng: string };
  distance: string;
  status: string;
  telemetry: {
    signal: number;
    activity: string;
    lastSeen: string;
  };
}

export interface SocialPost {
  id: string;
  userId: string;
  location: string;
  imageUrl: string;
  caption: string;
  likes: number;
  time: string;
}

export interface ReelContent {
  id: string;
  user: { name: string; avatar: string; followed: boolean };
  content: string;
  caption: string;
  likes: number;
  comments: number;
  music: string;
}

export interface ChatEntry {
  id: string;
  name: string;
  status: string;
  distance: string;
  avatar: string;
  lastMsg: string;
}

export interface GeoPlace {
  id: string;
  name: string;
  category: 'Cafe' | 'Park' | 'Gym' | 'Tech';
  location: { x: string; y: string };
  rating: number;
  description: string;
}

export interface EventEntry {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  placeholderId: string;
  category: string;
  price: string;
}

export interface LocationHistoryEntry {
  id: string;
  placeName: string;
  timestamp: string;
  duration: string;
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Elena Fisher',
    bio: 'Avid explorer of urban spaces, coffee enthusiast, and tech entrepreneur.',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    interests: ['Photography', 'Hiking', 'Specialty Coffee'],
    location: { x: '45%', y: '30%', label: 'Sunset Cliffs', lat: '34.0522', lng: '-118.2437' },
    distance: '0.4 km',
    status: 'Exploring 📸',
    telemetry: { signal: 92, activity: 'Active', lastSeen: '1m ago' }
  },
  {
    id: 'u2',
    name: 'Marcus Wright',
    bio: 'Always looking for the best rooftop views and hidden gardens in the city.',
    avatar: 'https://picsum.photos/seed/user2/200/200',
    interests: ['Architecture', 'Urban Gardening', 'Tech'],
    location: { x: '60%', y: '50%', label: 'The Local Grind', lat: '34.0530', lng: '-118.2445' },
    distance: '1.2 km',
    status: 'Working from Cafe ☕️',
    telemetry: { signal: 85, activity: 'Stationary', lastSeen: '5m ago' }
  },
  {
    id: 'u3',
    name: 'Sarah Chen',
    bio: 'Design nerd and fitness junkie. Love meeting new people in the community.',
    avatar: 'https://picsum.photos/seed/user3/200/200',
    interests: ['Design', 'Running', 'Networking'],
    location: { x: '30%', y: '65%', label: 'McCarren Park', lat: '34.0515', lng: '-118.2450' },
    distance: '0.8 km',
    status: 'Running late! 🏃‍♀️',
    telemetry: { signal: 78, activity: 'Moving', lastSeen: 'Now' }
  }
];

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'p1',
    userId: 'u1',
    location: 'Sunset Cliffs, CA',
    imageUrl: 'https://picsum.photos/seed/post1/600/800',
    caption: 'Best sunset I have seen in a long time! 🌅',
    likes: 124,
    time: '2h ago'
  },
  {
    id: 'p2',
    userId: 'u2',
    location: 'The Local Grind',
    imageUrl: 'https://picsum.photos/seed/post2/600/800',
    caption: 'Morning fueling station. Highly recommend the oat latte here! ☕️',
    likes: 56,
    time: '4h ago'
  },
  {
    id: 'p3',
    userId: 'u3',
    location: 'McCarren Park',
    imageUrl: 'https://picsum.photos/seed/post3/600/800',
    caption: 'Great session today! Who is joining for the night run?',
    likes: 89,
    time: '1h ago'
  }
];

export const MOCK_REELS: ReelContent[] = [
  {
    id: 'r1',
    user: { name: 'Elena Fisher', avatar: 'https://picsum.photos/seed/user1/100/100', followed: false },
    content: 'https://picsum.photos/seed/reel1/1080/1920',
    caption: 'Chasing sunsets in Brooklyn 🌅 #citylife #vibes',
    likes: 12400,
    comments: 456,
    music: 'Midnight City - M83'
  },
  {
    id: 'r2',
    user: { name: 'Marcus Wright', avatar: 'https://picsum.photos/seed/user2/100/100', followed: true },
    content: 'https://picsum.photos/seed/reel2/1080/1920',
    caption: 'Morning brew perfection at The Local Grind ☕️',
    likes: 8200,
    comments: 231,
    music: 'Coffee Shop Jazz'
  },
  {
    id: 'r3',
    user: { name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/user3/100/100', followed: false },
    content: 'https://picsum.photos/seed/reel3/1080/1920',
    caption: 'New design lab reveal! Stay tuned for more. 🎨',
    likes: 5400,
    comments: 112,
    music: 'Creative Minds'
  }
];

export const MOCK_CHATS: ChatEntry[] = [
  { id: '1', name: 'Elena Fisher', status: '37 Min ago', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/user1/100/100', lastMsg: 'Yo, are you heading to the mixer?' },
  { id: '2', name: 'Marcus Wright', status: 'Active Now', distance: '1.2 mi', avatar: 'https://picsum.photos/seed/user2/100/100', lastMsg: 'That spot is amazing!' },
  { id: '3', name: 'Sarah Chen', status: 'Active Now', distance: '0.8 mi', avatar: 'https://picsum.photos/seed/user3/100/100', lastMsg: 'Sent a photo' },
  { id: '4', name: 'Sara Jonson', status: '40 Min ago', distance: '2.5 mi', avatar: 'https://picsum.photos/seed/b4/100/100', lastMsg: 'See you there!' },
  { id: '5', name: 'Emma Watson', status: 'Active Now', distance: '0.5 mi', avatar: 'https://picsum.photos/seed/b5/100/100', lastMsg: 'Haha sounds good' },
];

export const MOCK_EVENTS: EventEntry[] = [
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
  },
  {
    id: '4',
    title: 'Morning Yoga Session',
    date: 'Mon, Oct 27 • 6:30 AM',
    location: 'Central Park North',
    attendees: 56,
    placeholderId: 'event-tech',
    category: 'Fitness',
    price: '$10'
  }
];

export const MOCK_PLACES: GeoPlace[] = [
  { id: 'p1', name: 'Quantum Coffee', category: 'Cafe', location: { x: '55%', y: '40%' }, rating: 4.8, description: 'Futuristic brews and neon vibes.' },
  { id: 'p2', name: 'Silicon Park', category: 'Park', location: { x: '25%', y: '20%' }, rating: 4.5, description: 'A green lung for techies.' },
  { id: 'p3', name: 'Neon Fitness', category: 'Gym', location: { x: '70%', y: '70%' }, rating: 4.9, description: 'High-intensity cyberpunk workouts.' },
];

export const MOCK_HISTORY: LocationHistoryEntry[] = [
  { id: 'h1', placeName: 'Brooklyn Tech Hub', timestamp: 'Today, 10:00 AM', duration: '2h 15m' },
  { id: 'h2', placeName: 'Central Brew', timestamp: 'Yesterday, 4:30 PM', duration: '45m' },
  { id: 'h3', placeName: 'Pixel Garden', timestamp: 'Oct 22, 2:00 PM', duration: '1h 10m' },
];