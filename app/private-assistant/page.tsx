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
        title: "Personalized Scheduling",
        description:
            "Manage your daily schedule with AI-driven insights and automated reminders.",
        icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
        title: "Smart Task Management",
        description:
            "Organize and prioritize tasks efficiently, reducing stress and improving productivity.",
        icon: <Utensils className="h-10 w-10 text-primary" />,
    },
    {
        title: "24/7 Virtual Assistant",
        description:
            "Get instant responses to your queries and support for various tasks, anytime.",
        icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
        title: "Voice-Activated Commands",
        description:
            "Control your assistant hands-free with voice commands for seamless interaction.",
        icon: <PhoneCall className="h-10 w-10 text-primary" />,
    },
    {
        title: "Predictive Analytics",
        description:
            "Receive data-driven recommendations to optimize your daily routines and decisions.",
        icon: <BarChart className="h-10 w-10 text-primary" />,
    },
    {
        title: "Collaborative Tools",
        description:
            "Enhance teamwork with tools designed for efficient communication and collaboration.",
        icon: <Users className="h-10 w-10 text-primary" />,
    },
];

const steps = [
    {
        title: "Setup",
        description:
            "Easily set up your private assistant with a few simple steps.",
    },
    {
        title: "Customization",
        description:
            "Tailor the assistant to your specific needs and preferences.",
    },
    {
        title: "Activation",
        description:
            "Activate the assistant and start experiencing enhanced productivity.",
    },
];

const benefits = [
    {
        title: "Increased Productivity",
        description:
            "Automate routine tasks, allowing you to focus on what matters most.",
    },
    {
        title: "Enhanced Organization",
        description:
            "Keep your tasks and schedule organized with minimal effort.",
    },
    {
        title: "Data-Driven Insights",
        description:
            "Gain valuable insights to improve your daily routines and decision-making.",
    },
    {
        title: "Reduced Stress",
        description:
            "Streamline your tasks and schedule to reduce stress and improve well-being.",
    },
];

export default function PrivateAssistantPage() {
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
                                    Personal Assistants
                                </span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Elevate your personal productivity with
                                ConversAI cutting-edge AI solutions tailored for
                                individual needs.
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
                                Success Story: John Doe
                            </h2>
                            <p className="text-gray-500 md:text-xl">
                                See how John Doe improved his productivity by
                                40% and reduced stress by implementing
                                ConversAIs private assistant services.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Reduced task completion time by 30%
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Improved daily organization by 50%
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span>
                                        Enhanced decision-making with
                                        data-driven insights
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
                                alt="John Doe"
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
                        Ready to Enhance Your Productivity?
                    </h2>
                    <p className="mx-auto max-w-[700px] text-white/90 md:text-xl mb-8">
                        Join the growing number of individuals using ConversAI
                        to streamline their daily tasks and improve
                        productivity.
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
