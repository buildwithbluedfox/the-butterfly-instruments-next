"use client";

import { motion } from "motion/react";
import type { PhilosophyData } from "../lib/types";

interface Props {
  philosophy: PhilosophyData;
}

export default function Philosophy({ philosophy }: Props) {

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-primary-container text-on-primary-fixed">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-7xl font-bold tracking-tighter mb-10 md:mb-12 leading-tight">
          {philosophy.headline} <span className="italic underline decoration-on-primary-fixed/30">{philosophy.highlightedText}</span>
        </h2>
        <p className="text-xl md:text-3xl font-light leading-relaxed mb-10 opacity-90 px-2">
          {philosophy.description}
        </p>
        <div className="flex justify-center">
          <div className="h-px w-20 md:w-24 bg-on-primary-fixed opacity-40"></div>
        </div>
      </motion.div>
    </section>
  );
}
