'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-store';

interface CartOwnerSyncProps {
  ownerId: string | null;
}

export default function CartOwnerSync({ ownerId }: CartOwnerSyncProps) {
  const setOwner = useCart((state) => state.setOwner);

  useEffect(() => {
    setOwner(ownerId);
  }, [ownerId, setOwner]);

  return null;
}
