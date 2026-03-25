import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect('/login?callbackUrl=%2Fcheckout%2Fsuccess');

  const { orderId } = await searchParams;
  if (!orderId) redirect('/orders');

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      email: session.user.email,
    },
  });

  if (!order) {
    redirect('/orders');
  }

  const itemMeta = (order.items as Record<string, unknown>) || {};
  const paymentMeta =
    typeof itemMeta.payment === 'object' && itemMeta.payment !== null
      ? (itemMeta.payment as Record<string, unknown>)
      : {};

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-stone-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Payment Successful</h1>
          <p className="mt-2 text-stone-600">
            Thank you! Your order has been placed successfully.
          </p>

          <div className="mt-6 space-y-3 rounded-md bg-stone-50 p-4 text-sm">
            <p>
              <span className="font-medium text-stone-800">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-medium text-stone-800">Status:</span> {order.status}
            </p>
            <p>
              <span className="font-medium text-stone-800">Amount Paid:</span> {order.total.toFixed(2)}
            </p>
            <p>
              <span className="font-medium text-stone-800">Payment Proof:</span>{' '}
              {(paymentMeta.paymentProof as string) || 'Pending'}
            </p>
            <p>
              <span className="font-medium text-stone-800">Tracking ID:</span>{' '}
              {(paymentMeta.trackingId as string) || 'To be added'}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/orders" className="w-full sm:w-auto">
              <Button intent="art" className="w-full">
                View Order History
              </Button>
            </Link>
            <Link href="/paintings" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
