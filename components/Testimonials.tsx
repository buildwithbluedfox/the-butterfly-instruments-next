"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Link2, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { TestimonialsData } from "../lib/types";

interface Props {
	testimonials: TestimonialsData;
}

function TestimonialStars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1 text-primary-container">
			{Array.from({ length: 5 }, (_, index) => (
				<Star
					key={index}
					className={`h-4 w-4 ${index < rating ? "fill-current" : "text-outline-variant"}`}
				/>
			))}
		</div>
	);
}

export default function Testimonials({ testimonials }: Props) {
	const [activeIndex, setActiveIndex] = useState(0);
	const items = testimonials.items;

	useEffect(() => {
		if (items.length <= 1) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
		}, 7000);

		return () => window.clearInterval(intervalId);
	}, [items.length]);

	useEffect(() => {
		if (activeIndex >= items.length) {
			setActiveIndex(0);
		}
	}, [activeIndex, items.length]);

	if (items.length === 0) {
		return null;
	}

	const activeTestimonial = items[activeIndex];

	const goToPrevious = () => {
		setActiveIndex((currentIndex) =>
			currentIndex === 0 ? items.length - 1 : currentIndex - 1
		);
	};

	const goToNext = () => {
		setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
	};

	return (
		<section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-surface-container-low">
			<div className="max-w-7xl mx-auto space-y-12">
				<div className="max-w-3xl space-y-4">
					<h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
						{testimonials.headline}{" "}
						<span className="text-primary italic">{testimonials.highlightedText}</span>
					</h2>
					<p className="text-on-surface-variant text-lg md:text-xl">
						{testimonials.description}
					</p>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] gap-6">
					<div className="rounded-3xl border border-outline-variant/30 bg-surface-container-high p-8 md:p-10 space-y-8">
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
									<Quote className="w-6 h-6" />
								</div>
								<div>
									<p className="text-sm uppercase tracking-[0.24em] text-primary font-bold">
										Client testimonial
									</p>
									<p className="text-xs text-on-surface-variant mt-1">
										{activeIndex + 1} of {items.length}
									</p>
								</div>
							</div>
							<TestimonialStars rating={activeTestimonial.rating} />
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={`${activeTestimonial.name}-${activeTestimonial.projectName}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.35 }}
								className="space-y-8"
							>
								<p className="text-2xl md:text-4xl leading-tight text-white font-headline">
									&ldquo;{activeTestimonial.testimonial}&rdquo;
								</p>

								<div className="flex flex-wrap gap-2">
									{activeTestimonial.standoutStrengths.map((strength) => (
										<span
											key={strength}
											className="px-3 py-1 rounded-full bg-background text-primary text-xs uppercase tracking-widest font-bold"
										>
											{strength}
										</span>
									))}
								</div>

								<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
									<div>
										<h3 className="text-xl md:text-2xl font-bold text-white">
											{activeTestimonial.name}
										</h3>
										<p className="text-primary font-headline uppercase tracking-widest text-xs mt-2">
											{activeTestimonial.jobTitle}
										</p>
										<p className="text-on-surface-variant mt-3 text-sm md:text-base">
											{activeTestimonial.projectName}
										</p>
										<p className="text-on-surface-variant/80 mt-1 text-sm">
											Overall satisfaction: {activeTestimonial.overallSatisfaction}
										</p>
									</div>

									{activeTestimonial.linkedinUrl && (
										<a
											href={activeTestimonial.linkedinUrl}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
										>
											<Link2 className="w-5 h-5" />
											<span className="text-sm font-bold uppercase tracking-widest">LinkedIn</span>
										</a>
									)}
								</div>
							</motion.div>
						</AnimatePresence>

						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={goToPrevious}
									className="w-11 h-11 rounded-full border border-outline-variant/40 text-primary flex items-center justify-center hover:bg-background transition-colors"
									aria-label="Show previous testimonial"
								>
									<ChevronLeft className="w-5 h-5" />
								</button>
								<button
									type="button"
									onClick={goToNext}
									className="w-11 h-11 rounded-full border border-outline-variant/40 text-primary flex items-center justify-center hover:bg-background transition-colors"
									aria-label="Show next testimonial"
								>
									<ChevronRight className="w-5 h-5" />
								</button>
							</div>

							<div className="flex items-center gap-2">
								{items.map((item, index) => (
									<button
										key={`${item.name}-${index}`}
										type="button"
										onClick={() => setActiveIndex(index)}
										className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-10 bg-primary-container" : "w-2.5 bg-outline-variant"
											}`}
										aria-label={`Go to testimonial ${index + 1}`}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-3">
						{items.map((item, index) => (
							<button
								key={`${item.projectName}-${index}`}
								type="button"
								onClick={() => setActiveIndex(index)}
								className={`w-full text-left rounded-2xl border p-4 transition-all ${index === activeIndex
										? "border-primary-container bg-primary-container/10"
										: "border-outline-variant/30 bg-surface-container-high hover:bg-surface-container-lowest"
									}`}
							>
								<p className="text-sm uppercase tracking-widest text-primary font-bold">
									{item.projectName}
								</p>
								<h3 className="text-lg font-bold text-white mt-2">{item.name}</h3>
								<p className="text-sm text-on-surface-variant mt-1">{item.jobTitle}</p>
								<p className="text-sm text-on-surface-variant mt-3 line-clamp-3">
									{item.testimonial}
								</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
