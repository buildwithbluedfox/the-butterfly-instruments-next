"use client";

interface Props {
  siteName: string;
  copyright: string;
  links: string[];
}

export default function Footer({ siteName, copyright, links }: Props) {
  const FooterLink = ({ item }: { item: string }) => {
    const href = item === "Contact" ? "#contact" : "#";
    const className = "hover:text-primary transition-colors uppercase tracking-widest";

    return (
      <a href={href} className={className}>
        {item}
      </a>
    );
  };

  return (
    <footer className="bg-background w-full py-16 md:py-20 px-6 md:px-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
        <div className="text-center md:text-left">
          <a href="/" className="font-headline font-bold text-primary text-lg md:text-xl mb-2 block">
            {siteName}
          </a>
          <p className="text-primary/40 text-xs md:text-sm font-body tracking-wide">
            {copyright}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-primary/40 text-xs md:text-sm font-body tracking-wide">
          {links.map((link) => (
            <FooterLink key={link} item={link} />
          ))}
          <a href="/admin" className="hover:text-primary transition-colors uppercase tracking-widest">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
