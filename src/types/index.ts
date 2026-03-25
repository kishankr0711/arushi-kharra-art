// Defines data structures used across the app
export interface Painting {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  category: 'oil' | 'watercolor' | 'acrylic' | 'digital';
  dimensions: string;
  year: number;
  isFeatured: boolean;
  inStock: boolean;
}

export interface Artist {
  name: string;
  bio: string;
  avatar: string;
  specialty: string;
}