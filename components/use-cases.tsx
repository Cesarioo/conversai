"use client"

import { motion } from "framer-motion"
import { Utensils, HeadphonesIcon, UserCircle2, Stethoscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const useCases = [
  {
    icon: Utensils,
    title: "Restaurants",
    description: "Streamline reservations, answer menu inquiries, and manage takeout orders efficiently.",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Service",
    description: "Provide 24/7 support, handle common queries, and escalate complex issues seamlessly.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: UserCircle2,
    title: "Private Assistant",
    description: "Manage schedules, set reminders, and handle personal tasks with discretion and efficiency.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Stethoscope,
    title: "Medical Clinics",
    description: "Schedule appointments, provide basic health information, and manage patient inquiries.",
    color: "from-green-400 to-emerald-500",
  },
]

export function UseCases() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Works for All Use-Cases</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI voice agent adapts seamlessly to various industries, providing tailored solutions for every business
            need.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-75 group-hover:opacity-90 transition-opacity duration-300`}
              />
              <div className="relative p-6 flex flex-col h-full">
                <useCase.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-white text-opacity-90 mb-4 flex-grow">{useCase.description}</p>
                <Button
                  variant="secondary"
                  className="self-start group mt-auto bg-white/90 text-gray-800 hover:bg-white"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
            Explore More Industries
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

