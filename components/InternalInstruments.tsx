"use client";

import { motion } from "motion/react";
import { Code2, Server, Database, Cloud } from "lucide-react";
import type { TechStackData } from "../lib/types";
import type { ComponentType, SVGProps } from "react";

const categoryIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Infrastructure: Cloud,
};

interface Props {
  techStack: TechStackData[];
}

export default function InternalInstruments({ techStack }: Props) {

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Our Tech Stack</h2>
          <p className="text-on-surface-variant mt-4 text-base md:text-lg">Technologies we use to build and ship.</p>
        </div>

        <div className="space-y-4">
          {techStack.map((item) => {
            const Icon = categoryIcons[item.category] || Code2;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 bg-surface-container-low rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-surface-container-high transition-all cursor-default group"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                    <Icon className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-on-surface-variant text-xs md:text-sm">{item.description}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                  {item.category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
