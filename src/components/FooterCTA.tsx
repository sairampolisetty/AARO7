"use client";

import React from "react";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";

export default function FooterCTA() {
    return (
        <footer className="w-full min-h-[60vh] md:min-h-[70vh] bg-[#020308] flex flex-col items-center justify-center border-t border-white/5 relative overflow-hidden py-16 md:py-20 px-4 md:px-6">
            {/* Deep Space Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-secondary/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-heading font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">
                    Ready to make AI <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">work for you?</span>
                </h2>
                <p className="text-base sm:text-lg md:text-2xl text-text-secondary mb-12 md:mb-16 max-w-2xl font-light px-2">
                    Stop prompting, start architecting. Schedule a strategic consultation to uncover the ROI of a specialized intelligence layer.
                </p>

                <MagneticButton>
                    <a href="#" className="group relative flex items-center justify-center gap-3 md:gap-4 bg-white text-background font-bold text-sm md:text-xl py-4 px-8 md:py-6 md:px-12 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]">
                        <span className="relative z-10 flex items-center gap-2 md:gap-3 group-hover:text-white transition-colors duration-300">
                            Schedule a Consultation
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    </a>
                </MagneticButton>
            </div>

            <div className="absolute bottom-6 md:bottom-8 text-[10px] md:text-sm text-text-secondary/40 font-sans tracking-widest uppercase">
                © {new Date().getFullYear()} AARO7 FINTECH PVT LTD. All rights reserved.
            </div>
        </footer>
    );
}
