export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  priceUSD: number;
  rating: number;
  students: number;
  category: string;
  hotmartLink: string; // Link to checkout
  features: string[]; // "What you will learn"
  benefits: string[];
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // Approximate rate relative to USD for display purposes
}
