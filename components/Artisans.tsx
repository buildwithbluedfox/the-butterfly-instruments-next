"use client";

import { motion } from "motion/react";
import type { TeamMemberData } from "../lib/types";

interface Props {
  team: TeamMemberData[];
}

export default function Artisans({ team }: Props) {

  return (
    <section id="team" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-16 md:mb-20 text-center text-white">The Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <a href={`/team/${member.slug}`} className="block">
                <div className="aspect-square w-32 md:w-full mx-auto bg-surface-container-high rounded-full mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src={member.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary font-headline text-xs md:text-sm mb-2 uppercase tracking-widest">{member.role}</p>
                <p className="text-on-surface-variant text-xs md:text-sm italic px-4">&quot;{member.quote}&quot;</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
