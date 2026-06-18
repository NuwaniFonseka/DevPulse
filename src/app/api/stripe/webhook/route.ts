import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

// Tell Next.js NOT to parse the body — Stripe needs the raw bytes to verify the signature
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Stripe verifies the payload was really sent by Stripe, not a fake request
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the events we care about
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.CheckoutSession;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (userId && subscriptionId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionId,
            subscriptionStatus: "active",
          },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.update({
        where: { subscriptionId: subscription.id },
        data: { subscriptionStatus: subscription.status },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.update({
        where: { subscriptionId: subscription.id },
        data: {
          subscriptionStatus: "canceled",
          subscriptionId: null,
        },
      });
      break;
    }
  }

  // Always return 200 — if you return an error, Stripe retries for 72 hours
  return NextResponse.json({ received: true });
}
