import { auth } from '@/auth';
import { prisma } from '@/prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function OrdersHistoryPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=%2Forders');
  }

  const orders = await prisma.order.findMany({
    where: { email: session.user.email },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Order History</h1>
            <p className="mt-1 text-stone-600">All your payment and purchase details are listed here.</p>
          </div>
          <Link href="/paintings">
            <Button intent="art">Shop More</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border border-stone-200 bg-white p-8 text-center">
            <p className="text-stone-600">No orders found yet.</p>
            <Link href="/paintings" className="mt-4 inline-block">
              <Button variant="outline">Browse Paintings</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const itemMeta = (order.items as Record<string, unknown>) || {};
              const paymentMeta =
                typeof itemMeta.payment === 'object' && itemMeta.payment !== null
                  ? (itemMeta.payment as Record<string, unknown>)
                  : {};
              const cartItems = Array.isArray(itemMeta.cartItems)
                ? (itemMeta.cartItems as Array<{ title?: string; quantity?: number; price?: number }>)
                : [];

              return (
                <div key={order.id} className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-stone-500">Order ID: {order.id}</p>
                      <p className="text-sm text-stone-500">
                        Date: {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <p>
                      <span className="font-medium text-stone-800">Name:</span> {order.name}
                    </p>
                    <p>
                      <span className="font-medium text-stone-800">Email:</span> {order.email}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-medium text-stone-800">Address:</span> {order.address}
                    </p>
                    <p>
                      <span className="font-medium text-stone-800">Total:</span> {order.total.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium text-stone-800">Payment Method:</span>{' '}
                      {(paymentMeta.method as string) || 'N/A'}
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

                  {cartItems.length > 0 && (
                    <div className="mt-4 border-t border-stone-100 pt-4">
                      <p className="mb-2 text-sm font-medium text-stone-800">Items:</p>
                      <div className="space-y-1 text-sm text-stone-600">
                        {cartItems.map((item, index) => (
                          <p key={`${order.id}-${index}`}>
                            {item.title || 'Painting'} x {item.quantity || 1}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
