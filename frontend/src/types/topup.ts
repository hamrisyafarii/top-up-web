import type {Games} from "./games";

export type Products = {
  id: string;
  amount: number;
  bonus: number;
  price: number;
  label: string;
  gameId: string;
};

export type PaymentMethods = {
  id: string;
  name: string;
  code: string;
  type: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TopUpType = {
  game: Games;
  products: Products[];
};
