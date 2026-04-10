"use client";

import { motion } from "motion/react";
import type { PortfolioData } from "../lib/types";

interface Props {
  portfolio: PortfolioData[];
}

export default function SelectedWorks({ portfolio }: Props) {

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-surface-dim">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 text-white">Our Work</h2>
          <div className="w-16 md:w-20 h-1 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {portfolio.map((work, index) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`space-y-6 ${index % 2 !== 0 ? "md:mt-24" : ""}`}
            >
              <div className="aspect-video bg-surface-container-high rounded-xl overflow-hidden group cursor-pointer">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${work.image}')` }}
                ></div>
              </div>
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{work.client}</p>
                <h3 className="text-2xl font-bold mb-2 text-white">{work.title}</h3>
                <p className="text-on-surface-variant mb-4 text-sm md:text-base">{work.description}</p>
                <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-bold font-headline">
                  {work.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface-container-high rounded border border-outline-variant text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
