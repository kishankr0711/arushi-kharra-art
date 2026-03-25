'use client';

import { useMemo } from 'react';

interface CountryCurrencySelectorProps {
  country: string;
  currency: string;
  setCountryCurrency: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    country: string;
    currency: string;
  }>;
  compact?: boolean;
}

export default function CountryCurrencySelector({
  country,
  currency,
  setCountryCurrency,
  options,
  compact = false,
}: CountryCurrencySelectorProps) {
  const selectedValue = `${country}|${currency}`;
  const sortedOptions = useMemo(() => options.slice().sort((a, b) => a.label.localeCompare(b.label)), [options]);

  return (
    <div className={compact ? 'space-y-3' : 'space-y-3'}>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-500">
          Country - Currency
        </label>
        <select
          value={selectedValue}
          onChange={(e) => setCountryCurrency(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
        >
          {sortedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
