import {axiosInstance} from "@/lib/axios";
import type {PaymentMethods} from "@/types/topup";
import {useQuery} from "@tanstack/react-query";

export const usePaymentMethods = () => {
  const fetchPaymentsMethods = async (): Promise<PaymentMethods[]> => {
    const {data} = await axiosInstance.get("/payment-methods");

    return data.data;
  };

  const {data, isLoading, isError} = useQuery<PaymentMethods[]>({
    queryKey: ["payment-methods"],
    queryFn: fetchPaymentsMethods,
  });

  return {
    paymentMethods: data ?? [],
    isLoading,
    isError,
  };
};
