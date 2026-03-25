// import { prisma } from '@/prisma/client';
// import PaintingCard from '@/components/paintings/PaintingCard';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import EmptyState from '@/components/paintings/EmptyState';

// export default async function FeaturedPaintings() {
//   // Fetch featured paintings directly from DB
//   const featured = await prisma.painting.findMany({
//     where: { isFeatured: true },
//     take: 3,
//     orderBy: { createdAt: 'desc' },
//   });

//   // Don't show section if no featured paintings
//   if (featured.length === 0) {
//     return null; // Or return <EmptyState /> if you want to show message
//   }

//   return (
//     <section className="py-24 bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* Section Header */}
//         <div className="mb-16 text-center">
//           <p className="mb-2 text-sm font-medium uppercase tracking-widest text-stone-500">
//             Curated Selection
//           </p>
//           <h2 className="text-3xl font-light text-stone-900 sm:text-4xl">
//             Featured Works
//           </h2>
//           <p className="mx-auto mt-4 max-w-2xl text-stone-600">
//             Handpicked pieces that represent the finest in contemporary artistry
//           </p>
//         </div>

//         {/* Paintings Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {featured.map((painting) => (
//             <PaintingCard key={painting.id} painting={painting} />
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="mt-12 text-center">
//           <Link href="/paintings">
//             <Button intent="outline" size="lg">
//               View All Artworks
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import { prisma } from '@/prisma/client';
import PaintingCard from '@/components/paintings/PaintingCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { auth } from '@/auth';

export default async function FeaturedPaintings() {
  const session = await auth();

  const featured = await prisma.painting.findMany({
    where: { isFeatured: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-stone-500">
            Curated Selection
          </p>
          <h2 className="text-3xl font-light text-stone-900 sm:text-4xl">
            Featured Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            Handpicked pieces that represent the finest in contemporary artistry
          </p>
        </div>

        {/* Paintings Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featured.map((painting) => (
            <PaintingCard key={painting.id} painting={painting} userId={session?.user?.id ?? null} />
          ))}
        </div>

        {/* Visit Gallery Button - NEW */}
        <div className="mt-16 text-center">
          <Link href="/paintings">
            <Button intent="art" size="lg" className="px-8">
              Visit Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
