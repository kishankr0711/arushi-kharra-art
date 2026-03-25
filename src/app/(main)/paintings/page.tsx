import PaintingGrid from '@/components/paintings/PaintingGrid';
import { Suspense } from 'react';
import SortDropdown from '@/components/paintings/SortDropdown';

const categories = ['All', 'Oil', 'Acrylic', 'Watercolor', 'Digital'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

interface GalleryPageProps {
  searchParams: Promise<{ 
    category?: string;
    sort?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const resolvedSearchParams = await searchParams;

  const currentCategory = resolvedSearchParams.category || 'All';
  const currentSort = resolvedSearchParams.sort || 'newest';

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light text-stone-900">Gallery</h1>
          <p className="mt-4 text-stone-600">
            Browse our complete collection of original artworks
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = currentCategory === category || 
              (category === 'All' && !resolvedSearchParams.category);
            
            const href = category === 'All' 
              ? `/paintings?sort=${currentSort}`
              : `/paintings?category=${category.toLowerCase()}&sort=${currentSort}`;
            
            return (
              <a
                key={category}
                href={href}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {category}
              </a>
            );
          })}
        </div>

        {/* Sort Links (No Dropdown - No onChange!) */}
        <div className="mb-8 flex justify-center">
          <SortDropdown />
        </div>  




        {/* Painting Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-stone-200" />
            ))}
          </div>
        }>
          <PaintingGrid 
            category={resolvedSearchParams.category} 
            sort={resolvedSearchParams.sort} 
          />
        </Suspense>
      </div>
    </div>
  );
}
