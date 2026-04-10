"use client";

import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

const NAV_ITEMS = ["About", "Services", "Portfolio", "Testimonials", "Team", "Contact"];

interface Props {
  siteName: string;
  currentPath: string;
}

export default function Navbar({ siteName, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isHome = currentPath === "/";
  const quoteHref = isHome ? "#contact" : "/#contact";

  const NavLink = ({ item, mobile = false }: { item: string; mobile?: boolean }) => {
    const href = isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`;
    const className = mobile
      ? "text-xl text-primary/60 hover:text-primary transition-colors"
      : "text-primary/60 hover:text-primary transition-colors";

    return (
      <a href={href} className={className} onClick={() => mobile && setIsOpen(false)}>
        {item}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-primary/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 w-full max-w-screen-2xl mx-auto">
        <a href="/" className="flex items-center gap-3">
          <Logo className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-primary font-headline hidden sm:block">
            {siteName}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href={quoteHref} className="bg-primary-container text-on-primary-fixed px-5 md:px-6 py-2 rounded-lg font-bold hover:scale-95 transition-all duration-300 text-sm md:text-base">
            Get a Quote
          </a>

          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-primary/10 px-6 py-8 flex flex-col gap-6 font-headline"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} item={item} mobile />
          ))}
        </motion.div>
      )}
    </nav>
  );
}
