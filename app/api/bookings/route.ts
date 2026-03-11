import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ bookings });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// Update booking status
export async function PATCH(req: Request) {
    try {
        await connectDB();
        const { id, status } = await req.json();

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true },
        );

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ booking });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
