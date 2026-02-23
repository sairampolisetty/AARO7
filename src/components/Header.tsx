"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Architecture", href: "#architecture" },
    { name: "Impact", href: "#impact" },
    { name: "Leadership", href: "#leadership" },
];

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            // If the mobile menu is open, don't hide the navbar on scroll
            if (isMobileMenuOpen) return;

            // Hide while scrolling
            setIsVisible(false);

            // Clear the existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set a timeout to show the navbar after scrolling stops
            scrollTimeout = setTimeout(() => {
                setIsVisible(true);
            }, 250); // Adjust this value for snappier/slower reappearance (250ms is good to avoid flicker)
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // Intersection Observer for Active Links
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: "-30% 0px -50% 0px" }); // Adjust rootMargin so it triggers nicely

        navLinks.forEach(link => {
            const section = document.getElementById(link.href.replace('#', ''));
            if (section) observer.observe(section);
        });

        // Add home/hero section too
        const homeSection = document.getElementById('home');
        if (homeSection) observer.observe(homeSection);

        return () => observer.disconnect();
    }, []);

    // Smooth scroll handler
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // Close mobile menu if open
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }

        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-4xl transition-all duration-500 ease-in-out ${isVisible || isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0 pointer-events-none"
                }`}
        >
            <div className={`bg-background/80 backdrop-blur-xl border border-foreground/10 shadow-lg px-5 md:px-8 py-3 md:py-4 transition-all duration-300 ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`}>

                {/* Top Row (Always visible) */}
                <div className="flex items-center justify-between w-full">
                    <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl md:text-3xl font-heading font-black tracking-tight transition-all hover:scale-105 outline-none">
                        <span className="text-primary">AARO7</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-sm tracking-wide font-sans font-medium transition-all duration-300 outline-none ${activeSection === link.href.replace('#', '') ? "text-primary font-bold scale-105" : "text-foreground hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <a href="#" className="hidden sm:inline-flex items-center justify-center bg-primary text-white font-bold font-sans text-xs md:text-sm px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-foreground hover:text-white transition-colors duration-300 shadow-md outline-none whitespace-nowrap">
                            Book audit
                        </a>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-foreground/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-foreground" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                        }`}
                >
                    <nav className="flex flex-col gap-4 pb-4 px-2 border-t border-foreground/10 pt-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-base tracking-wide font-sans font-medium transition-all duration-300 outline-none block w-full text-left py-2 border-b border-foreground/5 last:border-0 ${activeSection === link.href.replace('#', '') ? "text-primary font-bold pl-2 border-l-2 border-l-primary" : "text-foreground hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="#book" className="sm:hidden mt-2 inline-flex items-center justify-center bg-primary text-white font-bold font-sans text-base px-6 py-3 rounded-full hover:bg-foreground hover:text-white transition-colors duration-300 shadow-md outline-none w-full text-center tracking-wide">
                            Book audit
                        </a>
                    </nav>
                </div>

            </div>
        </header>
    );
}
