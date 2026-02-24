import {axiosInstance} from "@/lib/axios";
import type {TopUpType} from "@/types/topup";
import {useQuery} from "@tanstack/react-query";

export const useProducts = (slug?: string) => {
  const fetchProducts = async (): Promise<TopUpType> => {
    const {data} = await axiosInstance.get(`/games/${slug}/products`);

    return data.data;
  };

  const {data, isLoading, isError} = useQuery<TopUpType>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    products: data,
    isError,
    isLoading,
  };
};
