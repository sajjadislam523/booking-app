import { AppError, handleApiError } from "@/lib/errors";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ bookings });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        console.error("Bookings API error:", message);
        return NextResponse.json({ error: message }, { status: statusCode });
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
            throw new AppError("Booking not found", 404);
        }

        return NextResponse.json({ booking });
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        console.error("Bookings API error:", message);
        return NextResponse.json({ error: message }, { status: statusCode });
    }
}
