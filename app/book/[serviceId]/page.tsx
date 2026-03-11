"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getErrorMessage } from "@/lib/errors";
import { services } from "@/lib/services";
import { BookingFormData } from "@/types";
import {
    AlertCircle,
    ArrowLeft,
    Clock,
    Loader2,
    Lock,
    Mail,
    Zap,
} from "lucide-react";
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
                    <p className="text-2xl font-semibold">Service not found</p>
                    <Link href="/">
                        <Button variant="outline">
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
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur `supports-backdrop-filter:bg-background/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold text-xl tracking-tight">
                            SwiftBook
                        </span>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to
                            Services
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Service Summary */}
                <div className="space-y-6">
                    <div>
                        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">
                            {"You're booking"}
                        </p>
                        <Card>
                            <CardHeader>
                                <div className="text-4xl mb-2">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-2xl">
                                    {service.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <Separator />
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Clock className="w-4 h-4" />{" "}
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
                                        <span className="font-bold text-2xl">
                                            ${service.price}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> Payment
                                        </span>
                                        <Badge variant="secondary">
                                            Secured by Stripe
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {
                                icon: <Lock className="w-4 h-4" />,
                                text: "Secure Payment",
                            },
                            {
                                icon: <Zap className="w-4 h-4" />,
                                text: "Instant Confirm",
                            },
                            {
                                icon: <Mail className="w-4 h-4" />,
                                text: "Email Receipt",
                            },
                        ].map((badge) => (
                            <Card key={badge.text} className="p-3 text-center">
                                <div className="flex justify-center mb-1 text-muted-foreground">
                                    {badge.icon}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {badge.text}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Your Details
                    </p>
                    <Card>
                        <CardContent className="pt-6 space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="userName">Full Name</Label>
                                <Input
                                    id="userName"
                                    name="userName"
                                    value={form.userName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userEmail">Email Address</Label>
                                <Input
                                    id="userEmail"
                                    name="userEmail"
                                    type="email"
                                    value={form.userEmail}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Preferred Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    min={today}
                                    className="scheme-dark"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time">Preferred Time</Label>
                                <Input
                                    id="time"
                                    name="time"
                                    type="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className="scheme-dark"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Redirecting to Stripe...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4 mr-2" />
                                        Pay ${service.price} → Checkout
                                    </>
                                )}
                            </Button>

                            <p className="text-muted-foreground text-xs text-center">
                                {
                                    "You'll be redirected to Stripe's secure checkout page"
                                }
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
