"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-[999] py-4 md:py-6 px-4 md:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="pointer-events-auto text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight drop-shadow-md transition-all hover:scale-105">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        AARO7
                    </span>
                </Link>

                <a href="#" className="pointer-events-auto inline-flex items-center justify-center bg-primary text-[#08080A] font-bold font-sans text-xs sm:text-sm md:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    Book audit
                </a>
            </div>
        </header>
    );
}
