import {axiosInstance} from "@/lib/axios";
import type {Transaction} from "@/types/transaction";
import {useQuery} from "@tanstack/react-query";

export const useTransaction = () => {
  const fetchTransactions = async (): Promise<Transaction[]> => {
    const {data} = await axiosInstance.get("/transactions");

    return data.data;
  };

  const {data, isLoading, isError} = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return {
    transactions: data,
    isLoading,
    isError,
  };
};
