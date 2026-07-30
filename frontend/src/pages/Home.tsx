import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtmosphereBackground from '../components/common/AtmosphereBackground';
import WelcomeHero from '../components/common/WelcomeHero';
import AboutSection from '../components/common/AboutSection';
import ContactSection from '../components/common/ContactSection';
import PublicEventList from '../components/public/PublicEventList';
import LoadingScreen from '../components/common/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      ScrollTrigger.refresh();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="relative min-h-screen bg-[#0B0B0B]">
        <AtmosphereBackground />
        <div className="relative z-10 pt-16 md:pt-20">
          <WelcomeHero />
          <AboutSection />
          <section id="eventos" className="py-12 md:py-20 bg-black/40">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Nossa <span className="text-gray-400">Programação</span>
                </h2>
                <div className="w-16 h-px bg-white/20 mx-auto mt-3" />
                <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
                  Confira os espetáculos em cartaz e em breve no Teatro Municipal.
                </p>
              </div>
              <PublicEventList />
            </div>
          </section>
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Home;