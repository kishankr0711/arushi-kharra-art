import { artist } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-stone-900">About</h1>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-stone-600">
            <p>{artist.bio}</p>
            <p>
              With a studio based in the heart of the city, the work draws inspiration from 
              urban landscapes and natural forms, creating a unique dialogue between 
              structure and fluidity.
            </p>
            <p>
              Each piece is crafted with meticulous attention to detail, using traditional 
              techniques combined with contemporary sensibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}