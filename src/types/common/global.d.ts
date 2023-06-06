import { Product, Cart } from "../products/index";

export interface CreateShoppingCart {
  cartId?: string;
  product?: Product[] | undefined;
}

export interface logLevel {
  level: string;
  message: string;
}

export interface ShoppingCart {
  totalPrice: number;
  cart: Cart;
}

interface Periodicidade {
  idPeriodo: number;
  periodicidade: string;
  valorPeriodo: string;
  idPreco: number;
  parcelamentos: number[];
}

export interface InfoProduto {
  idProduto: number;
  nome: string;
  sigla: string;
  tipoConteudo: string;
  tipoAssinatura: string;
  periodicidades: Periodicidade[];
}
