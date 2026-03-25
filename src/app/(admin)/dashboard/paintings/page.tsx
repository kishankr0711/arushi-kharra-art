// import { prisma } from '@/prisma/client';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Plus, Pencil, Trash2, Star } from 'lucide-react';
// import { deletePainting, toggleFeatured } from '../actions';

// export default async function AdminPaintingsPage() {
//   const paintings = await prisma.painting.findMany({
//     orderBy: { createdAt: 'desc' },
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-light text-stone-900">Paintings</h1>
//           <p className="mt-1 text-stone-600">
//             Manage your gallery collection
//           </p>
//         </div>
//         <Link href="/dashboard/paintings/new">
//           <Button intent="art">
//             <Plus className="mr-2 h-4 w-4" />
//             Add Painting
//           </Button>
//         </Link>
//       </div>

//       <div className="rounded-lg bg-white shadow-sm border border-stone-200 overflow-hidden">
//         <table className="min-w-full divide-y divide-stone-200">
//           <thead className="bg-stone-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
//                 Painting
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-stone-200">
//             {paintings.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
//                   No paintings yet. Add your first painting!
//                 </td>
//               </tr>
//             ) : (
//               paintings.map((painting) => (
//                 <tr key={painting.id} className="hover:bg-stone-50">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 rounded-lg bg-stone-200 flex items-center justify-center text-xs text-stone-500">
//                         {painting.title.charAt(0)}
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm font-medium text-stone-900">
//                           {painting.title}
//                         </p>
//                         <p className="text-xs text-stone-500">
//                           {painting.artist}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
//                     {painting.category}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
//                     ${painting.price.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       {painting.isFeatured && (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
//                           <Star className="h-3 w-3 mr-1 fill-current" />
//                           Featured
//                         </span>
//                       )}
//                       {painting.inStock ? (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
//                           In Stock
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
//                           Out of Stock
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end gap-2">
//                       <form action={toggleFeatured.bind(null, painting.id, painting.isFeatured)}>
//                         <Button
//                           type="submit"
//                           variant="ghost"
//                           size="sm"
//                           title={painting.isFeatured ? "Unfeature" : "Feature"}
//                         >
//                           <Star className={`h-4 w-4 ${painting.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
//                         </Button>
//                       </form>
//                       <Link href={`/dashboard/paintings/${painting.id}/edit`}>
//                         <Button variant="ghost" size="sm">
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                       </Link>
//                       <form action={deletePainting.bind(null, painting.id)}>
//                         <Button
//                           type="submit"
//                           variant="ghost"
//                           size="sm"
//                           className="text-red-600 hover:text-red-700"
//                           onClick={(e) => {
//                             if (!confirm('Are you sure you want to delete this painting?')) {
//                               e.preventDefault();
//                             }
//                           }}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </form>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { prisma } from '@/prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Star } from 'lucide-react';
import { toggleFeatured } from '../actions';
import DeleteButton from '@/components/admin/DeleteButton';
import { getPrimaryPaintingImage } from '@/lib/painting-images';

export default async function AdminPaintingsPage() {
  const paintings = await prisma.painting.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Paintings</h1>
          <p className="mt-1 text-stone-600">
            Manage your gallery collection
          </p>
        </div>
        <Link href="/dashboard/paintings/new">
          <Button intent="art" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Painting
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
        <table className="min-w-[760px] divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Painting
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {paintings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                  No paintings yet. Add your first painting!
                </td>
              </tr>
            ) : (
              paintings.map((painting) => {
                const primaryImage = getPrimaryPaintingImage(painting.image);
                return (
                <tr key={painting.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-stone-200 flex items-center justify-center text-xs text-stone-500 overflow-hidden">
                        {primaryImage && primaryImage !== '/images/placeholder.jpg' ? (
                          <img src={primaryImage} alt="" className="h-full w-full object-cover" />
                        ) : (
                          painting.title.charAt(0)
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-stone-900">
                          {painting.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {painting.artist}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                    {painting.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                    ${painting.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {painting.isFeatured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Featured
                        </span>
                      )}
                      {painting.inStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <form action={toggleFeatured.bind(null, painting.id, painting.isFeatured)}>
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          title={painting.isFeatured ? "Unfeature" : "Feature"}
                        >
                          <Star className={`h-4 w-4 ${painting.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                      </form>
                      <Link href={`/dashboard/paintings/${painting.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteButton id={painting.id} />
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
