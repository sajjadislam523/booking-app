import { cn } from "@/lib/utils";
import { AlertCircle, XCircle } from "lucide-react";

type ErrorVariant = "default" | "destructive";

interface ErrorMessageProps {
    message: string;
    variant?: ErrorVariant;
    className?: string;
}

export function ErrorMessage({
    message,
    variant = "default",
    className,
}: ErrorMessageProps) {
    const styles: Record<ErrorVariant, string> = {
        default: "bg-destructive/10 border-destructive/20 text-destructive",
        destructive: "bg-red-500/10 border-red-500/20 text-red-500",
    };

    const Icon = variant === "destructive" ? XCircle : AlertCircle;

    return (
        <div
            className={cn(
                "flex items-center gap-2 text-sm border rounded-lg px-4 py-3",
                styles[variant],
                className,
            )}
        >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{message}</span>
        </div>
    );
}
