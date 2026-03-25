import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface CheckoutItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutPayload {
  items: CheckoutItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    currency: string;
  };
  paymentMethod: 'upi' | 'credit' | 'debit';
}

async function getUsdRateForCurrency(currency: string): Promise<number> {
  if (currency === 'USD') return 1;

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      cache: 'no-store',
    });

    if (!response.ok) return 1;
    const data = await response.json();
    const rate = data?.rates?.[currency];
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) return 1;
    return rate;
  } catch {
    return 1;
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay keys are missing. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' },
      { status: 500 }
    );
  }

  const body = (await req.json()) as CheckoutPayload;
  const { items, customer, paymentMethod } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
    return NextResponse.json({ error: 'Missing customer details' }, { status: 400 });
  }

  const currency = (customer.currency || 'INR').toUpperCase();
  const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fxRate = await getUsdRateForCurrency(currency);
  const convertedTotal = subtotalUSD * fxRate;
  const amount = Math.max(100, Math.round(convertedTotal * 100));

  const internalOrderId = crypto.randomUUID();
  const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt: internalOrderId,
      notes: {
        internalOrderId,
        customerEmail: customer.email,
      },
    }),
    cache: 'no-store',
  });

  const razorpayData = await razorpayResponse.json();
  if (!razorpayResponse.ok || !razorpayData?.id) {
    return NextResponse.json(
      { error: razorpayData?.error?.description || 'Failed to create Razorpay order' },
      { status: 502 }
    );
  }

  await prisma.order.create({
    data: {
      id: internalOrderId,
      email: session.user.email,
      name: customer.name,
      address: customer.address,
      total: convertedTotal,
      status: 'pending',
      items: {
        cartItems: items,
        currency,
        country: customer.country,
        fxRate,
        payment: {
          method: paymentMethod,
          razorpayOrderId: razorpayData.id,
          paymentProof: null,
          trackingId: null,
        },
      },
    },
  });

  return NextResponse.json({
    key: keyId,
    razorpayOrderId: razorpayData.id,
    internalOrderId,
    amount,
    currency,
  });
}
