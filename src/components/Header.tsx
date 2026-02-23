"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-[999] py-4 md:py-6 px-4 md:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="pointer-events-auto text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight drop-shadow-sm transition-all hover:scale-105">
                    <span className="text-primary">
                        AARO7
                    </span>
                </Link>

                <a href="#" className="pointer-events-auto inline-flex items-center justify-center bg-primary text-white font-bold font-sans text-xs sm:text-sm md:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-foreground hover:text-white transition-colors duration-300 shadow-md">
                    Book audit
                </a>
            </div>
        </header>
    );
}
