
export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  interests: string[];
  location: { x: string; y: string; label: string };
  distance: string;
  status: string;
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

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Elena Fisher',
    bio: 'Avid explorer of urban spaces, coffee enthusiast, and tech entrepreneur.',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    interests: ['Photography', 'Hiking', 'Specialty Coffee'],
    location: { x: '45%', y: '30%', label: 'Sunset Cliffs' },
    distance: '0.4 km',
    status: 'Exploring 📸'
  },
  {
    id: 'u2',
    name: 'Marcus Wright',
    bio: 'Always looking for the best rooftop views and hidden gardens in the city.',
    avatar: 'https://picsum.photos/seed/user2/200/200',
    interests: ['Architecture', 'Urban Gardening', 'Tech'],
    location: { x: '60%', y: '50%', label: 'The Local Grind' },
    distance: '1.2 km',
    status: 'Working from Cafe ☕️'
  },
  {
    id: 'u3',
    name: 'Sarah Chen',
    bio: 'Design nerd and fitness junkie. Love meeting new people in the community.',
    avatar: 'https://picsum.photos/seed/user3/200/200',
    interests: ['Design', 'Running', 'Networking'],
    location: { x: '30%', y: '65%', label: 'McCarren Park' },
    distance: '0.8 km',
    status: 'Running late! 🏃‍♀️'
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
  }
];
