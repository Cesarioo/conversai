"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type Message = {
  text: string
  position: "left" | "right"
}

const messages: Message[] = [
  { text: "Tired of answering phone calls?", position: "right" },
  { text: "Yes, such a waste of time", position: "left" },
  { text: "Let's automate them!", position: "right" },
  { text: "How?", position: "left" },
  { text: "With a professional AI assistant, trained on your business", position: "right" },
  { text: "It answers any time of the day, always with a smile!", position: "right" },
]

export function Hero() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => (prev < messages.length ? prev + 1 : prev))
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background p-4">
      <div className="w-full max-w-2xl relative">
        <AnimatePresence>
          {messages.slice(0, visibleMessages).map((message, index) => {
            const isConsecutive = index > 0 && messages[index - 1].position === message.position
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`flex items-center ${message.position === "right" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div className={`flex items-center ${message.position === "right" ? "flex-row-reverse" : "flex-row"}`}>
                  {!isConsecutive && (
                    <div
                      className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ${message.position === "right" ? "ml-2" : "mr-2"}`}
                    >
                      <img
                        src={
                          message.position === "right"
                            ? "https://media.licdn.com/dms/image/v2/D4E03AQHZ9MVaI7VzSg/profile-displayphoto-shrink_200_200/B4EZOWI0XpHEAk-/0/1733390714888?e=2147483647&v=beta&t=_NobPB5i8JRufnojfesZlY6T9dSLfI11KlE8dM53BXY"
                            : "https://media.licdn.com/dms/image/v2/D4E03AQFH3Dz83L2Bng/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727352715015?e=2147483647&v=beta&t=JHJWY35My0_-_WgS4eB4rQyvtWPA1q5qQYsaRcoynmY"
                        }
                        alt={`${message.position === "right" ? "AI Assistant" : "User"} Avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <motion.div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.position === "right"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-secondary text-secondary-foreground rounded-tl-none"
                    } ${isConsecutive ? (message.position === "right" ? "mr-10" : "ml-10") : ""}`}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30,
                    }}
                  >
                    <p className="text-lg">{message.text}</p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      {visibleMessages === messages.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="text-lg mb-2">Discover More</p>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      )}
    </section>
  )
}

