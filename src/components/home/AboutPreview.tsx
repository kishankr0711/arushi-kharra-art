import { artist } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutPreview() {
  return (
    <section className="bg-stone-100 py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          
          {/* Image Side */}
          <div className="relative mx-auto w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
            <div className="aspect-[4/5] max-h-[520px] overflow-hidden rounded-lg bg-stone-200 md:max-h-[560px]">
              {/* Artist Image Placeholder */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/artist-img.jpg"
                  alt="Hero Image"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full border-2 border-stone-300 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
          </div>

          {/* Content Side */}
          <div className="space-y-4 lg:space-y-6">
            <p className="text-sm font-medium uppercase tracking-widest text-stone-500">
              The Artist
            </p>
            <h2 className="text-2xl font-light text-stone-900 sm:text-3xl lg:text-4xl">
              {artist.name}
            </h2>
            <p className="text-base leading-relaxed text-stone-600 lg:text-lg">
              {artist.bio}
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-stone-300" />
              <span className="text-sm text-stone-500 uppercase tracking-wider">
                {artist.specialty}
              </span>
              <div className="h-px flex-1 bg-stone-300" />
            </div>

            <Link href="/about">
              <Button variant="art" size="lg" className="mt-4">
                Full Biography
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
