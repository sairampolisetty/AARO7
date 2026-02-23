"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
    {
        quote: "Working with AARO7 fundamentally changed our trajectory. Their approach to generative AI architecture isn't just theoretical; it delivers quantifiable business results from day one.",
        author: "Sarah Jenkins",
        role: "CTO, TechNova Enterprises"
    },
    {
        quote: "The seamless integration of their models into our existing infrastructure was mind-blowing. They understand enterprise scaling better than anyone else in the market.",
        author: "Michael Chen",
        role: "VP of Engineering, Global Auto"
    },
    {
        quote: "AARO7 doesn't just build models; they build comprehensive ecosystems. Their focus on reliability and uptime is unmatched.",
        author: "Elena Rodriguez",
        role: "Director of Innovation, FinEdge"
    },
    {
        quote: "The agentic capabilities provided by AARO7 transformed our customer service department. We resolved 60% more queries without adding headcount.",
        author: "David Kim",
        role: "COO, RetailTech Solutions"
    },
    {
        quote: "Their focus on zero-hallucination models gave our legal team the confidence to automate contract analysis. AARO7 is the real deal.",
        author: "Amanda Steele",
        role: "General Counsel, Apex Partners"
    }
];

export default function Testimonials() {
    // Duplicate testimonials to create a seamless infinite loop
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="w-full bg-background py-12 md:py-20 relative z-10 border-t border-foreground/5 overflow-hidden flex flex-col items-center">
            <style>{`
                @keyframes scroll_testimonials {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-testimonials {
                    animation: scroll_testimonials 40s linear infinite;
                }
                .animate-testimonials:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="text-center mb-10 md:mb-16 px-4">
                <p className="text-xs md:text-sm text-primary tracking-widest font-sans font-medium uppercase mb-3 md:mb-4">Client Impact</p>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black text-foreground tracking-tight">What Our Clients Say.</h2>
            </div>

            {/* Marquee Container */}
            <div className="w-full relative flex">
                {/* The Scrolling Track */}
                <div className="flex gap-4 md:gap-8 w-max animate-testimonials pl-4 md:pl-8">
                    {doubledTestimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative w-[280px] md:w-[450px] h-auto min-h-[180px] md:min-h-[220px] bg-card-bg rounded-[1.5rem] md:rounded-[2rem] border border-foreground/5 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0 hover:border-primary transition-colors duration-300 group"
                        >
                            <div className="text-primary/20 text-5xl md:text-6xl font-serif leading-none absolute top-4 left-4 md:top-6 md:left-6 transition-opacity duration-300">
                                "
                            </div>
                            <p className="text-sm md:text-lg text-foreground/80 leading-relaxed font-sans relative z-10 pt-4 md:pt-4">
                                "{item.quote}"
                            </p>

                            <div className="mt-6 md:mt-8 relative z-10">
                                <p className="text-foreground font-bold font-heading text-base md:text-lg">{item.author}</p>
                                <p className="text-primary text-[10px] md:text-sm uppercase tracking-wider mt-1">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient Mask to fade edges (Optional but looks premium) */}
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-20"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-20"></div>

        </section>
    );
}
