"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
    {
        title: "Custom AI Models",
        description: "Targeted tools for 20-50% efficiency gains.",
        icon: "🧠",
    },
    {
        title: "Smart Retrieval",
        description: "Precise data insights with 40% fewer errors.",
        icon: "⚡",
    },
    {
        title: "Workflow Automation",
        description: "Orchestrating agents for 30-60% faster operations.",
        icon: "⚙️",
    }
];

export default function AIEngine() {
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
            const gap = 16; // gap-4 
            const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || window.innerWidth * 0.85;
            scrollContainerRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const gap = 16;
            const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || window.innerWidth * 0.85;
            scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
    };

    return (
        <section id="architecture" className="w-full bg-gradient-to-b from-background via-primary/5 to-background pt-2 md:pt-24 pb-12 md:pb-20 relative z-10 flex flex-col items-center">
            {/* 1. STICKY HEADER: Glassmorphism effect instead of flat white, reduced padding on mobile */}
            <div className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-4 md:py-10 text-center transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-foreground mb-2 md:mb-4 tracking-tight">The Engine Architecture</h2>
                    <p className="text-sm md:text-xl text-foreground/70 max-w-2xl mx-auto font-medium">Mastering every layer of the modern AI stack to turn frontier technology into industrial reality.</p>
                </div>
            </div>

            {/* 2. CARD CONTAINER: Consistent 'top' value ensures all cards move UP to the same point */}
            <div className="max-w-3xl mx-auto w-full mt-4 flex flex-col items-center relative">
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex md:flex-col overflow-x-auto md:overflow-visible gap-4 md:gap-10 w-full px-4 md:px-6 snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollSnapType: 'x mandatory' // Force strict snapping
                    }}
                >
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="relative md:sticky top-auto md:top-[14rem] min-w-[85vw] md:min-w-0 w-full snap-center bg-card-bg border border-primary/10 rounded-[1.25rem] md:rounded-[2rem] py-5 px-6 md:p-10 flex flex-col justify-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,87,51,0.1)] hover:border-primary/30 shrink-0"
                            style={{
                                zIndex: idx + 10,
                            }}
                        >
                            {/* Internal shield to ensure total opacity */}
                            <div className="absolute inset-0 bg-card-bg rounded-[1.25rem] md:rounded-[2rem] -z-10 shadow-sm"></div>

                            <div className="text-3xl md:text-5xl mb-2 md:mb-4">{card.icon}</div>
                            <h3 className="text-lg md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-1.5 md:mb-3">{card.title}</h3>
                            <p className="text-sm md:text-lg text-text-secondary md:mb-8 max-w-2xl font-sans leading-relaxed">{card.description}</p>
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation Indicators */}
                <div className="flex md:hidden items-center justify-center gap-4 mt-2 mb-4 w-full px-4">
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

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}