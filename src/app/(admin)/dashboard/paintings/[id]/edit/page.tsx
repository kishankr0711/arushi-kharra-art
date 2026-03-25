// import { getPainting, updatePainting } from '../../../actions';
// import PaintingForm from '@/components/admin/PaintingForm';
// import { notFound } from 'next/navigation';

// interface EditPaintingPageProps {
//   params: { id: string };
// }

// export default async function EditPaintingPage({ params }: EditPaintingPageProps) {
//   const { painting } = await getPainting(params.id);

//   if (!painting) {
//     notFound();
//   }

//   // Bind the ID to the update action
//   const updateAction = updatePainting.bind(null, params.id);

//   return (
//     <div className="max-w-4xl">
//       <h1 className="text-3xl font-light text-stone-900 mb-8">Edit Painting</h1>
//       <PaintingForm painting={painting} action={updateAction} />
//     </div>
//   );
// }

import { getPainting, updatePainting } from '../../../actions';
import PaintingForm from '@/components/admin/PaintingForm';
import { notFound } from 'next/navigation';

// In Next.js 15, params is a Promise
interface EditPaintingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPaintingPage({ params }: EditPaintingPageProps) {
  // Await params to get the id
  const { id } = await params;
  
  const { painting } = await getPainting(id);

  if (!painting) {
    notFound();
  }

  // Bind the ID to the update action
  const updateAction = updatePainting.bind(null, id);

  return (
    <div className="max-w-4xl space-y-2">
      <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Edit Painting</h1>
      <p className="text-stone-600 mb-8">Update artwork details</p>
      <PaintingForm painting={painting} action={updateAction} />
    </div>
  );
}
