"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import NodeNetwork from "./NodeNetwork";

export default function Hero() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headlineRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
            );
            gsap.fromTo(
                subheadRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="home" className="relative w-full h-[80vh] md:h-screen min-h-[550px] flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop")',
                    backgroundPosition: 'center 30%'
                }}
            />
            {/* Light gradient overlay to blend image with the app's light theme */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#F7F5F0]/80 via-[#F7F5F0]/40 to-[#F7F5F0]" />

            <div
                className="absolute inset-0 z-[2] opacity-60 mix-blend-screen"
                role="img"
                aria-label="Interactive 3D AI Node Network Animation"
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} aria-hidden="true">
                    <NodeNetwork count={120} />
                </Canvas>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6 max-w-5xl mx-auto mt-16 md:mt-0">
                <h1
                    ref={headlineRef}
                    className="text-[34px] sm:text-5xl md:text-7xl lg:text-[84px] font-heading font-black leading-tight mb-4 md:mb-6 tracking-tight text-foreground drop-shadow-sm"
                >
                    We don't just prompt the future; we <br className="md:hidden" /><span className="text-primary drop-shadow-sm">architect it.</span>
                </h1>
                <p
                    ref={subheadRef}
                    className="text-sm sm:text-lg md:text-xl text-foreground/80 max-w-3xl font-sans drop-shadow-sm px-2 mt-4 md:mt-6 leading-relaxed"
                >
                    <span className="text-primary font-bold font-heading tracking-wide">AARO7</span> is an end-to-end AI engineering hub that <span className="text-foreground font-semibold">closes the gap between raw model potential and industrial execution.</span>
                </p>
            </div>
        </section>
    );
}
