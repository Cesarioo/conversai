import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Support?</h2>
        <p className="text-xl mb-8">Get in touch to learn how our AI solution can revolutionize your business.</p>
        <Button size="lg" variant="secondary" asChild>
          <a href="mailto:corenthin@conversai.fr">Contact Us</a>
        </Button>
      </div>
    </section>
  )
}

