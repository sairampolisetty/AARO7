"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Mission() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current || !containerRef.current) return;

        // Cache the original text
        const textContent = textRef.current.getAttribute("data-text") || textRef.current.innerText;
        if (!textRef.current.hasAttribute("data-text")) {
            textRef.current.setAttribute("data-text", textContent);
        }

        // Split text into words for animation
        const words = textContent.split(" ");
        textRef.current.innerHTML = "";

        words.forEach(word => {
            const span = document.createElement("span");
            span.innerText = word + " ";
            // Start with light text color for light bg
            span.className = "text-text-secondary/30 transition-colors duration-300";
            textRef.current?.appendChild(span);
        });

        const spans = textRef.current.querySelectorAll("span");

        const ctx = gsap.context(() => {
            gsap.to(spans, {
                // Animate to dark foreground color for readability
                color: "#2F2F2F",
                stagger: 0.1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 70%",
                    scrub: 0.5,
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[70vh] md:min-h-screen flex items-center justify-center bg-background px-4 md:px-6 py-16 md:py-20"
        >
            <div className="max-w-5xl mx-auto">
                <p
                    ref={textRef}
                    className="text-[19px] sm:text-2xl md:text-4xl lg:text-5xl font-sans font-semibold leading-relaxed"
                >
                    Bridge the global AI Deployment Gap by mastering the full lifecycle of implementation. From training and fine-tuning foundational models to architecting RAG systems and orchestrating Agentic ecosystems via MCP, we resolve technical debt and build the high-performance intelligence layer for any industry, in any domain.
                </p>
            </div>
        </section>
    );
}
