import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";
import { Functionalities } from "@/components/functionalities";
import { Testimonials } from "@/components/testimonials";
import { TryItNow } from "@/components/try-it-now";
import { UseCases } from "@/components/use-cases";
import { CallToAction } from "@/components/call-to-action";

export default function Home() {
    return (
        <>
            <Hero />
            <TrustedBy />
            <Functionalities />
            <Testimonials />
            <TryItNow />
            <UseCases />
            <CallToAction />
        </>
    );
}
