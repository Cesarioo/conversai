"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    ChevronDown,
    Utensils,
    Building,
    ShoppingBag,
    Stethoscope,
    PiggyBank,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type NavigationItem = {
    title: string;
    href?: string;
    items?: {
        icon: LucideIcon;
        title: string;
        description: string;
        href: string;
    }[];
};

const navigationItems: NavigationItem[] = [
    {
        title: "Use Cases",
        items: [
            {
                icon: Utensils,
                title: "Restaurant",
                description: "Let the agent handle reservations and inquiries",
                href: "/restaurants",
            },
            {
                icon: Building,
                title: "Hotel",
                description: "Manage bookings and guest services efficiently",
                href: "#hotel",
            },
            {
                icon: ShoppingBag,
                title: "E-commerce",
                description:
                    "Provide 24/7 customer support for online shoppers",
                href: "#ecommerce",
            },
            {
                icon: Stethoscope,
                title: "Healthcare",
                description: "Schedule appointments and answer patient queries",
                href: "/medical-clinics",
            },
            {
                icon: PiggyBank,
                title: "Finance",
                description: "Assist with account inquiries and transactions",
                href: "#finance",
            },
        ],
    },
    {
        title: "Pricing",
        href: "#pricing",
    },
];

export function Navbar() {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controlNavbar);

        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <motion.nav
            className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">
                                ConversAI
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {navigationItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="relative"
                                    onMouseEnter={() =>
                                        setHoveredSection(item.title)
                                    }
                                    onMouseLeave={() => setHoveredSection(null)}
                                >
                                    {item.items ? (
                                        <button className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center">
                                            {item.title}
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </button>
                                    ) : item.href ? (
                                        <Link
                                            href={item.href}
                                            className="text-foreground/80 hover:text-foreground transition-colors py-2"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : null}

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {item.items &&
                                            hoveredSection === item.title && (
                                                <motion.div
                                                    className="absolute top-full -right-[520px] pt-4 w-[600px]"
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                        ease: "easeOut",
                                                    }}
                                                >
                                                    <motion.div
                                                        className="bg-background rounded-xl p-6 grid grid-cols-2 gap-4 shadow-2xl border border-border"
                                                        initial={{
                                                            scale: 0.95,
                                                        }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: "easeOut",
                                                        }}
                                                    >
                                                        {item.items.map(
                                                            (
                                                                subItem,
                                                                index
                                                            ) => {
                                                                const Icon =
                                                                    subItem.icon;
                                                                return (
                                                                    <motion.div
                                                                        key={
                                                                            subItem.title
                                                                        }
                                                                        initial={{
                                                                            opacity: 0,
                                                                            x: -20,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            x: 0,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.2,
                                                                            delay:
                                                                                index *
                                                                                0.05,
                                                                            ease: "easeOut",
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                subItem.href
                                                                            }
                                                                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent group transition-colors"
                                                                        >
                                                                            <div className="mt-1">
                                                                                <Icon className="h-5 w-5 text-primary" />
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                                                        {
                                                                                            subItem.title
                                                                                        }
                                                                                    </span>
                                                                                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                                                                </div>
                                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                                    {
                                                                                        subItem.description
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    </motion.div>
                                                                );
                                                            }
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost">Launch the App</Button>
                        <Button>Test an Agent</Button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
