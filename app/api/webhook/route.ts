import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";

import { handleApiError } from "@/lib/errors";
import { transporter } from "@/lib/mailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    } catch (error) {
        const { message, statusCode } = handleApiError(error);
        console.error("Stripe checkout error:", message);
        return NextResponse.json({ error: message }, { status: statusCode });
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata!;

        try {
            await connectDB();

            // Save booking to MongoDB
            const booking = await Booking.create({
                userName: meta.userName,
                userEmail: meta.userEmail,
                serviceName: meta.serviceName,
                servicePrice: Number(meta.servicePrice),
                date: meta.date,
                time: meta.time,
                status: "paid",
                stripeSessionId: session.id,
            });

            console.log("Booking saved:", booking._id);

            // Send confirmation email
            await transporter.sendMail({
                from: `"SwiftBook Services" <${process.env.GMAIL_USER}>`,
                to: meta.userEmail, // ✅ Now sends to ANY email!
                subject: `Booking Confirmed — ${meta.serviceName}`,
                html: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 40px 0;">
        <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">⚡ SwiftBook</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Booking Confirmation</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <p style="color: #16a34a; font-weight: bold; font-size: 18px; margin: 0;">✅ Payment Successful!</p>
            </div>

            <p style="color: #374151; font-size: 16px;">Hi <strong>${meta.userName}</strong>,</p>
            <p style="color: #6b7280;">Your booking has been confirmed. Here are your booking details:</p>

            <!-- Booking Details -->
            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: bold; text-align: right;">${meta.serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Date</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: bold; text-align: right; border-top: 1px solid #e5e7eb;">${meta.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Time</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: bold; text-align: right; border-top: 1px solid #e5e7eb;">${meta.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Amount Paid</td>
                  <td style="padding: 8px 0; color: #7c3aed; font-weight: bold; font-size: 18px; text-align: right; border-top: 1px solid #e5e7eb;">$${meta.servicePrice}</td>
                </tr>
              </table>
            </div>

            <p style="color: #6b7280; font-size: 14px;">Our team will reach out to you shortly to get started. If you have any questions, feel free to reply to this email.</p>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 SwiftBook. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,
            });

            console.log("Confirmation email sent to:", meta.userEmail);
        } catch (err) {
            console.error("Error saving booking or sending email:", err);
        }
    }

    return NextResponse.json({ received: true });
}
