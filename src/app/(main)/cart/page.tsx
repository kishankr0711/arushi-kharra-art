'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/lib/use-currency';
import CountryCurrencySelector from '@/components/checkout/CountryCurrencySelector';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const {
    country,
    currency,
    countryCurrencyOptions,
    setCountryCurrency,
    convertFromUSD,
    formatCurrency,
  } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-stone-300 mb-6" />
          <h1 className="text-3xl font-light text-stone-900 mb-4">Your Cart is Empty</h1>
          <p className="text-stone-600 mb-8">Discover beautiful artworks in our gallery</p>
          <Link href="/paintings">
            <Button intent="art" size="lg">
              Browse Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-stone-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 bg-stone-50 rounded-lg border border-stone-200"
              >
                {/* Image */}
                <div className="h-24 w-24 rounded-lg bg-stone-200 overflow-hidden flex-shrink-0">
                  {item.image && item.image !== '/images/placeholder.jpg' ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-stone-400 text-xs">
                      {item.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-stone-900">{item.title}</h3>
                      <p className="text-sm text-stone-500">{item.artist}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border border-stone-300 hover:bg-stone-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border border-stone-300 hover:bg-stone-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-medium text-stone-900">
                      {formatCurrency(convertFromUSD(item.price * item.quantity))}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 sticky top-24">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Order Summary</h2>

              <div className="mb-6">
                <CountryCurrencySelector
                  compact={true}
                  country={country}
                  currency={currency}
                  setCountryCurrency={setCountryCurrency}
                  options={countryCurrencyOptions}
                />
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="text-stone-900">{formatCurrency(convertFromUSD(getTotalPrice()))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Shipping</span>
                  <span className="text-stone-900">{formatCurrency(0)}</span>
                </div>
                <div className="border-t border-stone-200 pt-4 flex justify-between">
                  <span className="font-medium text-stone-900">Total</span>
                  <span className="font-medium text-stone-900">{formatCurrency(convertFromUSD(getTotalPrice()))}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button intent="art" className="w-full py-6 text-lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/paintings">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
