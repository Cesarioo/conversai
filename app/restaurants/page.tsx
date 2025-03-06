import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
    PhoneCall,
    Calendar,
    Utensils,
    MessageSquare,
    BarChart,
    Users,
    ArrowRight,
    CheckCircle,
} from "lucide-react";

const services = [
    {
        title: "AI-Powered Reservations",
        description:
            "Streamline your booking process with intelligent scheduling and automated confirmations.",
        icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
        title: "Smart Order Management",
        description:
            "Efficiently handle orders from multiple sources, reducing errors and improving kitchen flow.",
        icon: <Utensils className="h-10 w-10 text-primary" />,
    },
    {
        title: "24/7 Virtual Assistant",
        description:
            "Provide instant responses to customer inquiries, even outside business hours.",
        icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
        title: "Intelligent Table Management",
        description:
            "Optimize seating arrangements and reduce wait times with AI-driven insights.",
        icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
        title: "Voice-Activated Ordering",
        description:
            "Enable hands-free, efficient ordering for both dine-in and takeout customers.",
        icon: <PhoneCall className="h-10 w-10 text-primary" />,
    },
    {
        title: "Predictive Analytics",
        description:
            "Forecast demand, optimize inventory, and make data-driven decisions to improve profitability.",
        icon: <BarChart className="h-10 w-10 text-primary" />,
    },
];

const steps = [
    {
        title: "Integration",
        description:
            "We seamlessly integrate our AI system with your existing restaurant management software.",
    },
    {
        title: "Customization",
        description:
            "Our team tailors the AI to your specific menu, operations, and customer service needs.",
    },
    {
        title: "Activation",
        description:
            "Launch the AI services and start seeing immediate improvements in your operations.",
    },
];

const benefits = [
    {
        title: "Increased Operational Efficiency",
        description:
            "Automate routine tasks, allowing your staff to focus on providing exceptional dining experiences.",
    },
    {
        title: "Enhanced Customer Satisfaction",
        description:
            "Provide faster service, personalized recommendations, and instant support to your guests.",
    },
    {
        title: "Data-Driven Insights",
        description:
            "Gain valuable insights into customer preferences, peak hours, and menu performance.",
    },
    {
        title: "Reduced Costs",
        description:
            "Optimize staffing, reduce food waste, and streamline operations to improve your bottom line.",
    },
];

export default function RestaurantServicesPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                                AI-Powered Services for{" "}
                                <span className="text-primary">
                                    Restaurants
                                </span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Elevate your restaurant operations with
                                ConversAIs cutting-edge AI solutions tailored
                                for the food service industry.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button className="bg-primary text-white hover:bg-primary/90">
                                Get Started
                            </Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        Our Services
                    </h2>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-4"
                            >
                                <div className="p-4 bg-[#f1faee] rounded-full">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        How It Works
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        Benefits for Your Restaurant
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4"
                            >
                                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Success Story: La Trattoria
                            </h2>
                            <p className="text-gray-500 md:text-xl">
                                See how La Trattoria increased their revenue by
                                30% and improved customer satisfaction scores by
                                implementing ConversAIs restaurant services.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>Reduced wait times by 50%</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>Increased table turnover by 25%</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Improved staff efficiency by 40%
                                    </span>
                                </li>
                            </ul>
                            <Button className="w-fit">
                                Read Full Case Study
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mx-auto w-full max-w-[400px] space-y-4">
                            <Image
                                src="/plaehold-image.svg"
                                alt="La Trattoria Restaurant"
                                width={400}
                                height={300}
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
                <div className="container px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
                        Ready to Revolutionize Your Restaurant?
                    </h2>
                    <p className="mx-auto max-w-[700px] text-white/90 md:text-xl mb-8">
                        Join the growing number of restaurants using ConversAI
                        to streamline operations and enhance customer
                        experiences.
                    </p>
                    <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90"
                        >
                            Schedule a Demo
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-primary/90"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
