"use client";

import React from "react";

export default function Marquee() {
    return (
        <div className="w-full overflow-hidden bg-background py-8 border-y border-white/10 flex whitespace-nowrap relative">
            <style>{`
                @keyframes raw_marquee_scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-raw-marquee {
                    animation: raw_marquee_scroll 50s linear infinite;
                }
            `}</style>

            <div className="flex whitespace-nowrap animate-raw-marquee">
                {Array.from({ length: 4 }).map((_, i) => (
                    <span
                        key={i}
                        className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mx-6 text-transparent"
                        style={{
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
                        }}
                    >
                        BRIDGING THE AI DEPLOYMENT GAP • MASTERING THE AI STACK • INDUSTRIAL REALITY • AGENTIC ECOSYSTEMS • AARO7 •
                    </span>
                ))}
            </div>
        </div>
    );
}
