"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Zap, BarChart, Clock } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Natural Voice Interaction",
    description: "Engage customers with lifelike AI voices that understand context and nuance.",
    color: "from-purple-200 to-purple-400",
    iconColor: "text-purple-700",
    backContent:
      "Our advanced natural language processing allows for human-like conversations, improving customer satisfaction and reducing misunderstandings.",
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "Provide immediate assistance to customer queries, reducing wait times dramatically.",
    color: "from-yellow-200 to-yellow-400",
    iconColor: "text-yellow-700",
    backContent:
      "With response times under 1 second, our AI ensures that no customer is left waiting, leading to higher engagement and resolution rates.",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "Gain insights from every interaction to continuously improve your service.",
    color: "from-green-200 to-green-400",
    iconColor: "text-green-700",
    backContent:
      "Our detailed analytics dashboard provides actionable insights, helping you identify trends, improve your AI's responses, and optimize your customer support strategy.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Offer round-the-clock support without the need for human staff.",
    color: "from-blue-200 to-blue-400",
    iconColor: "text-blue-700",
    backContent:
      "Ensure your customers receive support at any time, in any time zone, without the need for shift scheduling or overtime costs.",
  },
]

export function Functionalities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/50 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-20 text-foreground"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Empower Your Support with AI
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="h-full overflow-hidden relative group rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-8">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    initial={false}
                    animate={hoveredIndex === index ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative z-10"
                    initial={false}
                    animate={hoveredIndex === index ? { rotateY: 180 } : { rotateY: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="backface-hidden">
                      <div
                        className={`w-20 h-20 rounded-full bg-background flex items-center justify-center mb-8 mx-auto shadow-md ${feature.iconColor}`}
                      >
                        <feature.icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-semibold text-center mb-6 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-center text-sm leading-relaxed">{feature.description}</p>
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
                      <div className="p-4 text-center">
                        <p className="text-foreground text-sm leading-relaxed">{feature.backContent}</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

