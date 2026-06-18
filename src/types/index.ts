export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  currency: string;
  sku?: string | null;
  categoryId: string;
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: Review[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string | null;
  position: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string | null;
  color?: string | null;
  colorHex?: string | null;
  stock: number;
  sku?: string | null;
  price?: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  featured: boolean;
  products?: Product[];
  children?: Category[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  verified: boolean;
  createdAt: string;
  user?: { name: string; image?: string };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  shippingMethod?: string | null;
  createdAt: string;
  items: OrderItem[];
  address?: Address;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  price: number;
  size?: string | null;
  color?: string | null;
  product: Product;
}

export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string | null;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role: "CUSTOMER" | "ADMIN";
  image?: string | null;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string | null;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number | null;
  maxUses?: number | null;
  usedCount: number;
  active: boolean;
  expiresAt?: string | null;
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1550 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
];
