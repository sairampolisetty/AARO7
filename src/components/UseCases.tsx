"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
    { value: 50, prefix: "Up to", suffix: "%", title: "Efficiency", desc: "Targeted tools delivering unprecedented operational gains.", delay: 0 },
    { value: 40, prefix: "", suffix: "%", title: "Errors", desc: "Precise data insights resulting in fewer hallucinations.", delay: 0.1 },
    { value: 60, prefix: "Up to", suffix: "%", title: "Speed", desc: "Faster operations orchestrating AI agents across your workflows.", delay: 0.2 },
    { value: 99, prefix: "Over", suffix: "%", title: "Uptime", desc: "Enterprise-grade reliability for continuous AI availability.", delay: 0.3 }
];

export default function UseCases() {
    const sectionRef = useRef<HTMLElement>(null);
    const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

    // Horizontal scroll state
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

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Counters animation when section hits viewport
            countersRef.current.forEach((counter, idx) => {
                if (!counter) return;

                const targetValue = metrics[idx].value;
                const obj = { val: 0 };

                gsap.to(obj, {
                    val: targetValue,
                    duration: 2.5,
                    delay: idx * 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: counter, // Trigger securely off each number
                        start: "top 85%", // Trigger when the number itself is visible
                        toggleActions: "play none none none"
                    },
                    onUpdate: () => {
                        if (counter) {
                            counter.innerText = Math.round(obj.val).toString();
                        }
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="impact" ref={sectionRef} className="w-full bg-background py-8 md:py-10 border-y border-foreground/5 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
                <div className="mb-6 md:mb-20 text-center w-full px-4 md:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">Proven Impact.</h2>
                    <p className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-primary mt-2 md:mt-4 tracking-widest font-sans font-medium uppercase break-words">Hard Metrics & Quantifiable ROI</p>
                </div>

                {/* 2x2 Grid on Mobile, 4-Column on Desktop */}
                <div className="w-full max-w-7xl flex flex-col items-center relative">
                    <div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full px-4 md:px-6 pb-4 md:pb-0"
                    >
                        {metrics.map((metric, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="w-full min-h-[180px] md:min-h-[360px] bg-card-bg border border-foreground/5 rounded-[1rem] md:rounded-[2rem] p-4 md:p-10 flex flex-col justify-between hover:border-primary transition-colors duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative"
                                >
                                    <div>
                                        <p className="text-foreground/40 text-[8px] sm:text-xs md:text-base font-bold uppercase tracking-wider mb-1 md:mb-4">Metric 0{idx + 1}</p>
                                        <h3 className="text-base sm:text-lg md:text-2xl lg:text-4xl font-heading font-bold text-foreground">{metric.title}</h3>
                                    </div>

                                    <div className="mt-4 md:mt-10">
                                        {metric.prefix && <p className="text-text-secondary text-[8px] md:text-base font-medium mb-1 uppercase tracking-wider">{metric.prefix}</p>}
                                        <div className="flex items-baseline mb-1 md:mb-4 font-heading font-black">
                                            <span
                                                ref={el => { countersRef.current[idx] = el }}
                                                className="text-[32px] sm:text-[40px] md:text-[90px] lg:text-[110px] text-primary leading-none"
                                            >
                                                0
                                            </span>
                                            <span className="text-sm sm:text-xl md:text-5xl lg:text-[60px] text-primary ml-1">{metric.suffix}</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs md:text-base text-text-secondary leading-snug md:leading-relaxed max-w-xs">{metric.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
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
