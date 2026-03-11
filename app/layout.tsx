import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "SwiftBook — Fast & Secure Service Booking",
    description:
        "Book professional services instantly and pay securely online.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-background`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
