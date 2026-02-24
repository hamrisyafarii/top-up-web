import {axiosInstance} from "@/lib/axios";
import {useMutation} from "@tanstack/react-query";

type CreateTransactionPayload = {
  playerId: string;
  zoneId?: string;
  productId: string;
  paymentMethodId: string;
};

type TransactionResponse = {
  transaction: {
    id: string;
    transactionCode: string;
    invoiceUrl: string;
  };
};

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const {data} = await axiosInstance.post("/transactions", payload);

      return data.data as TransactionResponse;
    },
  });
};
