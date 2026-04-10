"use client";

import { motion } from "motion/react";
import Logo from "./Logo";
import type { HeroData } from "../lib/types";

interface Props {
  hero: HeroData;
}

export default function Hero({ hero }: Props) {

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 md:w-200 h-75 md:h-200 bg-primary/30 blur-[80px] md:blur-[120px] rounded-full"
        ></motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >

        <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1]">
          {hero.headline} <span className="text-primary italic">{hero.highlightedText}</span>
        </h1>

        <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed px-4">
          {hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <a href="#contact" className="w-full sm:w-auto bg-primary-container text-on-primary-fixed px-10 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(255,187,0,0.4)] transition-all">
            {hero.ctaPrimary}
          </a>
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-lg border border-outline-variant text-primary hover:bg-surface-container-high transition-all">
            {hero.ctaSecondary}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
