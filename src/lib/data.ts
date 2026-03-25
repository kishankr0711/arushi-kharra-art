import { Painting, Artist } from '@/types';

// Temporary data until backend is ready
export const paintings: Painting[] = [
  {
    id: '1',
    title: 'Sunset Harmony',
    artist: 'Elena Vance',
    price: 1200,
    image: '/images/painting1.jpg',
    description: 'A warm sunset over rolling hills with vibrant oranges and purples.',
    category: 'oil',
    dimensions: '24x36 inches',
    year: 2024,
    isFeatured: true,
    inStock: true,
  },
  {
    id: '2',
    title: 'Ocean Whispers',
    artist: 'Marcus Chen',
    price: 950,
    image: '/images/painting2.jpg',
    description: 'Abstract waves capturing the motion of the sea.',
    category: 'acrylic',
    dimensions: '30x40 inches',
    year: 2024,
    isFeatured: true,
    inStock: true,
  },
  {
    id: '3',
    title: 'Urban Solitude',
    artist: 'Sarah Kim',
    price: 1500,
    image: '/images/painting3.jpg',
    description: 'Minimalist cityscape in monochromatic tones.',
    category: 'watercolor',
    dimensions: '20x28 inches',
    year: 2023,
    isFeatured: false,
    inStock: true,
  },
  {
    id: '4',
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    price: 800,
    image: '/images/painting4.jpg',
    description: 'Futuristic digital art exploring consciousness.',
    category: 'digital',
    dimensions: 'Print on demand',
    year: 2024,
    isFeatured: true,
    inStock: true,
  },
];

export const artist: Artist = {
  name: 'Arushi Kharra',
  bio: 'An Indian artist who is passionate about paintings.',
  avatar: '/images/artist.jpg',
  specialty: 'Oil & Acrylic',
};
