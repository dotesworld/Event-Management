import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SchedulePreview from '@/components/SchedulePreview';
import SpeakersPreview from '@/components/SpeakersPreview';
import SponsorsSection from '@/components/SponsorsSection';
import VenueSection from '@/components/VenueSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SchedulePreview />
      <SpeakersPreview />
      <SponsorsSection />
      <VenueSection />
    </div>
  );
}
