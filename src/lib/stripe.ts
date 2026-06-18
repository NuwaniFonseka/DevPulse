import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export const PLANS = {
  FREE: {
    name: "Starter",
    digests: 1,
    frequency: "weekly",
  },
  PRO: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    digests: 5,
    frequency: "daily",
    amount: 900, // $9.00 in cents
  },
};
