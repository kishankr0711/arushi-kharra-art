'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-store';

interface CartIconProps {
  isLoggedIn: boolean;
  className?: string;
  iconClassName?: string;
  badgeClassName?: string;
}

export default function CartIcon({
  isLoggedIn,
  className = "p-2 hover:bg-stone-100 rounded-full relative",
  iconClassName = "h-5 w-5 text-stone-600",
  badgeClassName = "absolute -top-1 -right-1 bg-stone-800 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full",
}: CartIconProps) {
  const totalItems = useCart((state) => state.getTotalItems());
  const cartHref = isLoggedIn ? '/cart' : '/login?callbackUrl=%2Fcart';

  return (
    <Link href={cartHref}>
      <button className={className}>
        <ShoppingBag className={iconClassName} />
        {isLoggedIn && totalItems > 0 && (
          <span className={badgeClassName}>
            {totalItems}
          </span>
        )}
      </button>
    </Link>
  );
}
