import { StripeMode } from "./types";

// Dub
export const DUB_CLIENT_ID =
  "dub_app_517290377fe6b4dfcc8726a7061ba9b6da1c4d7d7d75f77a";
export const DUB_HOST = "https://app.pimms.io";
export const DUB_API_HOST = "https://api.pimms.io";

// Stripe
export const STRIPE_MODE: StripeMode = "live";
export const STRIPE_REDIRECT_URL = `https://dashboard.stripe.com/${STRIPE_MODE === "live" ? "" : "test/"}apps-oauth/pimms.io`;
