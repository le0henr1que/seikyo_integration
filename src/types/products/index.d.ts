export interface Cart {
  id?: string;
  product?: Product[] | null;
}

export interface Product {
  id?: string;
  idPrice: number;
  idProduct: number;
  idPeriod: number;
  name: string;
  cart?: Cart;
  cartId?: string;
}
