'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Rates = Record<string, number>;
type CountryCurrencyOption = {
  value: string;
  country: string;
  currency: string;
  label: string;
};

const STORAGE_KEY = 'inkara-currency-settings';
const CURRENCY_SYNC_EVENT = 'inkara-currency-sync';

const FALLBACK_COUNTRY_CURRENCY_MAP: Record<string, string> = {
  India: 'INR',
  'United States': 'USD',
  'United Kingdom': 'GBP',
  Canada: 'CAD',
  Australia: 'AUD',
  Germany: 'EUR',
  France: 'EUR',
  Italy: 'EUR',
  Spain: 'EUR',
  Japan: 'JPY',
  Singapore: 'SGD',
  UAE: 'AED',
};

const FALLBACK_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD', 'AED'];

function getAllCurrencyOptions(): string[] {
  const intlWithSupportedValues = Intl as Intl.NumberFormatOptions & {
    supportedValuesOf?: (key: string) => string[];
  };

  const values = intlWithSupportedValues.supportedValuesOf?.('currency');
  if (!values || values.length === 0) return FALLBACK_CURRENCIES;
  return values.sort();
}

export function useCurrency() {
  const [country, setCountryState] = useState('India');
  const [currency, setCurrencyState] = useState('INR');
  const [countryCurrencyMap, setCountryCurrencyMap] = useState<Record<string, string>>(
    FALLBACK_COUNTRY_CURRENCY_MAP
  );
  const [rates, setRates] = useState<Rates>({ USD: 1, INR: 83.5 });
  const [loadingRates, setLoadingRates] = useState(false);
  const [loadingCountryMap, setLoadingCountryMap] = useState(false);

  const currencyOptions = useMemo(() => getAllCurrencyOptions(), []);
  const countryOptions = useMemo(
    () => Object.keys(countryCurrencyMap).sort((a, b) => a.localeCompare(b)),
    [countryCurrencyMap]
  );

  const currencyToCountries = useMemo(() => {
    const map: Record<string, string[]> = {};

    for (const [countryName, currencyCode] of Object.entries(countryCurrencyMap)) {
      if (!map[currencyCode]) map[currencyCode] = [];
      map[currencyCode].push(countryName);
    }

    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => a.localeCompare(b));
    }

    return map;
  }, [countryCurrencyMap]);

  const countryCurrencyOptions = useMemo<CountryCurrencyOption[]>(() => {
    return countryOptions.map((countryName) => {
      const currencyCode = countryCurrencyMap[countryName] || 'USD';
      return {
        value: `${countryName}|${currencyCode}`,
        country: countryName,
        currency: currencyCode,
        label: `${countryName} - ${currencyCode}`,
      };
    });
  }, [countryCurrencyMap, countryOptions]);

  const setCountry = useCallback(
    (newCountry: string) => {
      setCountryState(newCountry);
      const mappedCurrency = countryCurrencyMap[newCountry];
      if (mappedCurrency) {
        setCurrencyState(mappedCurrency);
      }
    },
    [countryCurrencyMap]
  );

  const setCurrency = useCallback(
    (newCurrency: string) => {
      setCurrencyState(newCurrency);
      const mappedCountries = currencyToCountries[newCurrency];
      if (mappedCountries && mappedCountries.length > 0) {
        setCountryState(mappedCountries[0]);
      }
    },
    [currencyToCountries]
  );

  const setCountryCurrency = useCallback(
    (value: string) => {
      const [nextCountry, nextCurrency] = value.split('|');
      if (nextCountry) setCountryState(nextCountry);
      if (nextCurrency) setCurrencyState(nextCurrency);
    },
    []
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { country?: string; currency?: string };
      if (parsed.country) setCountryState(parsed.country);
      if (parsed.currency) setCurrencyState(parsed.currency);
    } catch {
      // Ignore invalid local storage
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;

      try {
        const parsed = JSON.parse(event.newValue) as { country?: string; currency?: string };
        if (parsed.country) setCountryState(parsed.country);
        if (parsed.currency) setCurrencyState(parsed.currency);
      } catch {
        // Ignore invalid storage payload
      }
    };

    const handleCurrencySync = () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as { country?: string; currency?: string };
        if (parsed.country) setCountryState(parsed.country);
        if (parsed.currency) setCurrencyState(parsed.currency);
      } catch {
        // Ignore invalid storage payload
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(CURRENCY_SYNC_EVENT, handleCurrencySync);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CURRENCY_SYNC_EVENT, handleCurrencySync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ country, currency }));
    window.dispatchEvent(new Event(CURRENCY_SYNC_EVENT));
  }, [country, currency]);

  useEffect(() => {
    const fetchCountriesAndCurrencies = async () => {
      try {
        setLoadingCountryMap(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies', {
          cache: 'no-store',
        });
        if (!response.ok) return;

        const rows = (await response.json()) as Array<{
          name?: { common?: string };
          currencies?: Record<string, { name?: string; symbol?: string }>;
        }>;

        const dynamicMap: Record<string, string> = {};

        for (const row of rows) {
          const countryName = row?.name?.common?.trim();
          if (!countryName) continue;

          const currencyCodes = row.currencies ? Object.keys(row.currencies) : [];
          if (currencyCodes.length === 0) continue;

          dynamicMap[countryName] = currencyCodes[0].toUpperCase();
        }

        if (Object.keys(dynamicMap).length > 0) {
          setCountryCurrencyMap(dynamicMap);
        }
      } catch {
        // fallback map remains
      } finally {
        setLoadingCountryMap(false);
      }
    };

    fetchCountriesAndCurrencies();
  }, []);

  useEffect(() => {
    const mappedCurrency = countryCurrencyMap[country];
    if (mappedCurrency && mappedCurrency !== currency && currencyOptions.includes(mappedCurrency)) {
      setCurrencyState(mappedCurrency);
      return;
    }

    const mappedCountries = currencyToCountries[currency];
    if ((!mappedCurrency || mappedCurrency !== currency) && mappedCountries?.length) {
      if (!countryCurrencyMap[country]) {
        setCountryState(mappedCountries[0]);
      }
    }
  }, [country, currency, countryCurrencyMap, currencyToCountries, currencyOptions]);

  useEffect(() => {
    if (!currencyOptions.includes(currency)) {
      setCountryState('India');
      setCurrencyState('INR');
    }
  }, [currency, currencyOptions]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoadingRates(true);
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Failed to load exchange rates');

        const data = await response.json();
        if (data?.rates) {
          setRates(data.rates as Rates);
        }
      } catch {
        // Keep fallback rates
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  const convertFromUSD = (amountInUSD: number) => {
    const rate = rates[currency] ?? 1;
    return amountInUSD * rate;
  };

  const formatCurrency = (amount: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  };

  return {
    country,
    setCountry,
    currency,
    setCurrency,
    countryOptions,
    currencyOptions,
    countryCurrencyOptions,
    setCountryCurrency,
    convertFromUSD,
    formatCurrency,
    loadingRates,
    loadingCountryMap,
  };
}
