// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useGetAllMovies = () => {
//   const axiosPublic = useAxiosPublic();
//   const {
//     data: movies = [],
//     isLoading,
//     refetch,
//     error,
//   } = useQuery({
//     queryKey: ["movies"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/all-movies");
//       return res.data;
//     },
//   });

//   return { movies, isLoading, refetch, error };
// };

// export default useGetAllMovies;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useGetAllMovies = (
//   searchQuery,
//   category,
//   priceRange,
//   sort,
//   page,
//   limit
// ) => {
//   const axiosPublic = useAxiosPublic();

//   const {
//     data: movies = [],
//     isLoading,
//     refetch,
//     error,
//   } = useQuery({
//     queryKey: [
//       "movies",
//       { searchQuery, category, priceRange, sort, page, limit },
//     ],
//     queryFn: async () => {
//       const params = new URLSearchParams({
//         searchQuery,
//         category,
//         priceRange,
//         sort,
//         page,
//         limit,
//       });
//       const res = await axiosPublic.get(`/all-movies?${params.toString()}`);
//       return res.data;
//     },
//   });

//   return { movies, isLoading, refetch, error };
// };

// export default useGetAllMovies;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useGetAllMovies = (
//   searchQuery,
//   brand,
//   category,
//   priceRange,
//   sort,
//   page,
//   limit
// ) => {
//   const axiosPublic = useAxiosPublic();

//   const {
//     data: movies = [],
//     isLoading,
//     refetch,
//     error,
//   } = useQuery({
//     queryKey: [
//       "movies",
//       { searchQuery, brand, category, priceRange, sort, page, limit },
//     ],
//     queryFn: async () => {
//       const params = new URLSearchParams({
//         searchQuery,
//         brand,
//         category,
//         priceRange,
//         sort,
//         page,
//         limit,
//       });
//       const res = await axiosPublic.get(`/all-movies?${params.toString()}`);
//       return res.data;
//     },
//   });

//   return { movies, isLoading, refetch, error };
// };

// export default useGetAllMovies;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllMovies = ({ page, search, category, sort }) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: { movies = [], totalPages = 1 } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", page, search, category, sort],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-movies", {
        params: { page, limit: 9, search, category, sort },
      });
      return res.data;
    },
  });

  return { movies, isLoading, error, totalPages };
};

export default useGetAllMovies;
