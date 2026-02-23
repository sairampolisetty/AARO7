"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
    {
        title: "Domain Mastery",
        desc: "We don't just know AI; we understand the rigorous compliance, security, and integration requirements of modern enterprise ecosystems.",
        icon: "🛡️",
    },
    {
        title: "Agnostic & Flexible",
        desc: "Not tied to a single provider. We leverage the best models from OpenAI, Anthropic, Google, and open-source to build the most efficient architecture.",
        icon: "🔗",
    },
    {
        title: "Proven Impact",
        desc: "Our solutions don't sit in sandboxes. They deploy globally, handling millions of requests with automated self-healing and zero downtime.",
        icon: "🌍",
    }
];

export default function WhyUs() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-background py-8 md:py-20 px-4 md:px-6 relative z-10 flex flex-col items-center overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-heading font-black text-center text-foreground mb-6 md:mb-16 tracking-tight">The AARO7 Difference</h2>

                <div className="w-full flex flex-col items-center relative">
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 place-items-center snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide w-full px-4 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {features.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative shrink-0 snap-center min-w-[85vw] md:min-w-0 w-full md:max-w-[380px] h-auto min-h-[250px] md:min-h-[300px] xl:min-h-[350px] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-foreground/5 bg-card-bg flex flex-col items-center justify-center p-6 md:p-10 text-center transition-all duration-700 hover:-translate-y-2 hover:border-primary shadow-[0_4px_20px_rgba(0,0,0,0.05)] mx-auto"
                            >
                                {/* Hover Background Accent */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                {/* Abstract 3D Icon Container */}
                                <div className="relative w-12 h-12 md:w-20 md:h-20 mb-4 md:mb-8 transform-gpu transition-all duration-700 group-hover:-translate-y-2">
                                    <div className="w-full h-full rounded-[0.75rem] md:rounded-[1rem] bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <span className="text-xl md:text-3xl filter drop-shadow-sm">{item.icon}</span>
                                    </div>
                                </div>

                                <h3 className="text-base md:text-xl lg:text-2xl font-heading font-bold text-foreground mb-2 md:mb-3 relative z-10">{item.title}</h3>
                                <p className="text-xs md:text-base text-text-secondary leading-relaxed relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Navigation Indicators */}
                    <div className="flex md:hidden items-center justify-center gap-4 mt-2 w-full px-4">
                        <button
                            onClick={scrollLeft}
                            className={`p-2 rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition-opacity duration-300 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className={`p-2 rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition-opacity duration-300 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
