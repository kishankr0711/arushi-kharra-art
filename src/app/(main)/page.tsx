import HeroSection from '@/components/home/HeroSection';
import FeaturedPaintings from '@/components/home/FeaturedPaintings';
import AboutPreview from '@/components/home/AboutPreview';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPaintings />
      <AboutPreview />
    </>
  );
}