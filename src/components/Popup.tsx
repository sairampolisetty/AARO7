"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Popup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false); // Controls actual DOM presence

    useEffect(() => {
        // Check if the user has already dismissed or interacted with it
        const hasSeenPopup = localStorage.getItem("aaro7_popup_seen");

        if (hasSeenPopup === "true") return;

        const timer = setTimeout(() => {
            setIsRendered(true);
            // Slight delay before fading in to allow CSS transitions to catch the DOM element
            setTimeout(() => setIsVisible(true), 50);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    // Handle body scroll locking
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => { document.body.style.overflow = ""; };
    }, [isVisible]);

    const handleClose = () => {
        // Start exit animation
        setIsVisible(false);
        // Save state to prevent showing again
        localStorage.setItem("aaro7_popup_seen", "true");

        // Remove from DOM after transition completes
        setTimeout(() => {
            setIsRendered(false);
        }, 500); // Matches transition duration
    };

    if (!isRendered) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div
                className={`relative w-full max-w-[420px] bg-foreground rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-primary/20 flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
                    }`}
            >
                {/* Decorative glow behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[80px] rounded-full -z-10 pointer-events-none"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 p-2.5 rounded-full text-background/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close popup"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl md:text-3xl font-heading font-black text-background mb-4 tracking-tight mt-2">
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

                <p className="text-xs text-background/50 font-sans mt-5">
                    No obligation, just clarity.
                </p>
            </div>
        </div>
    );
}
