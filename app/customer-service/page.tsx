import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Headphones,
    Calendar,
    Clipboard,
    MessageSquare,
    BarChart,
    Users,
    ArrowRight,
    CheckCircle,
} from "lucide-react";

const services = [
    {
        title: "Appointment Scheduling",
        description:
            "Manage customer appointments with ease using our AI-driven scheduling system.",
        icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
        title: "Customer Records Management",
        description:
            "Organize and access customer records efficiently, ensuring seamless service delivery.",
        icon: <Clipboard className="h-10 w-10 text-primary" />,
    },
    {
        title: "24/7 Virtual Assistance",
        description:
            "Provide round-the-clock support to customers with our virtual assistant.",
        icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
        title: "Voice-Activated Commands",
        description:
            "Control your customer service management system hands-free with voice commands.",
        icon: <Headphones className="h-10 w-10 text-primary" />,
    },
    {
        title: "Predictive Analytics",
        description:
            "Utilize data-driven insights to improve customer service and operations.",
        icon: <BarChart className="h-10 w-10 text-primary" />,
    },
    {
        title: "Collaborative Tools",
        description:
            "Enhance teamwork among customer service professionals with our collaborative tools.",
        icon: <Users className="h-10 w-10 text-primary" />,
    },
];

const steps = [
    {
        title: "Setup",
        description:
            "Easily set up your customer service management system with a few simple steps.",
    },
    {
        title: "Customization",
        description:
            "Tailor the system to meet the specific needs of your customer service team.",
    },
    {
        title: "Activation",
        description:
            "Activate the system and start improving your customer service efficiency.",
    },
];

const benefits = [
    {
        title: "Improved Customer Care",
        description:
            "Enhance customer care with streamlined processes and efficient management.",
    },
    {
        title: "Increased Efficiency",
        description:
            "Optimize customer service operations and reduce administrative workload.",
    },
    {
        title: "Data-Driven Insights",
        description:
            "Leverage data to make informed decisions and improve customer service performance.",
    },
    {
        title: "Enhanced Collaboration",
        description:
            "Foster better communication and collaboration among customer service staff.",
    },
];

export default function CustomerServicePage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                                AI-Powered Solutions for{" "}
                                <span className="text-primary">
                                    Customer Service
                                </span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Enhance your customer service efficiency and
                                care with ConversAIs advanced AI solutions
                                tailored for customer service teams.
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
                        Benefits for You
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
                                Success Story: Sarah Johnson
                            </h2>
                            <p className="text-gray-500 md:text-xl">
                                Discover how Sarah Johnson improved her customer
                                service efficiency by 50% and enhanced customer
                                satisfaction with ConversAI solutions.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Reduced appointment scheduling time by
                                        40%
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Improved customer record management by
                                        60%
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Enhanced customer satisfaction with 24/7
                                        virtual assistance
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
                                src="/placeholder.svg"
                                alt="Sarah Johnson"
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
                        Ready to Transform Your Customer Service?
                    </h2>
                    <p className="mx-auto max-w-[700px] text-white/90 md:text-xl mb-8">
                        Join the growing number of customer service teams using
                        ConversAI to enhance their operations and customer care.
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
