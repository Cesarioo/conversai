"use client"

import { motion } from "framer-motion"
import { Brain, Globe, Shield, Headphones, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Our AI continuously learns from interactions, improving its responses over time.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Communicate with customers in multiple languages, breaking down language barriers.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Secure Conversations",
    description: "End-to-end encryption ensures all customer interactions remain confidential.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "Seamless Human Handoff",
    description: "Easily transfer complex queries to human agents when needed.",
    color: "from-orange-500 to-red-500",
  },
]

export function AdvancedFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Advanced Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our cutting-edge AI technology can revolutionize your customer support experience.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-75 group-hover:opacity-90 transition-opacity duration-300`}
              />
              <div className="relative p-8 flex flex-col h-full">
                <feature.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white text-opacity-90 mb-6 flex-grow">{feature.description}</p>
                <Button variant="secondary" className="self-start group">
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
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

