import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
    userName: string;
    userEmail: string;
    serviceName: string;
    servicePrice: number;
    date: string;
    time: string;
    status: "pending" | "paid" | "cancelled";
    stripeSessionId: string;
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending",
    },
    stripeSessionId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking ||
    mongoose.model<IBooking>("Booking", BookingSchema);
