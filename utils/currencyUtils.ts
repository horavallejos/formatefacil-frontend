import { CurrencyConfig } from '../types';

export const getEstimatedCurrency = (): CurrencyConfig => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  if (timeZone.includes('Buenos_Aires') || timeZone.includes('Argentina')) {
    return { code: 'ARS', symbol: '$', rate: 1200 }; // Example rate
  } else if (timeZone.includes('Mexico')) {
    return { code: 'MXN', symbol: '$', rate: 17 };
  } else if (timeZone.includes('Bogota') || timeZone.includes('Colombia')) {
    return { code: 'COP', symbol: '$', rate: 3900 };
  } else if (timeZone.includes('Santiago') || timeZone.includes('Chile')) {
    return { code: 'CLP', symbol: '$', rate: 950 };
  } else if (timeZone.includes('Madrid') || timeZone.includes('Europe')) {
    return { code: 'EUR', symbol: '€', rate: 0.92 };
  }
  
  // Default to USD
  return { code: 'USD', symbol: 'US$', rate: 1 };
};

// Nueva función para obtener tasas reales
export const fetchExchangeRate = async (base: string = 'USD'): Promise<Record<string, number> | null> => {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export const formatPrice = (priceUSD: number, currency: CurrencyConfig): string => {
  const finalPrice = Math.round(priceUSD * currency.rate);
  return `${currency.symbol}${finalPrice.toLocaleString()} ${currency.code}`;
};
