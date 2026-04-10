"use client";

import { motion } from "motion/react";
import type { AboutData } from "../lib/types";

interface Props {
  about: AboutData;
}

export default function OriginStory({ about }: Props) {

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary uppercase tracking-[0.3em] font-bold text-xs md:text-sm mb-4 md:mb-6 block">{about.label}</span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-6 md:mb-8 text-white">
            {about.title} <span className="text-secondary">{about.highlightedTitle}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-base md:text-lg text-on-surface-variant leading-relaxed"
        >
          <p>{about.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
