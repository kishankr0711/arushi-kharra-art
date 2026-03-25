'use client';

import { useCurrency } from '@/lib/use-currency';
import { cn } from '@/lib/utils';

interface CountryCurrencyNavSelectorProps {
  className?: string;
}

export default function CountryCurrencyNavSelector({ className }: CountryCurrencyNavSelectorProps) {
  const { country, currency, countryCurrencyOptions, setCountryCurrency } = useCurrency();
  const selected = `${country}|${currency}`;

  return (
    <select
      value={selected}
      onChange={(e) => setCountryCurrency(e.target.value)}
      className={cn(
        "h-8 w-full min-w-0 rounded-md border border-[#d7bc8a] bg-[#fffdf8] px-2 text-xs text-[#6b4d1f] sm:h-9 sm:text-sm",
        className
      )}
      aria-label="Country and currency selector"
    >
      {countryCurrencyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
