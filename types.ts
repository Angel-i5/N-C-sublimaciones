
import type { ReactNode } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  priceInfo: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}
