'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = ['All', 'Oil', 'Acrylic', 'Watercolor', 'Digital'];

export default function FilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category.toLowerCase());
    }
    router.push(`/paintings?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            currentCategory === category || 
            (category === 'All' && !searchParams.get('category'))
              ? 'bg-stone-800 text-white border-stone-800'
              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}