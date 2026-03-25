import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { auth } from '@/auth';
import { getPaintingImagesWithFallback, getPrimaryPaintingImage } from '@/lib/painting-images';
import PaintingImageGallery from '@/components/paintings/PaintingImageGallery';
import DynamicPaintingPrice from '@/components/paintings/DynamicPaintingPrice';

interface PaintingPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaintingPage({ params }: PaintingPageProps) {
  const { id } = await params;
  const session = await auth();
  
  const painting = await prisma.painting.findUnique({
    where: { id },
  });

  if (!painting) {
    notFound();
  }

  const paintingImages = getPaintingImagesWithFallback(painting.image);
  const primaryImage = getPrimaryPaintingImage(painting.image);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/paintings">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          
          {/* Image */}
          <div className="w-full">
            <PaintingImageGallery images={paintingImages} title={painting.title} />
          </div>

          {/* Details */}
          <div className="mx-auto flex w-full max-w-xl flex-col justify-center">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-stone-500">
                  {painting.category}
                </p>
                <h1 className="mt-2 text-4xl font-light text-stone-900">
                  {painting.title}
                </h1>
                <p className="mt-2 text-lg text-stone-600">
                  by {painting.artist}
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <DynamicPaintingPrice amount={painting.price} className="text-3xl font-light text-stone-900" />
                {painting.inStock ? (
                  <span className="text-green-600 text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>

              <div className="border-t border-b border-stone-200 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Dimensions</span>
                  <span className="text-stone-900">{painting.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Year</span>
                  <span className="text-stone-900">{painting.year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Medium</span>
                  <span className="text-stone-900 capitalize">{painting.category}</span>
                </div>
              </div>

              <p className="text-stone-600 leading-relaxed">
                {painting.description}
              </p>

              {/* Add to Cart Button */}
              <AddToCartButton
                painting={{ ...painting, image: primaryImage }}
                userId={session?.user?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
