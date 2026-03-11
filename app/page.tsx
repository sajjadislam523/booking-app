import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { services } from "@/lib/services";
import { Service } from "@/types";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-foreground" />
                        <span className="font-bold text-xl tracking-tight">
                            SwiftBook
                        </span>
                    </div>
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            Admin Panel <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <Badge
                    variant="secondary"
                    className="mb-6 text-xs tracking-widest uppercase"
                >
                    Professional Services
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
                    Book Services
                    <br />
                    <span className="text-muted-foreground">
                        Instantly Online
                    </span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                    Choose from our range of professional services, book
                    instantly, and pay securely with Stripe.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a href="#services">
                        <Button size="lg" className="rounded-full px-8">
                            Browse Services{" "}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </a>
                    <Link href="/admin">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8"
                        >
                            View Admin Panel
                        </Button>
                    </Link>
                </div>

                {/* Trust bar */}
                <div className="mt-16 flex items-center justify-center gap-8 flex-wrap text-muted-foreground text-sm">
                    {[
                        {
                            icon: <Shield className="w-4 h-4" />,
                            text: "Stripe Secured",
                        },
                        {
                            icon: <Zap className="w-4 h-4" />,
                            text: "Instant Confirmation",
                        },
                        {
                            icon: <Clock className="w-4 h-4" />,
                            text: "24/7 Availability",
                        },
                    ].map((item) => (
                        <div
                            key={item.text}
                            className="flex items-center gap-2"
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* Services */}
            <section id="services" className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground">
                        Everything you need, all in one place
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service: Service) => (
                        <Card
                            key={service.id}
                            className="group hover:border-foreground/50 transition-all duration-200 flex flex-col"
                        >
                            <CardHeader className="pb-3">
                                <div className="text-3xl mb-3">
                                    {service.icon}
                                </div>
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-lg leading-tight">
                                        {service.name}
                                    </h3>
                                    <Badge
                                        variant="secondary"
                                        className="shrink-0 text-xs"
                                    >
                                        <Clock className="w-3 h-3 mr-1" />
                                        {service.duration}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
                                <span className="font-bold text-2xl">
                                    ${service.price}
                                </span>
                                <Link href={`/book/${service.id}`}>
                                    <Button
                                        size="sm"
                                        className="rounded-full group-hover:gap-2 transition-all"
                                    >
                                        Book Now{" "}
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Separator />
            <footer className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold text-foreground">
                        SwiftBook
                    </span>
                </div>
                <p>© 2025 SwiftBook. All rights reserved.</p>
                <Link href="/admin">
                    <Button variant="ghost" size="sm">
                        Admin Panel
                    </Button>
                </Link>
            </footer>
        </main>
    );
}
