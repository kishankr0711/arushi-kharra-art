'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-store';
import { useCurrency } from '@/lib/use-currency';
import { ArrowLeft, CreditCard, Landmark, Smartphone } from 'lucide-react';
import CountryCurrencySelector from '@/components/checkout/CountryCurrencySelector';

type PaymentMethod = 'upi' | 'credit' | 'debit';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const {
    country,
    currency,
    countryCurrencyOptions,
    setCountryCurrency,
    convertFromUSD,
    formatCurrency,
  } = useCurrency();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const totalInSelectedCurrency = useMemo(
    () => convertFromUSD(getTotalPrice()),
    [convertFromUSD, getTotalPrice]
  );

  useEffect(() => {
    const scriptId = 'razorpay-checkout-js';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const beginPayment = async () => {
    if (items.length === 0) return;
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert('Please fill all customer details before proceeding.');
      return;
    }

    setLoading(true);

    try {
      const createOrderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            ...customer,
            country,
            currency,
          },
          paymentMethod,
        }),
      });

      const createOrderData = await createOrderRes.json();
      if (!createOrderRes.ok) {
        throw new Error(createOrderData?.error || 'Failed to create order');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh and try again.');
      }

      const options = {
        key: createOrderData.key,
        amount: createOrderData.amount,
        currency: createOrderData.currency,
        name: 'Arushi Kharra Art Shop',
        description: 'Artwork purchase payment',
        order_id: createOrderData.razorpayOrderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        notes: {
          internalOrderId: createOrderData.internalOrderId,
          preferredMethod: paymentMethod,
          country,
        },
        theme: {
          color: '#111827',
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              internalOrderId: createOrderData.internalOrderId,
              paymentMethod,
              ...response,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success) {
            throw new Error(verifyData?.error || 'Payment verification failed');
          }

          clearCart();
          router.push(`/checkout/success?orderId=${createOrderData.internalOrderId}`);
        },
      };

      const checkout = new window.Razorpay(options);
      checkout.open();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Payment initiation failed';
      alert(message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl font-light text-stone-900">No items in checkout</h1>
          <p className="mt-2 text-stone-600">Add paintings to cart before proceeding.</p>
          <Link href="/paintings" className="mt-6 inline-block">
            <Button intent="art">Browse Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="mb-6 inline-block">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </Link>

        <h1 className="mb-8 text-2xl font-light text-stone-900 sm:text-3xl">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-stone-900">Customer Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  className="rounded-md border border-stone-300 px-4 py-2"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  className="rounded-md border border-stone-300 px-4 py-2"
                  placeholder="Email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  className="rounded-md border border-stone-300 px-4 py-2"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <div className="sm:col-span-2">
                  <CountryCurrencySelector
                    country={country}
                    currency={currency}
                    setCountryCurrency={setCountryCurrency}
                    options={countryCurrencyOptions}
                  />
                </div>
                <textarea
                  className="rounded-md border border-stone-300 px-4 py-2 sm:col-span-2"
                  placeholder="Address"
                  rows={3}
                  value={customer.address}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-stone-900">Payment Method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`rounded-md border p-4 text-left ${paymentMethod === 'upi' ? 'border-stone-900 bg-white' : 'border-stone-200 bg-white/50'}`}
                >
                  <Smartphone className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="font-medium text-stone-900">UPI</p>
                  <p className="text-xs text-stone-500">Apps, UPI ID, QR</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit')}
                  className={`rounded-md border p-4 text-left ${paymentMethod === 'credit' ? 'border-stone-900 bg-white' : 'border-stone-200 bg-white/50'}`}
                >
                  <CreditCard className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="font-medium text-stone-900">Credit Card</p>
                  <p className="text-xs text-stone-500">Visa, Mastercard, RuPay</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('debit')}
                  className={`rounded-md border p-4 text-left ${paymentMethod === 'debit' ? 'border-stone-900 bg-white' : 'border-stone-200 bg-white/50'}`}
                >
                  <Landmark className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="font-medium text-stone-900">Debit Card</p>
                  <p className="text-xs text-stone-500">Visa, Mastercard, RuPay</p>
                </button>
              </div>
              <p className="mt-4 text-xs text-stone-500">
                After clicking proceed, Razorpay will open secure payment flow with OTP/3DS/UPI app redirect as required.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-stone-200 bg-stone-50 p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-stone-900">Order Summary</h2>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <span className="line-clamp-1 text-stone-600">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-medium text-stone-900">
                      {formatCurrency(convertFromUSD(item.price * item.quantity))}
                    </span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-900">Total</span>
                    <span className="font-semibold text-stone-900">
                      {formatCurrency(totalInSelectedCurrency)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                intent="art"
                className="mt-6 w-full py-6 text-base"
                onClick={beginPayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Secure Payment'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
