import { createPainting } from '../../actions';
import PaintingForm from '@/components/admin/PaintingForm';

export default function NewPaintingPage() {
  return (
    <div className="max-w-4xl space-y-2">
      <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Add New Painting</h1>
      <p className="text-stone-600 mb-8">Add a new artwork to your gallery</p>
      <PaintingForm action={createPainting} />
    </div>
  );
}
