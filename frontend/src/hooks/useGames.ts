import {axiosInstance} from "@/lib/axios";
import type {Games} from "@/types/games";
import {useEffect, useState} from "react";

export const useGames = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const [games, setGames] = useState<Games[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllGames = async () => {
    setIsLoading(true);
    try {
      const {data} = await axiosInstance.get("/games", {
        params,
      });

      if (data.statusCode === 200) {
        setGames(data.data.data);
        setMeta(data.data.meta);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, [JSON.stringify(params)]);

  return {
    games,
    meta,
    isLoading,
  };
};
