"use client";

import { motion } from "motion/react";
import { ArrowLeft, Link2, Mail, Phone } from "lucide-react";
import type { TeamMemberData } from "../lib/types";
import { useEffect } from "react";

interface Props {
  member: TeamMemberData;
}

export default function Profile({ member }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactItems: Array<{
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    icon: typeof Mail;
  }> = [];

  if (member.contact?.email) {
    contactItems.push({
      label: "Email",
      value: member.contact.email,
      href: `mailto:${member.contact.email}`,
      icon: Mail,
    });
  }

  if (member.contact?.phone) {
    contactItems.push({
      label: "Phone",
      value: member.contact.phone,
      href: `tel:${member.contact.phone.replace(/[^+\d]/g, "")}`,
      icon: Phone,
    });
  }

  if (member.contact?.linkedinLabel) {
    contactItems.push({
      label: "LinkedIn",
      value: member.contact.linkedinLabel,
      href: member.contact.linkedinUrl,
      icon: Link2,
      external: Boolean(member.contact.linkedinUrl),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <a
          href="/#team"
          className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-headline tracking-tight">Back to Team</span>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-high relative"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </motion.div>

            {contactItems.length > 0 && (
              <div className="mt-8 grid gap-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return item.href ? (
                    <a
                      key={`${item.label}-${item.value}`}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-on-surface-variant transition-colors hover:border-primary/40 hover:text-white"
                    >
                      <Icon size={20} className="text-primary" />
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                        <p className="font-headline text-sm md:text-base">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div
                      key={`${item.label}-${item.value}`}
                      className="flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-on-surface-variant"
                    >
                      <Icon size={20} className="text-primary" />
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                        <p className="font-headline text-sm md:text-base">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {member.skillGroups && member.skillGroups.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">Skills</h2>
                <div className="grid gap-4">
                  {member.skillGroups.map((group) => (
                    <article
                      key={group.label}
                      className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-5"
                    >
                      <h3 className="text-sm uppercase tracking-[0.2em] text-primary">{group.label}</h3>
                      <p className="mt-3 text-on-surface-variant leading-relaxed">{group.items.join(", ")}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-primary font-headline tracking-[0.2em] uppercase text-sm mb-4">{member.role}</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">{member.name}</h1>

              <div className="space-y-8">
                <section>
                  <h2 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">Philosophy</h2>
                  <p className="text-2xl md:text-3xl font-headline italic text-on-surface-variant leading-tight">
                    &quot;{member.quote}&quot;
                  </p>
                </section>

                <section>
                  <h2 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">About</h2>
                  <p className="text-lg text-on-surface-variant leading-relaxed">
                    {member.bio}
                  </p>
                </section>

                {member.experience && member.experience.length > 0 && (
                  <section>
                    <h2 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-4">Professional Experience</h2>
                    <div className="space-y-4">
                      {member.experience.map((item) => (
                        <article
                          key={`${item.organization}-${item.period}`}
                          className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-5"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{item.title}</p>
                              <h3 className="mt-1 text-xl font-bold text-white">{item.organization}</h3>
                            </div>
                            <div className="text-sm text-on-surface-variant md:text-right">
                              <p>{item.period}</p>
                              {item.duration && <p>{item.duration}</p>}
                            </div>
                          </div>

                          <ul className="mt-4 list-disc space-y-2 pl-5 text-on-surface-variant">
                            {item.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
