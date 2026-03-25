// 'use client';

// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-stone-50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
//           {/* Text Content */}
//           <div className="space-y-8 text-center lg:text-left">
//             <div className="space-y-4">
//               <p className="text-sm font-medium uppercase tracking-widest text-stone-500">
//                 Contemporary Art Collection
//               </p>
//               <h1 className="text-4xl font-light leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
//                 Where Art Meets{' '}
//                 <span className="font-normal italic">Soul</span>
//               </h1>
//               <p className="mx-auto max-w-lg text-lg text-stone-600 lg:mx-0">
//                 Discover curated paintings that transform spaces and inspire emotions. 
//                 Each piece tells a unique story.
//               </p>
//             </div>
            
//             <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
//               <Link href="/paintings">
//                 <Button size="xl" variant="art">
//                   Explore Gallery
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//               <Link href="/about">
//                 <Button size="xxl" variant="outline">
//                   Meet the Artist
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Hero Image */}
//           <div className="relative hidden lg:block">
//             <div className="aspect-[4/5] overflow-hidden rounded-lg bg-stone-200 ">
//               {/* Replace with actual hero image */}
//               <div className="relative h-full w-full">
//                 <Image
//                   src="/images/herosection-img.jpg"
//                   alt="Hero Image"
//                   fill
//                   className="object-cover rounded-lg"
//                   priority
//                 />
//               </div>
//             </div>
//             {/* Decorative element */}
//             <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-stone-100" />
//           </div>
          
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-start gap-3 py-7 sm:items-center sm:gap-6 sm:py-10 lg:flex lg:items-center lg:gap-10 lg:py-16 lg:min-h-[620px]">
          
          {/* Text Content */}
          <div className="col-span-1 w-full space-y-3 text-left sm:space-y-4 lg:w-full lg:max-w-xl lg:flex-1 lg:space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500 sm:text-xs lg:text-sm">
              Contemporary Art Collection
            </p>
            <h1 className="text-[2rem] font-light leading-tight text-stone-900 sm:text-4xl lg:text-5xl xl:text-6xl">
              Where Art Meets{' '}
              <span className="font-normal italic">Soul</span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-stone-600 sm:text-sm lg:mx-0 lg:text-base xl:text-lg">
              Discover curated paintings that transform spaces and inspire emotions. 
              Each piece tells a unique story.
            </p>
            <div className="hidden w-full items-center gap-2 pt-3 lg:flex lg:justify-start">
              <Link href="/paintings">
                <Button intent="art" className="min-w-[220px] text-sm">
                  Explore Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="min-w-[220px] text-sm">
                  Meet the Artist
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="col-span-1 w-full lg:relative lg:w-full lg:max-w-md lg:flex-1 xl:max-w-lg">
            <div className="aspect-[3/4] max-h-[320px] overflow-hidden rounded-lg bg-stone-200 shadow-md sm:max-h-[380px] sm:aspect-[4/5] lg:max-h-[520px] lg:shadow-xl">
              <img
                src="/images/herosection-img.jpg"
                alt="Art Gallery"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Mobile / Tablet CTA Row */}
          <div className="col-span-2 flex flex-col items-center gap-2 pt-2 min-[520px]:flex-row min-[520px]:justify-center lg:hidden">
            <Link href="/paintings">
              <Button intent="art" className="min-w-[220px] text-sm">
                Explore Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="min-w-[220px] text-sm">
                Meet the Artist
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
