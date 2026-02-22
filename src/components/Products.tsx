"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
    {
        name: "Arayana AI",
        description: "Next-generation generative intelligence platform designed to seamlessly integrate with your enterprise architecture.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
        link: "#"
    },
    {
        name: "CarArth",
        description: "An AI-driven automotive ecosystem bringing predictive capabilities and smart diagnostics to modern mobility.",
        image: "https://images.unsplash.com/photo-1620912189868-307eb82e584f?q=80&w=2874&auto=format&fit=crop",
        link: "#"
    }
];

export default function Products() {
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
        <section className="w-full bg-[#020308] py-8 md:py-20 px-4 md:px-6 relative z-10 flex flex-col items-center border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-6 md:mb-20">
                    <p className="text-[10px] md:text-sm text-primary tracking-widest font-sans font-medium uppercase mb-2 md:mb-4">Innovation Lab</p>
                    <h2 className="text-2xl md:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">Our Recent Products.</h2>
                </div>

                <div className="w-full flex flex-col items-center relative gap-4">
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto md:flex-row md:justify-center gap-3 md:gap-10 place-items-center snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide w-full px-4 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, idx) => (
                            <div
                                key={idx}
                                className="group relative shrink-0 snap-center min-w-[85vw] md:min-w-0 w-full md:w-[400px] lg:w-[450px] h-[320px] md:h-[380px] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#0a0f25] flex flex-col justify-end p-5 md:p-8 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:z-50 z-10 cursor-pointer border border-white/5 hover:border-primary/50"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-50 transition-opacity duration-700 md:group-hover:scale-105"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020308] via-[#020308]/70 to-transparent" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 md:mb-6 font-sans max-w-sm">
                                        {product.description}
                                    </p>

                                    <a
                                        href={product.link}
                                        className="inline-flex items-center gap-2 text-white font-medium uppercase tracking-wider text-[10px] md:text-xs border-b border-primary/50 pb-1 hover:border-primary hover:text-primary transition-colors duration-300 pointer-events-none md:pointer-events-auto"
                                    >
                                        Explore Product <ArrowRight size={14} className="md:w-[16px] md:h-[16px]" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Navigation Indicators */}
                    <div className="flex md:hidden items-center justify-center gap-4 mt-2 w-full px-4">
                        <button
                            onClick={scrollLeft}
                            className={`p-2 rounded-full border border-white/20 bg-white/5 text-white transition-opacity duration-300 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className={`p-2 rounded-full border border-white/20 bg-white/5 text-white transition-opacity duration-300 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* More Coming Soon */}
                <div className="w-full flex justify-end mt-8 md:mt-12 pr-4 md:pr-0">
                    <div className="group flex items-center gap-2 cursor-default">
                        <span className="text-sm font-medium font-sans uppercase tracking-widest text-[#00F2FF]/70 group-hover:text-[#00F2FF] transition-colors duration-300">
                            More coming soon
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#00F2FF]/70 group-hover:text-[#00F2FF] group-hover:translate-x-1 transition-all duration-300" />
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
