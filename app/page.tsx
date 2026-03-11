import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { services } from "@/lib/services";
import { Service } from "@/types";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen ">
            <AnimatedBackground />

            {/* Header */}
            <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-supports-backdrop-filter:bg-background/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-background" />
                        </div>
                        <span
                            className="font-bold text-xl tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            SwiftBook
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                Admin
                            </Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">
                <div className="animate-fade-in-up">
                    <Badge
                        variant="outline"
                        className="mb-8 px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-medium border-border/60"
                    >
                        Professional Services Platform
                    </Badge>
                </div>

                <h1
                    className="animate-fade-in-up delay-100 text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[0.95]"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    Book Any
                    <br />
                    <span className="text-muted-foreground">
                        Service Online
                    </span>
                </h1>

                <p className="animate-fade-in-up delay-200 text-muted-foreground text-lg max-w-lg mx-auto mb-10 leading-relaxed font-light">
                    Choose from professional services, book instantly, and pay
                    securely with Stripe. Confirmation straight to your inbox.
                </p>

                <div className="animate-fade-in-up delay-300 flex items-center justify-center gap-4 flex-wrap">
                    <a href="#services">
                        <Button
                            size="lg"
                            className="rounded-full px-8 h-12 text-sm font-medium cursor-pointer"
                        >
                            Browse Services{" "}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                    <Link href="/admin">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 h-12 text-sm font-medium border-border/60 cursor-pointer"
                        >
                            Admin Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Trust bar */}
                <div className="animate-fade-in-up delay-400 mt-16 flex items-center justify-center gap-10 flex-wrap">
                    {[
                        {
                            icon: <Shield className="w-3.5 h-3.5" />,
                            text: "Stripe Secured",
                        },
                        {
                            icon: <Zap className="w-3.5 h-3.5" />,
                            text: "Instant Confirmation",
                        },
                        {
                            icon: <Clock className="w-3.5 h-3.5" />,
                            text: "24/7 Availability",
                        },
                    ].map((item) => (
                        <div
                            key={item.text}
                            className="flex items-center gap-2 text-muted-foreground text-sm"
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Separator className="opacity-50" />

            {/* Services */}
            <section
                id="services"
                className="relative max-w-7xl mx-auto px-6 py-24"
            >
                <div className="mb-16">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 font-medium">
                        What We Offer
                    </p>
                    <h2
                        className="text-4xl font-bold tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Our Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service: Service, i: number) => (
                        <div
                            key={service.id}
                            className={`card-hover animate-fade-in-up delay-${((i % 5) + 1) * 100} group relative bg-card border border-border/60 rounded-2xl p-6 flex flex-col`}
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between mb-5">
                                <div className="text-3xl">{service.icon}</div>
                                <Badge
                                    variant="secondary"
                                    className="text-xs font-normal text-muted-foreground"
                                >
                                    <Clock className="w-3 h-3 mr-1" />
                                    {service.duration}
                                </Badge>
                            </div>

                            {/* Content */}
                            <h3
                                className="font-bold text-lg mb-2 tracking-tight"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {service.name}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                                {service.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
                                <span
                                    className="font-bold text-2xl"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    ${service.price}
                                </span>
                                <Link href={`/book/${service.id}`}>
                                    <Button
                                        size="sm"
                                        className="rounded-full text-xs px-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 cursor-pointer"
                                    >
                                        Book Now
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Separator className="opacity-50" />
            <footer className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-background" />
                    </div>
                    <span
                        className="font-bold text-sm"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        SwiftBook
                    </span>
                </div>
                <p className="text-muted-foreground text-xs">
                    © 2025 SwiftBook. All rights reserved.
                </p>
                <ModeToggle />
            </footer>
        </main>
    );
}
