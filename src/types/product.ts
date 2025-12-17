export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string; // ISO date
  updatedAt: string; // ISO date
}
