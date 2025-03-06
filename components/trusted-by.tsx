"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const companies = [
    { name: "TechCorp", logo: "/clients/EdgeKart.png" },
    { name: "InnovateSoft", logo: "/clients/Grasshopper.png" },
    { name: "GlobalComm", logo: "/clients/Harvest.png" },
    { name: "FutureTech", logo: "/clients/HighCountryClub.png" },
    { name: "SmartSolutions", logo: "/clients/InfinityParker.png" },
    { name: "AI Dynamics", logo: "/clients/Kinetic.png" },
    { name: "DataFlow", logo: "/clients/MajentaMantis.png" },
    { name: "CloudNine", logo: "/clients/Pastel&Co..png" },
    { name: "CyberShield", logo: "/clients/Wheelapp.png" },
    { name: "QuantumLeap", logo: "/clients/EdgeKart.png" },
];

export function TrustedBy() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const scrollForward = () => {
            if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
                scroller.scrollLeft = 0;
            } else {
                scroller.scrollLeft += 1;
            }
        };

        const intervalId = setInterval(scrollForward, 30);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="py-12 bg-secondary overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Trusted by Industry Leaders
                </h2>
                <div className="relative">
                    <div
                        ref={scrollerRef}
                        className="flex overflow-x-hidden whitespace-nowrap"
                    >
                        {[...companies, ...companies].map((company, index) => (
                            <div
                                key={`${company.name}-${index}`}
                                className="inline-flex items-center justify-center min-w-[150px] h-16 mx-2"
                            >
                                <div className="relative w-28 h-12 transition-all duration-300 hover:scale-110">
                                    <Image
                                        src={company.logo || "/placeholder.svg"}
                                        alt={`${company.name} logo`}
                                        width={150}
                                        height={50}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 h-full w-1/12 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 h-full w-1/12 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
                </div>
                <p className="text-center mt-8 text-sm text-muted-foreground">
                    Join over 10,000 companies revolutionizing customer support
                    with ConversAI
                </p>
            </div>
        </section>
    );
}
