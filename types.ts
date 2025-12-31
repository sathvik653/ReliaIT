import { LucideIcon } from 'lucide-react';

export interface ProductSection {
  title: string;
  items: string[];
  image: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'Hardware' | 'Stationery' | 'Networking' | 'Peripherals' | 'Consumables' | 'Accessories' | 'Retail';
  image: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface StatItem {
  label: string;
  value: string;
  iconName: string;
}