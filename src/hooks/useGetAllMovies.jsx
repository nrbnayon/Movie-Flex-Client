import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllMovies = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: movies = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allCourse");
      return res.data;
    },
  });

  return { movies, isLoading, refetch, error };
};

export default useGetAllMovies;
