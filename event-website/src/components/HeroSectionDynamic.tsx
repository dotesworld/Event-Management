"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHeroData, useEventData } from "../hooks/useContent";

export default function HeroSectionDynamic() {
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const heroData = useHeroData();
  const eventData = useEventData();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate consistent positions for server and client
  const generateConsistentPositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Use a simple hash function to generate consistent positions
      const hash = (i * 9301 + 49297) % 233280;
      const left = (hash / 233280) * 100;
      const top = (((hash * 9301) % 233280) / 233280) * 100;
      positions.push({ left, top });
    }
    return positions;
  };

  const positions = generateConsistentPositions(heroData.background.animatedElements.count);

  return (
    <section className="relative h-screen pt-10 flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Hero Video Background */}
        {heroData.background.type === 'video' && heroData.background.video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={heroData.background.video.poster}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.log(
                "Video failed to load, falling back to gradient background"
              );
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log("Video loaded successfully");
            }}
          >
            <source src={heroData.background.video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback gradient background - show if video fails */}
        {videoError && <div className="absolute inset-0 bg-neutral-dark"></div>}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          {positions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={
                isClient
                  ? {
                      scale: heroData.background.animatedElements.animation.scale,
                      opacity: heroData.background.animatedElements.animation.opacity,
                    }
                  : {}
              }
              transition={
                isClient
                  ? {
                      duration: heroData.background.animatedElements.animation.duration + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: (i % 5) * 0.4,
                    }
                  : {}
              }
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: heroData.headline.animation.duration, 
            delay: heroData.headline.animation.delay 
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6"
          style={{
            fontFamily: heroData.typography.fontFamily,
            fontWeight: heroData.typography.fontWeight,
            letterSpacing: heroData.typography.letterSpacing,
          }}
        >
          {heroData.headline.main}
          <br />
          {heroData.headline.subtitle.split(' ').map((word, index) => (
            <span key={index}>
              {word}
              {index < heroData.headline.subtitle.split(' ').length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 mb-12 font-light"
        >
          {eventData.dates.display} • {eventData.location.display}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {heroData.cta.buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 min-w-48 text-center ${button.style}`}
            >
              {button.text}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}