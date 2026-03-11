import { services } from "@/lib/services";
import { Service } from "@/types";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
            <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span className="text-white font-bold text-xl">
                            DraSoft Services
                        </span>
                    </div>
                    <Link
                        href="/admin"
                        className="text-sm text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg"
                    >
                        Admin Panel →
                    </Link>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Book Professional
                    <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Services
                    </span>
                    Online
                </h1>
                <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10">
                    Choose from our range of professional services, book
                    instantly, and pay securely with Stripe.
                </p>

                <a
                    href="#services"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 inline-block"
                >
                    Browse Services
                </a>
            </section>
            <section id="services" className="max-w-7xl mx-auto px-6 pb-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service: Service) => (
                        <div
                            key={service.id}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-white font-bold text-xl mb-2">
                                {service.name}
                            </h3>
                            <p className="text-white/50 text-sm mb-4 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <span className="text-purple-400 font-bold text-2xl">
                                        ${service.price}
                                    </span>
                                </div>
                                <span className="text-white/40 text-sm bg-white/5 px-3 py-1 rounded-full">
                                    ⏱ {service.duration}
                                </span>
                            </div>
                            <Link
                                href={`/book/${service.id}`}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all group-hover:scale-105 text-center block"
                            >
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="border-t border-white/10 text-center py-8 text-white/30 text-sm">
                © 2025 DraSoft Services. All rights reserved.
            </footer>
        </main>
    );
}
