"use client";

import React, { useState, useEffect } from "react";
import { Linkedin, Twitter, ChevronLeft, ChevronRight } from "lucide-react";

// The data for the leadership carousel
const founders = [
    {
        name: "Kritarth Pattnaik",
        role: "Founder",
        quote: "The future belongs to those who don't just understand models, but who know how to architect ecosystems around them. We built AARO7 to bridge the critical gap between research and enterprise reality.",
        desc: "With over a decade of experience in deploying scalable intelligence platforms, our leadership is dedicated to pushing the boundaries of what's possible in the AI space.",
        image: "/kritharth_sir.png",
        linkedin: "https://www.linkedin.com/in/kritarth-pattnaik-a49aa485/"
    },
    {
        name: "Aravind Singh",
        role: "Co-Founder",
        quote: "True enterprise AI requires robust retrieval pipelines and deterministic security. We are focused on resolving technical debt and building the definitive intelligence layer.",
        desc: "Engineering the invisible layers that make frontier models reliable for Fortune 500s. We don't just adopt standards, we architect them.",
        image: "/aravind_sir.png",
        linkedin: "https://www.linkedin.com/in/aksjat/"
    }
];

export default function Founder() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % founders.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setActiveIndex((current) => (current + 1) % founders.length);
    const prevSlide = () => setActiveIndex((current) => (current - 1 + founders.length) % founders.length);

    return (
        <section id="leadership" className="w-full bg-background py-12 md:py-20 px-4 md:px-6 relative z-10 border-t border-foreground/5 flex items-center justify-center overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">

                    {/* Image Column - Crossfade */}
                    <div className="w-full md:w-1/2 flex justify-center md:items-center relative h-[250px] sm:h-[300px] md:h-[400px]">
                        {founders.map((founder, idx) => (
                            <div
                                key={idx}
                                className={`absolute top-0 right-auto md:right-4 lg:right-10 w-[220px] max-w-[250px] sm:w-[280px] sm:max-w-[300px] md:w-[320px] lg:w-[360px] md:max-w-none h-[250px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-foreground/10 shadow-2xl transition-opacity duration-1000 ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
                                    style={{
                                        backgroundImage: `url("${founder.image}")`,
                                        transform: activeIndex === idx ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                />
                                {/* Gradient Overlay for text readability if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                            </div>
                        ))}
                    </div>

                    {/* Text Column - Crossfade */}
                    <div className="w-full md:w-1/2 relative flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
                        <p className="text-xs md:text-sm text-primary tracking-widest font-sans font-medium uppercase mb-3 md:mb-6">Leadership</p>

                        <div className="relative w-full mb-6 md:mb-8">
                            {founders.map((founder, idx) => (
                                <div
                                    key={idx}
                                    className={`w-full flex flex-col items-center md:items-start transition-all duration-1000 ${activeIndex === idx ? 'relative opacity-100 translate-y-0 z-10 pointer-events-auto' : 'absolute top-0 left-0 opacity-0 translate-y-8 z-0 pointer-events-none'}`}
                                >
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black text-foreground tracking-tight mb-2 leading-[1.1]">{founder.name}</h2>
                                    <h3 className="text-lg md:text-2xl text-primary font-sans mb-4 md:mb-8">{founder.role}</h3>

                                    <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed mb-4 md:mb-6 font-sans">
                                        "{founder.quote}"
                                    </p>

                                    <p className="text-xs md:text-base text-text-secondary/80 leading-relaxed font-sans mb-6 md:mb-8 max-w-lg">
                                        {founder.desc}
                                    </p>

                                    <div className="flex gap-3 md:gap-4">
                                        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                            <Linkedin size={18} className="md:w-[20px] md:h-[20px]" />
                                        </a>
                                        <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                            <Twitter size={18} className="md:w-[20px] md:h-[20px]" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controls Container */}
                        <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-4">
                            <div className="flex gap-2 md:gap-3">
                                <button onClick={prevSlide} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors" aria-label="Previous leadership slide">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={nextSlide} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors" aria-label="Next leadership slide">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            {/* Dots */}
                            <div className="flex gap-2 md:gap-3">
                                {founders.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-6 md:w-8 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
