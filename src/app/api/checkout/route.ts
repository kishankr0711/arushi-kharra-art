import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const { items } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // cents
      },
      quantity: 1,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  return NextResponse.json({ sessionId: session.id });
}
