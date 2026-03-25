// 'use client';

// import { Painting } from '@prisma/client';
// import { Button } from '@/components/ui/button';
// import { ShoppingCart, Eye, Pencil, Star } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { toggleFeatured } from '@/app/(admin)/dashboard/actions';
// import { useTransition } from 'react';

// interface PaintingCardProps {
//   painting: Painting;
//   isAdmin?: boolean;
// }

// export default function PaintingCard({ painting, isAdmin = false }: PaintingCardProps) {
//   const [isPending, startTransition] = useTransition();

//   const handleToggleFeatured = () => {
//     startTransition(() => {
//       toggleFeatured(painting.id, painting.isFeatured);
//     });
//   };

//   return (
//     <div className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg">
      
//       {/* Image Container */}
//       <div className="aspect-[4/5] relative overflow-hidden bg-stone-100">
//         {painting.image ? (
//           <Image
//             src={painting.image}
//             alt={painting.title}
//             fill
//             className="object-cover transition-transform group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
//             <span className="text-stone-400">{painting.title}</span>
//           </div>
//         )}
        
//         {/* Hover Overlay */}
//         <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
//           {isAdmin ? (
//             <>
//               <Link href={`/dashboard/paintings/${painting.id}/edit`}>
//                 <Button size="sm" intent="secondary">
//                   <Pencil className="mr-2 h-4 w-4" />
//                   Edit
//                 </Button>
//               </Link>
//               <Button 
//                 size="sm" 
//                 intent={painting.isFeatured ? "art" : "outline"}
//                 onClick={handleToggleFeatured}
//                 disabled={isPending}
//               >
//                 <Star className={`mr-2 h-4 w-4 ${painting.isFeatured ? 'fill-current' : ''}`} />
//                 {painting.isFeatured ? 'Featured' : 'Feature'}
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link href={`/paintings/${painting.id}`}>
//                 <Button size="sm" intent="secondary">
//                   <Eye className="mr-2 h-4 w-4" />
//                   View
//                 </Button>
//               </Link>
//               <Button size="sm" intent="art">
//                 <ShoppingCart className="mr-2 h-4 w-4" />
//                 Add
//               </Button>
//             </>
//           )}
//         </div>

//         {/* Category Badge */}
//         <div className="absolute left-4 top-4">
//           <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-stone-700 backdrop-blur-sm">
//             {painting.category}
//           </span>
//         </div>

//         {/* Featured Badge */}
//         {painting.isFeatured && (
//           <div className="absolute right-4 top-4">
//             <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="flex flex-1 flex-col p-6">
//         <div className="flex-1">
//           <h3 className="text-lg font-medium text-stone-900">
//             {painting.title}
//           </h3>
//           <p className="mt-1 text-sm text-stone-500">{painting.artist}</p>
//           <p className="mt-2 text-sm text-stone-600 line-clamp-2">
//             {painting.description}
//           </p>
//         </div>
        
//         <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
//           <span className="text-lg font-light text-stone-900">
//             ${painting.price.toLocaleString()}
//           </span>
//           <span className="text-xs text-stone-500">
//             {painting.dimensions}
//           </span>
//         </div>

//         {!painting.inStock && (
//           <div className="mt-2 text-center text-xs font-medium text-red-600">
//             Out of Stock
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { Painting } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useState } from 'react';
import { getPrimaryPaintingImage } from '@/lib/painting-images';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrency } from '@/lib/use-currency';

interface PaintingCardProps {
  painting: Painting;
  isAdmin?: boolean;
  userId?: string | null;
}

export default function PaintingCard({ painting, isAdmin = false, userId = null }: PaintingCardProps) {
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const addItem = useCart((state) => state.addItem);
  const primaryImage = getPrimaryPaintingImage(painting.image);
  const { convertFromUSD, formatCurrency } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!painting.inStock) return;

    if (!userId) {
      const callbackUrl = encodeURIComponent(pathname || '/paintings');
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    
    addItem({
      id: painting.id,
      title: painting.title,
      artist: painting.artist,
      price: painting.price,
      image: primaryImage,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg ${!isAdmin ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (!isAdmin) router.push(`/paintings/${painting.id}`);
      }}
    >
      
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden bg-stone-100">
        {primaryImage && primaryImage !== '/images/placeholder.jpg' ? (
          <img
            src={primaryImage}
            alt={painting.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
            <span className="text-stone-400">{painting.title}</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-20">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-stone-700 backdrop-blur-sm">
            {painting.category}
          </span>
        </div>

        {/* Featured Badge */}
        {painting.isFeatured && (
          <div className="absolute right-4 top-4 z-20">
            <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex-1">
          <h3 className="text-base font-medium text-stone-900 transition-colors group-hover:text-stone-600 sm:text-lg">
            {painting.title}
          </h3>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">{painting.artist}</p>
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 sm:text-sm">
            {painting.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
          <span className="text-base font-light text-stone-900 sm:text-lg">
            {formatCurrency(convertFromUSD(painting.price))}
          </span>
          <span className="text-[11px] text-stone-500 sm:text-xs">
            {painting.dimensions}
          </span>
        </div>

        {!painting.inStock && (
          <div className="mt-2 text-center text-xs font-medium text-red-600">
            Out of Stock
          </div>
        )}

        {!isAdmin && (
          <Button
            intent="art"
            className="mt-4 w-full px-2 text-xs sm:px-4 sm:text-sm"
            onClick={handleAddToCart}
            disabled={added || !painting.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {!painting.inStock ? 'Out of Stock' : added ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        )}
      </div>
    </div>
  );
}
