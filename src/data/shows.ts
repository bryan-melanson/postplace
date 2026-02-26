import { reactive } from 'vue';

export type PosterSize = 'small' | 'medium' | 'large' | 'wide';

export interface Show {
  id: number;
  title: string;
  artist: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  genre: string;
  posterSize: PosterSize;
  imageUrl: string;
  accentColor: string;
}

export const shows = reactive<Show[]>([
  {
    id: 1,
    title: 'Electric Nights',
    artist: 'The Voltage',
    venue: 'Metro Arena',
    date: 'March 15, 2026',
    time: '8:00 PM',
    description: 'An electrifying night of synth-wave anthems and pulsating visuals. Prepare to lose yourself in layers of synthesizers and driving rhythms as The Voltage take you on a journey through neon-lit soundscapes.',
    genre: 'Synth-Wave',
    posterSize: 'large',
    imageUrl: 'https://picsum.photos/seed/electric1/600/600',
    accentColor: '#7c3aed',
  },
  {
    id: 2,
    title: 'Comedy Gold',
    artist: 'Mike Harrington',
    venue: 'The Laughing Crow',
    date: 'March 20, 2026',
    time: '9:00 PM',
    description: 'Stand-up comedian Mike Harrington returns with all-new material after a sold-out world tour. A night of sharp wit and uncomfortably relatable humor.',
    genre: 'Comedy',
    posterSize: 'small',
    imageUrl: 'https://picsum.photos/seed/comedy22/300/300',
    accentColor: '#f59e0b',
  },
  {
    id: 3,
    title: 'Jazz at Midnight',
    artist: 'The Blue Notes',
    venue: 'Club 54',
    date: 'March 22, 2026',
    time: '11:00 PM',
    description: 'Late-night jazz with The Blue Notes. Smooth standards and adventurous improvisation in an intimate candlelit setting. Doors open at 10, show starts at 11.',
    genre: 'Jazz',
    posterSize: 'medium',
    imageUrl: 'https://picsum.photos/seed/jazz77/300/600',
    accentColor: '#0ea5e9',
  },
  {
    id: 4,
    title: 'Rock the City',
    artist: 'Iron Pulse',
    venue: 'Stadium Grounds',
    date: 'March 28, 2026',
    time: '7:30 PM',
    description: 'Hard-hitting rock from Iron Pulse. Massive riffs, thunderous drums, and a stage show you won\'t forget. Supporting acts TBA.',
    genre: 'Rock',
    posterSize: 'wide',
    imageUrl: 'https://picsum.photos/seed/rock44/600/300',
    accentColor: '#ef4444',
  },
  {
    id: 5,
    title: 'Silent Cinema',
    artist: 'Acoustic Ensemble',
    venue: 'The Garden Stage',
    date: 'April 2, 2026',
    time: '6:00 PM',
    description: 'An outdoor acoustic performance with cinematic storytelling. Bring a blanket and enjoy the evening under the stars. BYOB welcome.',
    genre: 'Acoustic',
    posterSize: 'small',
    imageUrl: 'https://picsum.photos/seed/acoustic55/300/300',
    accentColor: '#10b981',
  },
  {
    id: 6,
    title: 'Neon Dreams',
    artist: 'DJ Spectrum',
    venue: 'Club Neon',
    date: 'April 5, 2026',
    time: '10:00 PM',
    description: 'A night of deep house and techno from internationally acclaimed DJ Spectrum. Four hours of non-stop electronic energy beneath a stunning light rig.',
    genre: 'Electronic',
    posterSize: 'large',
    imageUrl: 'https://picsum.photos/seed/neon66/600/600',
    accentColor: '#ec4899',
  },
  {
    id: 7,
    title: 'Folk & Stories',
    artist: 'The Wanderers',
    venue: 'The Rustic Hall',
    date: 'April 10, 2026',
    time: '7:00 PM',
    description: 'Indie folk and original storytelling from The Wanderers. Songs about roads taken and those left behind, performed with warmth and raw honesty.',
    genre: 'Folk',
    posterSize: 'medium',
    imageUrl: 'https://picsum.photos/seed/folk88/300/600',
    accentColor: '#84cc16',
  },
  {
    id: 8,
    title: 'Hip-Hop Showcase',
    artist: 'Various Artists',
    venue: 'The Underground',
    date: 'April 12, 2026',
    time: '8:00 PM',
    description: 'Local and touring artists collide in a night celebrating hip-hop culture. Expect cyphers, live beats, and guest appearances all night long.',
    genre: 'Hip-Hop',
    posterSize: 'wide',
    imageUrl: 'https://picsum.photos/seed/hiphop99/600/300',
    accentColor: '#f97316',
  },
  {
    id: 9,
    title: 'Classical Evening',
    artist: 'City Orchestra',
    venue: 'Concert Hall',
    date: 'April 18, 2026',
    time: '7:00 PM',
    description: 'The City Orchestra performs Beethoven\'s 9th Symphony in its entirety. An evening of orchestral majesty and timeless emotion.',
    genre: 'Classical',
    posterSize: 'small',
    imageUrl: 'https://picsum.photos/seed/classical11/300/300',
    accentColor: '#6366f1',
  },
  {
    id: 10,
    title: 'Comedy Slam',
    artist: 'Stand-Up Collective',
    venue: 'The Brickhouse',
    date: 'April 24, 2026',
    time: '8:30 PM',
    description: 'Six comedians, one stage, zero filters. The Stand-Up Collective brings their best material for a full evening of boundary-pushing laughter.',
    genre: 'Comedy',
    posterSize: 'medium',
    imageUrl: 'https://picsum.photos/seed/comedy33/300/600',
    accentColor: '#fbbf24',
  },
  {
    id: 11,
    title: 'Punk Revival',
    artist: 'The Outcasts',
    venue: 'The Pit',
    date: 'May 1, 2026',
    time: '9:00 PM',
    description: 'Raw energy and three chords. The Outcasts bring punk back to its roots with furious sets, crowd surfing, and mosh pit mayhem.',
    genre: 'Punk',
    posterSize: 'small',
    imageUrl: 'https://picsum.photos/seed/punk22/300/300',
    accentColor: '#f43f5e',
  },
  {
    id: 12,
    title: 'Soul & R&B Night',
    artist: 'Maya Winters',
    venue: 'The Blue Room',
    date: 'May 8, 2026',
    time: '8:00 PM',
    description: 'Grammy-nominated singer Maya Winters delivers a soulful evening of R&B classics and stunning new originals. A voice like no other, in a setting like no other.',
    genre: 'Soul / R&B',
    posterSize: 'large',
    imageUrl: 'https://picsum.photos/seed/soul44/600/600',
    accentColor: '#a855f7',
  },
]);

export function addShow(show: Omit<Show, 'id'>): void {
  const id = shows.length > 0 ? Math.max(...shows.map((s) => s.id)) + 1 : 1;
  shows.push({ ...show, id });
}
