"use client";

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
import Link from "next/link";
import { useEffect, useState } from "react";

type BookingStatus = "pending" | "paid" | "cancelled";

const statusStyles: Record<BookingStatus, string> = {
    paid: "bg-green-500/20 text-green-400 border-green-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusIcons: Record<BookingStatus, string> = {
    paid: "✅",
    pending: "⏳",
    cancelled: "❌",
};

export default function AdminPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | BookingStatus>("all");

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setBookings(data.bookings);
        } catch (err: any) {
            setError(err.message);
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
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setBookings((prev) =>
                prev.map((b) => (b._id === id ? { ...b, status } : b)),
            );
        } catch (err: any) {
            alert("Failed to update: " + err.message);
        } finally {
            setUpdating(null);
        }
    };

    const filtered =
        filter === "all"
            ? bookings
            : bookings.filter((b) => b.status === filter);

    // Stats
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
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="text-white font-bold text-xl">
                                DraSoft
                            </span>
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-purple-400 font-semibold">
                            Admin Panel
                        </span>
                    </div>
                    <button
                        onClick={fetchBookings}
                        className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-colors"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-white font-bold text-3xl mb-1">
                        Booking Management
                    </h1>
                    <p className="text-white/40">
                        View and manage all customer bookings
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {[
                        {
                            label: "Total Bookings",
                            value: stats.total,
                            icon: "📋",
                        },
                        { label: "Paid", value: stats.paid, icon: "✅" },
                        { label: "Pending", value: stats.pending, icon: "⏳" },
                        {
                            label: "Cancelled",
                            value: stats.cancelled,
                            icon: "❌",
                        },
                        {
                            label: "Total Revenue",
                            value: `$${stats.revenue}`,
                            icon: "💰",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                        >
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-white font-bold text-2xl">
                                {stat.value}
                            </div>
                            <div className="text-white/40 text-xs mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {(["all", "paid", "pending", "cancelled"] as const).map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                                    filter === tab
                                        ? "bg-purple-600 text-white"
                                        : "bg-white/5 text-white/50 hover:text-white border border-white/10"
                                }`}
                            >
                                {tab} {tab === "all" ? `(${stats.total})` : ""}
                            </button>
                        ),
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-white/40">Loading bookings...</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-6 py-4 text-red-400">
                        ⚠️ {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-white/40 text-lg">
                            No bookings found
                        </p>
                        <p className="text-white/20 text-sm mt-2">
                            {filter !== "all"
                                ? `No ${filter} bookings yet`
                                : "Bookings will appear here after payments"}
                        </p>
                    </div>
                )}

                {/* Bookings Table */}
                {!loading && filtered.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
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
                                                className="text-left px-6 py-4 text-white/40 text-sm font-semibold"
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
                                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                                                i === filtered.length - 1
                                                    ? "border-b-0"
                                                    : ""
                                            }`}
                                        >
                                            {/* Customer */}
                                            <td className="px-6 py-4">
                                                <p className="text-white font-semibold">
                                                    {booking.userName}
                                                </p>
                                                <p className="text-white/40 text-sm">
                                                    {booking.userEmail}
                                                </p>
                                            </td>

                                            {/* Service */}
                                            <td className="px-6 py-4">
                                                <p className="text-white">
                                                    {booking.serviceName}
                                                </p>
                                            </td>

                                            {/* Date & Time */}
                                            <td className="px-6 py-4">
                                                <p className="text-white">
                                                    {booking.date}
                                                </p>
                                                <p className="text-white/40 text-sm">
                                                    {booking.time}
                                                </p>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4">
                                                <p className="text-purple-400 font-bold">
                                                    ${booking.servicePrice}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                                                        statusStyles[
                                                            booking.status as BookingStatus
                                                        ]
                                                    }`}
                                                >
                                                    {
                                                        statusIcons[
                                                            booking.status as BookingStatus
                                                        ]
                                                    }
                                                    {booking.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {booking.status !==
                                                        "paid" && (
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    String(
                                                                        booking._id,
                                                                    ),
                                                                    "paid",
                                                                )
                                                            }
                                                            disabled={
                                                                updating ===
                                                                String(
                                                                    booking._id,
                                                                )
                                                            }
                                                            className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            Mark Paid
                                                        </button>
                                                    )}
                                                    {booking.status !==
                                                        "cancelled" && (
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    String(
                                                                        booking._id,
                                                                    ),
                                                                    "cancelled",
                                                                )
                                                            }
                                                            disabled={
                                                                updating ===
                                                                String(
                                                                    booking._id,
                                                                )
                                                            }
                                                            className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    {booking.status !==
                                                        "pending" && (
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    String(
                                                                        booking._id,
                                                                    ),
                                                                    "pending",
                                                                )
                                                            }
                                                            disabled={
                                                                updating ===
                                                                String(
                                                                    booking._id,
                                                                )
                                                            }
                                                            className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            Pending
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
