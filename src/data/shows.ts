import { reactive, ref } from 'vue';
import { supabase } from '../lib/supabase';

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

// Row shape coming back from Supabase (snake_case columns)
interface ShowRow {
  id: number;
  title: string;
  artist: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  genre: string;
  poster_size: PosterSize;
  image_url: string;
  accent_color: string;
}

function fromRow(row: ShowRow): Show {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    venue: row.venue,
    date: row.date,
    time: row.time,
    description: row.description,
    genre: row.genre,
    posterSize: row.poster_size,
    imageUrl: row.image_url,
    accentColor: row.accent_color,
  };
}

function toRow(show: Omit<Show, 'id'>): Omit<ShowRow, 'id'> {
  return {
    title: show.title,
    artist: show.artist,
    venue: show.venue,
    date: show.date,
    time: show.time,
    description: show.description,
    genre: show.genre,
    poster_size: show.posterSize,
    image_url: show.imageUrl,
    accent_color: show.accentColor,
  };
}

export const shows = reactive<Show[]>([]);
export const showsLoading = ref(true);
export const showsError = ref<string | null>(null);

export async function fetchShows(): Promise<void> {
  showsLoading.value = true;
  showsError.value = null;

  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    showsError.value = error.message;
  } else {
    shows.splice(0, shows.length, ...data.map(fromRow));
  }

  showsLoading.value = false;
}

export async function addShow(show: Omit<Show, 'id'>): Promise<void> {
  const { data, error } = await supabase
    .from('shows')
    .insert(toRow(show))
    .select()
    .single();

  if (error) throw error;
  shows.push(fromRow(data));
}
