export interface ProductModule {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  brand: string;
  images: string[];
}

export interface CategoriesModule {
  [index: number]: string;
}
