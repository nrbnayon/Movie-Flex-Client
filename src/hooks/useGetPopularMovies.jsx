import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetPopularMovies = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: movies = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["topMovies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-movies");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { movies, isLoading, refetch, error };
};

export default useGetPopularMovies;
