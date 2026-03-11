"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getErrorMessage } from "@/lib/errors";
import { services } from "@/lib/services";
import { BookingFormData } from "@/types";
import { ArrowLeft, Clock, Loader2, Lock, Mail, Zap } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

export default function BookingPage({
    params,
}: {
    params: Promise<{ serviceId: string }>;
}) {
    const { serviceId } = use(params);
    const service = services.find((s) => s.id === serviceId);

    const [form, setForm] = useState<BookingFormData>({
        userName: "",
        userEmail: "",
        date: "",
        time: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!service) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Service not found
                    </p>
                    <Link href="/">
                        <Button variant="outline" className="rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.userName || !form.userEmail || !form.date || !form.time) {
            setError("Please fill in all fields.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceId: service.id,
                    serviceName: service.name,
                    servicePrice: service.price,
                    ...form,
                }),
            });

            const data: { url?: string; error?: string } = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Something went wrong");
            if (data.url) window.location.href = data.url;
        } catch (err) {
            setError(getErrorMessage(err));
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <main className="min-h-screen overflow-hidden">
            <AnimatedBackground />

            {/* Header */}
            <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-background" />
                        </div>
                        <span
                            className="font-bold text-xl tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            SwiftBook
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground rounded-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Services
                            </Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <div className="relative max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Service Summary */}
                <div className="space-y-5 animate-fade-in-up">
                    <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">
                            {"You're booking"}
                        </p>
                        <div className="bg-card border border-border/60 rounded-2xl p-7 space-y-5">
                            <div className="text-4xl">{service.icon}</div>
                            <div>
                                <h1
                                    className="text-2xl font-bold tracking-tight mb-1"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {service.name}
                                </h1>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <Separator className="opacity-50" />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5" />{" "}
                                        Duration
                                    </span>
                                    <span className="font-medium">
                                        {service.duration}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">
                                        Price
                                    </span>
                                    <span
                                        className="font-bold text-2xl"
                                        style={{
                                            fontFamily: "var(--font-syne)",
                                        }}
                                    >
                                        ${service.price}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Lock className="w-3.5 h-3.5" /> Payment
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs font-normal"
                                    >
                                        Secured by Stripe
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {
                                icon: <Lock className="w-3.5 h-3.5" />,
                                text: "Secure",
                            },
                            {
                                icon: <Zap className="w-3.5 h-3.5" />,
                                text: "Instant",
                            },
                            {
                                icon: <Mail className="w-3.5 h-3.5" />,
                                text: "Receipt",
                            },
                        ].map((badge) => (
                            <div
                                key={badge.text}
                                className="bg-card border border-border/60 rounded-xl p-3 text-center"
                            >
                                <div className="flex justify-center mb-1.5 text-muted-foreground">
                                    {badge.icon}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {badge.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4 animate-fade-in-up delay-100">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                        Your Details
                    </p>
                    <div className="bg-card border border-border/60 rounded-2xl p-7 space-y-5">
                        <div className="space-y-2">
                            <Label
                                htmlFor="userName"
                                className="text-sm font-medium"
                            >
                                Full Name
                            </Label>
                            <Input
                                id="userName"
                                name="userName"
                                value={form.userName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="h-11 rounded-xl border-border/60 bg-background/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="userEmail"
                                className="text-sm font-medium"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                value={form.userEmail}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="h-11 rounded-xl border-border/60 bg-background/50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="date"
                                    className="text-sm font-medium"
                                >
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    min={today}
                                    className="h-11 rounded-xl border-border/60 bg-background/50 scheme-dark"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="time"
                                    className="text-sm font-medium"
                                >
                                    Time
                                </Label>
                                <Input
                                    id="time"
                                    name="time"
                                    type="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl border-border/60 bg-background/50 scheme-dark"
                                />
                            </div>
                        </div>

                        {error && <ErrorMessage message={error} />}

                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-sm font-medium"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Redirecting to Stripe...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Pay ${service.price} · Secure Checkout
                                </>
                            )}
                        </Button>

                        <p className="text-muted-foreground text-xs text-center">
                            {"Redirected to Stripe's encrypted checkout"}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
