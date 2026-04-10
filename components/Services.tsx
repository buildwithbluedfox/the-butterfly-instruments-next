"use client";

import { motion } from "motion/react";
import { Monitor, Smartphone, Server, Cloud, Paintbrush, MessageSquare, Code, Database, Globe, Shield, Zap, Terminal, Cpu, Rocket, Network, Settings2 } from "lucide-react";
import type { ServiceData } from "../lib/types";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Monitor, Smartphone, Server, Cloud, Paintbrush, MessageSquare, Code, Database, Globe, Shield, Zap, Terminal, Cpu, Rocket, Network, Settings2,
};

const colSpans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-3"];
const bgs: [string, string][] = [
  ["bg-surface-container-high", "hover:bg-surface-container-highest"],
  ["bg-surface-container-low", "hover:bg-surface-container-high"],
  ["bg-surface-container-low", "hover:bg-surface-container-high"],
  ["bg-surface-container-high", "hover:bg-surface-container-highest"],
  ["bg-surface-container-low", "hover:bg-surface-container-high"],
  ["bg-surface-container-low", "hover:bg-surface-container-high"],
];

interface Props {
  services: ServiceData[];
}

export default function Services({ services }: Props) {

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 text-white">What We Do</h2>
            <p className="text-on-surface-variant text-lg md:text-xl">End-to-end software development services.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            const colSpan = colSpans[index % colSpans.length];
            const [bg, hoverBg] = bgs[index % bgs.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${colSpan} ${bg} ${hoverBg} p-8 md:p-10 rounded-xl transition-colors group cursor-default`}
              >
                <div className="flex justify-between items-start mb-10 md:mb-12">
                  <Icon className="text-primary w-10 h-10 md:w-12 md:h-12" />
                  <span className="text-outline-variant font-headline font-bold">{service.id}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors text-white">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-base md:text-lg">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
