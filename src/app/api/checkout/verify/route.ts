import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerifyPayload {
  internalOrderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  paymentMethod: 'upi' | 'credit' | 'debit';
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: 'Missing Razorpay secret key' }, { status: 500 });
  }

  const body = (await req.json()) as VerifyPayload;
  const {
    internalOrderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentMethod,
  } = body;

  if (!internalOrderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing payment verification details' }, { status: 400 });
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    await prisma.order.updateMany({
      where: { id: internalOrderId, email: session.user.email },
      data: { status: 'failed' },
    });

    return NextResponse.json({ error: 'Payment signature verification failed' }, { status: 400 });
  }

  const existingOrder = await prisma.order.findFirst({
    where: { id: internalOrderId, email: session.user.email },
  });

  if (!existingOrder) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const existingItems = (existingOrder.items as Record<string, unknown>) || {};
  const existingPayment =
    typeof existingItems.payment === 'object' && existingItems.payment !== null
      ? (existingItems.payment as Record<string, unknown>)
      : {};

  const updatedItems = {
    ...existingItems,
    payment: {
      ...existingPayment,
      method: paymentMethod,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentProof: razorpay_payment_id,
      paidAt: new Date().toISOString(),
      trackingId: null, // placeholder for future tracking id integration
    },
  };

  await prisma.order.update({
    where: { id: internalOrderId },
    data: {
      status: 'paid',
      items: updatedItems,
    },
  });

  return NextResponse.json({ success: true, orderId: internalOrderId });
}
