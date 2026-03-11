import Link from "next/link";

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-white font-bold text-3xl mb-3">
                        Booking Confirmed!
                    </h1>
                    <p className="text-white/50 mb-6 leading-relaxed">
                        Your payment was successful. A confirmation email has
                        been sent to your inbox with all booking details.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left space-y-2">
                        <p className="text-white/40 text-sm">
                            ✅ Payment received
                        </p>
                        <p className="text-white/40 text-sm">
                            ✅ Booking confirmed
                        </p>
                        <p className="text-white/40 text-sm">
                            ✅ Confirmation email sent
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 block"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
