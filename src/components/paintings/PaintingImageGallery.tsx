'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaintingImageGalleryProps {
  images: string[];
  title: string;
}

export default function PaintingImageGallery({ images, title }: PaintingImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX;

    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeIndex]}
          alt={`${title} image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <>
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-stone-800' : 'w-2.5 bg-stone-300'
                }`}
              />
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="mx-auto flex w-max gap-3 pb-1">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`aspect-square w-20 overflow-hidden rounded-md border transition-all sm:w-24 ${
                    index === activeIndex ? 'border-stone-800 ring-2 ring-stone-800/20' : 'border-stone-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
