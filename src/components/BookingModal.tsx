"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        subject: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Listen for hash changes to open the modal
    useEffect(() => {
        const handleOpen = () => {
            setIsRendered(true);
            // Wait for next tick so CSS transitions can catch the DOM element
            setTimeout(() => setIsOpen(true), 50);
        };

        const checkHash = () => {
            if (window.location.hash === "#book") {
                handleOpen();
            } else {
                setIsOpen(false);
                setTimeout(() => setIsRendered(false), 500); // Wait for exit animation
            }
        };

        // Check on initial load
        checkHash();

        window.addEventListener("hashchange", checkHash);
        window.addEventListener("openBookingModal", handleOpen);

        return () => {
            window.removeEventListener("hashchange", checkHash);
            window.removeEventListener("openBookingModal", handleOpen);
        };
    }, []);

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        // Remove hash without scrolling
        history.pushState("", document.title, window.location.pathname + window.location.search);
        setTimeout(() => setIsRendered(false), 500);

        // Reset form state after close
        setTimeout(() => {
            setFormData({ name: "", number: "", subject: "" });
            setIsSuccess(false);
        }, 500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Auto close after success
            setTimeout(() => {
                handleClose();
            }, 3000);
        }, 1500);
    };

    if (!isRendered) return null;

    return (
        <div
            className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div
                className={`relative w-full max-w-[500px] bg-foreground rounded-[2rem] p-6 md:p-10 shadow-2xl border border-primary/20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
                    }`}
            >
                {/* Decorative glow behind the card */}
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/10 blur-[80px] rounded-full -z-10 pointer-events-none"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 p-2.5 rounded-full text-background/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {!isSuccess ? (
                    <>
                        <h3 className="text-3xl md:text-4xl font-heading font-black text-background mb-2 tracking-tight">
                            Let's Talk ROI.
                        </h3>
                        <p className="text-sm md:text-base text-background/80 font-sans leading-relaxed mb-8">
                            Fill out the details below and our architects will reach out to schedule your 15-minute consultation.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-background/70 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-background/5 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="number" className="text-xs font-semibold uppercase tracking-wider text-background/70 ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="number"
                                    name="number"
                                    required
                                    value={formData.number}
                                    onChange={handleChange}
                                    className="w-full bg-background/5 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-background/70 ml-1">Subject of Call</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-background/5 border border-background/20 rounded-xl px-4 py-3 text-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans appearance-none"
                                >
                                    <option value="" disabled className="text-foreground">Select a subject...</option>
                                    <option value="custom_ai" className="text-foreground">Custom AI Models</option>
                                    <option value="smart_retrieval" className="text-foreground">Smart Retrieval Pipelines</option>
                                    <option value="workflow_automation" className="text-foreground">Workflow Automation</option>
                                    <option value="general_consultation" className="text-foreground">General Consultation</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white font-bold font-sans text-base px-6 py-4 rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(255,87,51,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Scheduling...
                                    </>
                                ) : "Confirm Booking"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-background mb-2 tracking-tight">
                            Booking Confirmed!
                        </h3>
                        <p className="text-sm md:text-base text-background/80 font-sans leading-relaxed">
                            Thank you, {formData.name}. Our team will contact you shortly at {formData.number}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
