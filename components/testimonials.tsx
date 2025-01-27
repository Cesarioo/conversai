"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuoteIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"

type Testimonial = {
  name: string
  role: string
  company: string
  content: string
  image: string
  gradient: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Customer Service Manager",
    company: "TechCorp",
    content:
      "VoiceAI has transformed our customer support. Our response times have decreased by 80%, and customer satisfaction has soared.",
    image: "https://www.mckinsey.com/~/media/mckinsey/industries/technology%20media%20and%20telecommunications/high%20tech/our%20insights/eand%20group%20ceo%20transforming%20from%20a%20telco%20to%20a%20techco/thumb-groupceo-v3.jpg?cq=50&mw=767&car=16:9&cpy=Center",
    gradient: "from-blue-600 via-blue-600/80 to-transparent",
  },
  {
    name: "Lisa Thompson",
    role: "Restaurant Owner",
    company: "InnovateSoft",
    content:
      "The natural language processing capabilities of VoiceAI are impressive. It's like having a team of expert support agents available 24/7.",
    image:
      "https://cdn.prod.website-files.com/659ee966a09539fc16cb266a/65b168c3467da455a5bbce97_business-woman-restaurant-owner-use-laptop-in-hand-2022-09-29-20-58-33-utc.webp",
    gradient: "from-emerald-600 via-emerald-600/80 to-transparent",
  },
  {
    name: "Dr. James Wilson",
    role: "Chief of Medicine",
    company: "City General Hospital",
    content:
      "Implementing VoiceAI was seamless. The ROI we've seen in just a few months is remarkable. It's a game-changer for our business.",
    image: "https://img.freepik.com/free-photo/portrait-man-doctor-with-stethoscope-lights_181624-15323.jpg",
    gradient: "from-purple-600 via-purple-600/80 to-transparent",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextTestimonial,
    onSwipedRight: prevTestimonial,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
      <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${testimonial.gradient} z-10`} />
      <img
        src={testimonial.image || "/placeholder.svg"}
        alt={testimonial.name}
        className="absolute inset-0 w-full h-full object-cover object-center-top rounded-xl z-0"
      />
      <div className="absolute inset-x-4 bottom-4 text-white z-20 flex flex-col justify-end">
        <QuoteIcon className="w-6 h-6 mb-2 opacity-75" />
        <p className="text-sm font-medium mb-2 leading-tight">{testimonial.content}</p>
        <div>
          <h3 className="text-base font-semibold">{testimonial.name}</h3>
          <p className="text-xs opacity-90">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          What Our Clients Say
        </motion.h2>
        {isMobile ? (
          <div className="relative max-w-md mx-auto" {...handlers}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white z-30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white z-30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}
        {isMobile && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

