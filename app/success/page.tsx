import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Mail, Zap } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-6">
            {/* Aurora */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="aurora-1 absolute top-0 left-1/4 w-125 h-125 rounded-full bg-linear-to-br from-zinc-300/20 to-transparent dark:from-zinc-700/30 dark:to-transparent blur-3xl" />
            </div>

            {/* Mode toggle top right */}
            <div className="fixed top-4 right-6 z-50">
                <ModeToggle />
            </div>

            <div className="relative max-w-sm w-full animate-fade-in-up">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-10">
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

                <div className="bg-card border border-border/60 rounded-2xl p-8 text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full border border-border/60 bg-background flex items-center justify-center">
                            <CheckCircle2 className="w-7 h-7 text-foreground" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1
                            className="text-2xl font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Booking Confirmed
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Payment successful. A confirmation email has been
                            sent with your booking details.
                        </p>
                    </div>

                    <Separator className="opacity-50" />

                    <div className="space-y-2.5 text-left">
                        {[
                            "Payment received & verified",
                            "Booking confirmed in system",
                            "Confirmation email sent",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <CheckCircle2 className="w-3.5 h-3.5 text-foreground shrink-0" />
                                <span className="text-muted-foreground text-sm">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Check your inbox for the confirmation</span>
                    </div>

                    <Link href="/" className="block">
                        <Button className="w-full rounded-xl h-11 text-sm">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
