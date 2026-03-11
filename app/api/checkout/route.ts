import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            serviceId,
            serviceName,
            servicePrice,
            userName,
            userEmail,
            date,
            time,
        } = body;

        // Validate required fields
        if (
            !serviceId ||
            !serviceName ||
            !servicePrice ||
            !userName ||
            !userEmail ||
            !date ||
            !time
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: userEmail,
            metadata: {
                serviceId,
                serviceName,
                servicePrice: String(servicePrice),
                userName,
                userEmail,
                date,
                time,
            },
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: serviceName,
                            description: `Booking for ${serviceName} on ${date} at ${time}`,
                        },
                        unit_amount: Math.round(servicePrice * 100), // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/${serviceId}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
