"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Popup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

    useEffect(() => {
        // Only show if it hasn't been dismissed in this session
        if (hasBeenDismissed) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [hasBeenDismissed]);

    const handleClose = () => {
        setIsVisible(false);
        setHasBeenDismissed(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/40 backdrop-blur-sm transition-opacity duration-300">
            {/* 
                We use the existing color palette: 
                - dark background: foreground (#2F2F2F) 
                - primary accent: primary (#FF5733)
                - text: background (#F7F5F0) for contrast against the dark card 
            */}
            <div className="relative w-full max-w-[420px] bg-foreground rounded-[2rem] p-8 md:p-10 shadow-2xl border border-primary/20 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">

                {/* Decorative glow behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[60px] rounded-full -z-10 pointer-events-none"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-background/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl md:text-3xl font-heading font-black text-background mb-4 tracking-tight">
                    Lost in the AI noise?
                </h3>

                <p className="text-sm md:text-base text-background/80 font-sans leading-relaxed mb-8">
                    Architecture can be complex. Let's skip the guesswork and map out your ROI in a 15-minute strategy call.
                </p>

                <a
                    href="#book"
                    onClick={handleClose}
                    className="w-full bg-primary text-white font-bold font-sans text-base px-6 py-4 rounded-full hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,87,51,0.4)]"
                >
                    Book Your Strategy Session
                </a>

                <p className="text-xs text-background/50 font-sans mt-4">
                    No obligation, just clarity.
                </p>
            </div>
        </div>
    );
}
