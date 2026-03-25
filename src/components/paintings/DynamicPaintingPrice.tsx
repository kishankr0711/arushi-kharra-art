'use client';

import { useCurrency } from '@/lib/use-currency';

interface DynamicPaintingPriceProps {
  amount: number;
  className?: string;
}

export default function DynamicPaintingPrice({ amount, className }: DynamicPaintingPriceProps) {
  const { convertFromUSD, formatCurrency } = useCurrency();
  return <span className={className}>{formatCurrency(convertFromUSD(amount))}</span>;
}
