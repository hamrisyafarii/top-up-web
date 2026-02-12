import {axiosInstance} from "@/lib/axios";
import type {Games} from "@/types/games";
import {useEffect, useState} from "react";

export const useGames = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllGames = async () => {
    setIsLoading(true);
    try {
      const {data} = await axiosInstance.get("/games");

      if (data.statusCode === 200) {
        setGames(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return {
    games,
    isLoading,
  };
};
