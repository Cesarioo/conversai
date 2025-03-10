import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ConversAI - AI-Powered Customer Support",
    description: "Revolutionize your customer support with AI voice agents",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </>
            </body>
        </html>
    );
}
