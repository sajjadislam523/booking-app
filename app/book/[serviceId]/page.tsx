"use client";

import { services } from "@/lib/services";
import { BookingFormData } from "@/types";
import Link from "next/link";
import { use, useState } from "react";

export default function BookingPage({
    params,
}: {
    params: Promise<{ serviceId: string }>;
}) {
    // Unwrap params with React.use()
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
            <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-2xl mb-4">
                        Service not found
                    </p>
                    <Link href="/" className="text-purple-400 hover:underline">
                        Go back home
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

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            window.location.href = data.url;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
            <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span className="text-white font-bold text-xl">
                            DraSoft Services
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        ← Back to Services
                    </Link>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Service Summary */}
                <div>
                    <p className="text-purple-400 font-semibold mb-3 uppercase tracking-widest text-sm">
                        {"You're booking"}
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="text-6xl mb-6">{service.icon}</div>
                        <h1 className="text-white font-bold text-3xl mb-3">
                            {service.name}
                        </h1>
                        <p className="text-white/50 leading-relaxed mb-6">
                            {service.description}
                        </p>
                        <div className="border-t border-white/10 pt-6 space-y-3">
                            <div className="flex justify-between text-white/60">
                                <span>Duration</span>
                                <span className="text-white">
                                    {service.duration}
                                </span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Price</span>
                                <span className="text-purple-400 font-bold text-xl">
                                    ${service.price}
                                </span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Payment</span>
                                <span className="text-white">
                                    Secured by Stripe
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {[
                            { icon: "🔒", text: "Secure Payment" },
                            { icon: "✅", text: "Instant Confirm" },
                            { icon: "📧", text: "Email Receipt" },
                        ].map((badge) => (
                            <div
                                key={badge.text}
                                className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                            >
                                <div className="text-xl mb-1">{badge.icon}</div>
                                <div className="text-white/50 text-xs">
                                    {badge.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div>
                    <p className="text-purple-400 font-semibold mb-3 uppercase tracking-widest text-sm">
                        Your Details
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
                        <div>
                            <label className="text-white/70 text-sm mb-2 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={form.userName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-white/70 text-sm mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                value={form.userEmail}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-white/70 text-sm mb-2 block">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={today}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors scheme-dark"
                            />
                        </div>
                        <div>
                            <label className="text-white/70 text-sm mb-2 block">
                                Preferred Time
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors scheme-dark"
                            />
                        </div>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                ⚠️ {error}
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Redirecting to Stripe...
                                </span>
                            ) : (
                                `Pay $${service.price} → Checkout`
                            )}
                        </button>
                        <p className="text-white/30 text-xs text-center">
                            {
                                "You'll be redirected to Stripe's secure checkout page"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
