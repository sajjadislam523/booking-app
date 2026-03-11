"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getErrorMessage } from "@/lib/errors";
import {
    ArrowLeft,
    BookCheck,
    CheckCircle2,
    Clock,
    DollarSign,
    Loader2,
    RefreshCw,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = {
    _id: string;
    userName: string;
    userEmail: string;
    serviceName: string;
    servicePrice: number;
    date: string;
    time: string;
    status: "pending" | "paid" | "cancelled";
    stripeSessionId: string;
    createdAt: string;
};

type BookingStatus = Booking["status"];

const statusConfig: Record<
    BookingStatus,
    {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline";
    }
> = {
    paid: { label: "Paid", variant: "default" },
    pending: { label: "Pending", variant: "secondary" },
    cancelled: { label: "Cancelled", variant: "destructive" },
};

export default function AdminPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | BookingStatus>("all");

    const fetchBookings = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/bookings");
            const data: { bookings?: Booking[]; error?: string } =
                await res.json();
            if (!res.ok) throw new Error(data.error ?? "Failed to fetch");
            setBookings(data.bookings ?? []);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: BookingStatus) => {
        setUpdating(id);
        try {
            const res = await fetch("/api/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            const data: { booking?: Booking; error?: string } =
                await res.json();
            if (!res.ok) throw new Error(data.error ?? "Failed to update");
            setBookings((prev) =>
                prev.map((b) => (b._id === id ? { ...b, status } : b)),
            );
        } catch (err) {
            alert(getErrorMessage(err));
        } finally {
            setUpdating(null);
        }
    };

    const filtered =
        filter === "all"
            ? bookings
            : bookings.filter((b) => b.status === filter);

    const stats = {
        total: bookings.length,
        paid: bookings.filter((b) => b.status === "paid").length,
        pending: bookings.filter((b) => b.status === "pending").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
        revenue: bookings
            .filter((b) => b.status === "paid")
            .reduce((sum, b) => sum + b.servicePrice, 0),
    };

    return (
        <main className="min-h-screen ">
            <AnimatedBackground />
            {/* Header */}
            <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-supports-backdrop-filter:bg-background/60">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" /> SwiftBook
                            </Button>
                        </Link>
                        <Separator orientation="vertical" className="h-5" />
                        <span className="font-semibold text-sm">
                            Admin Panel
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchBookings}
                            disabled={loading}
                            className="rounded-full"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <RefreshCw className="w-4 h-4 mr-2" />
                            )}
                            Refresh
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Booking Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage all customer bookings
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        {
                            label: "Total Bookings",
                            value: stats.total,
                            icon: <BookCheck className="w-4 h-4" />,
                        },
                        {
                            label: "Paid",
                            value: stats.paid,
                            icon: <CheckCircle2 className="w-4 h-4" />,
                        },
                        {
                            label: "Pending",
                            value: stats.pending,
                            icon: <Clock className="w-4 h-4" />,
                        },
                        {
                            label: "Cancelled",
                            value: stats.cancelled,
                            icon: <XCircle className="w-4 h-4" />,
                        },
                        {
                            label: "Revenue",
                            value: `$${stats.revenue}`,
                            icon: <DollarSign className="w-4 h-4" />,
                        },
                    ].map((stat) => (
                        <Card key={stat.label}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="text-xs">
                                        {stat.label}
                                    </span>
                                    {stat.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {(["all", "paid", "pending", "cancelled"] as const).map(
                        (tab) => (
                            <Button
                                key={tab}
                                variant={filter === tab ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter(tab)}
                                className="capitalize"
                            >
                                {tab}
                                <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                >
                                    {tab === "all"
                                        ? stats.total
                                        : tab === "paid"
                                          ? stats.paid
                                          : tab === "pending"
                                            ? stats.pending
                                            : stats.cancelled}
                                </Badge>
                            </Button>
                        ),
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading bookings...</span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3">
                        <XCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <BookCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="font-medium">No bookings found</p>
                        <p className="text-sm mt-1">
                            {filter !== "all"
                                ? `No ${filter} bookings yet`
                                : "Bookings will appear here after payments"}
                        </p>
                    </div>
                )}

                {/* Table */}
                {!loading && filtered.length > 0 && (
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        {[
                                            "Customer",
                                            "Service",
                                            "Date & Time",
                                            "Amount",
                                            "Status",
                                            "Actions",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="text-left px-6 py-4 text-muted-foreground font-medium text-xs uppercase tracking-wider"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((booking, i) => (
                                        <tr
                                            key={booking._id}
                                            className={`hover:bg-muted/50 transition-colors ${
                                                i !== filtered.length - 1
                                                    ? "border-b border-border"
                                                    : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium">
                                                    {booking.userName}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    {booking.userEmail}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium">
                                                    {booking.serviceName}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p>{booking.date}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {booking.time}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold">
                                                    ${booking.servicePrice}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={
                                                        statusConfig[
                                                            booking.status as BookingStatus
                                                        ].variant
                                                    }
                                                >
                                                    {
                                                        statusConfig[
                                                            booking.status as BookingStatus
                                                        ].label
                                                    }
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 flex-wrap">
                                                    {booking.status !==
                                                        "paid" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            disabled={
                                                                updating ===
                                                                booking._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    booking._id,
                                                                    "paid",
                                                                )
                                                            }
                                                            className="text-xs h-7"
                                                        >
                                                            {updating ===
                                                            booking._id ? (
                                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                            ) : (
                                                                "Mark Paid"
                                                            )}
                                                        </Button>
                                                    )}
                                                    {booking.status !==
                                                        "cancelled" && (
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            disabled={
                                                                updating ===
                                                                booking._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    booking._id,
                                                                    "cancelled",
                                                                )
                                                            }
                                                            className="text-xs h-7"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    {booking.status !==
                                                        "pending" && (
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            disabled={
                                                                updating ===
                                                                booking._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    booking._id,
                                                                    "pending",
                                                                )
                                                            }
                                                            className="text-xs h-7"
                                                        >
                                                            Pending
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </main>
    );
}
