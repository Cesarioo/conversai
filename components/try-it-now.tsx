"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneCall, CheckCircle } from "lucide-react";

export function TryItNow() {
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission

        const response = await fetch("/api/slack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
        });
        const data = await response.json();
        if (data.ok) {
            setSubmitted(true);
        } else {
            setError(data.error);
        }

        // Reset the form after a delay
        setTimeout(() => {
            setPhone("");
            setSubmitted(false);
            setError("");
        }, 3000);
    };

    return (
        <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Experience AI-Powered Support{" "}
                                <span className="text-secondary">Now</span>
                            </h2>
                            <p className="text-xl mb-8 text-primary-foreground/80">
                                Transform your customer support instantly with
                                our cutting-edge AI voice agent.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "24/7 Availability",
                                    "Instant Response",
                                    "Personalized Interactions",
                                ].map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <CheckCircle className="text-secondary" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            className="bg-background/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2,
                            }}
                        >
                            {submitted && (
                                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                                    Your demo call has been scheduled. We will
                                    contact you shortly.
                                </div>
                            )}
                            {error && (
                                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                                    {error}
                                </div>
                            )}
                            {!submitted && !error && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-semibold mb-4">
                                        Get a Free Demo Call
                                    </h3>
                                    <div className="relative">
                                        <PhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/50" />
                                        <Input
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            className="pl-10 bg-background/20 border-background/30 text-primary-foreground placeholder-primary-foreground/50"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
                                    >
                                        {submitted ? (
                                            <CheckCircle className="mr-2" />
                                        ) : (
                                            <PhoneCall className="mr-2" />
                                        )}
                                        {submitted
                                            ? "Demo Call Scheduled!"
                                            : "Schedule Your Demo"}
                                    </Button>
                                </form>
                            )}

                            <p className="mt-6 text-sm text-center text-primary-foreground/70">
                                Experience the future of customer support. No
                                obligation, just pure innovation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        </section>
    );
}
