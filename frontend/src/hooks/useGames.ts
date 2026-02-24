import {axiosInstance} from "@/lib/axios";
import type {Games, Meta} from "@/types/games";
import {useQuery} from "@tanstack/react-query";

type Params = {
  search?: string;
  page?: number;
  limit?: number;
};

type GamesResponse = {
  data: Games[];
  meta: Meta;
};

export const useGames = (params?: Params) => {
  const fetchGames = async (): Promise<GamesResponse> => {
    const {data} = await axiosInstance.get("/games", {
      params,
    });

    return data.data;
  };

  const {data, isLoading, isError} = useQuery<GamesResponse>({
    queryKey: ["games", params],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  });

  return {
    games: data?.data ?? [],
    meta: data?.meta ?? {
      total: 0,
      page: 1,
      lastPage: 1,
    },
    isLoading,
    isError,
  };
};
