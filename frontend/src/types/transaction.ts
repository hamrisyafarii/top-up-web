export type Transaction = {
  id: string;
  transactionCode: string;
  playerId: string;
  zoneId: string;
  price: number;
  status: "PENDING" | "PAID" | "EXPIRED" | "FAILED";
  productAmount: number;
  productBonus?: number;
  game: {
    title: string;
  };
  paymentMethod: {
    name: string;
  };

  createdAt: Date;
};
