'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-store';

interface AddToCartButtonProps {
  userId: string | null;
  painting: {
    id: string;
    title: string;
    artist: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export default function AddToCartButton({ painting, userId }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    if (!painting.inStock) return;

    if (!userId) {
      const callbackUrl = encodeURIComponent(pathname || `/paintings/${painting.id}`);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    
    addItem({
      id: painting.id,
      title: painting.title,
      artist: painting.artist,
      price: painting.price,
      image: painting.image,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!painting.inStock) {
    return (
      <Button disabled className="w-full py-6 text-lg">
        Out of Stock
      </Button>
    );
  }

  return (
    <Button
      intent="art"
      className="w-full py-6 text-lg"
      onClick={handleAdd}
      disabled={added}
    >
      {!userId ? (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      ) : added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
