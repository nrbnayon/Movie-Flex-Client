import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFilm, FaMoneyBillWave, FaStar, FaCalendarAlt } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import {
  Button,
  Pagination,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import LoaderSpinner from "./../../Shared/LoaderSpinner/LoaderSpinner";
import BgCard from "./../../Shared/BgCard/BgCard";
import { Link } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import moment from "moment";
const AllMovies = () => {
  const axiosPublic = useAxiosPublic();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState(""); // This will hold the value from the input field
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAtDesc");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchMovies();
  }, [currentPage, searchQuery, category, rating, minPrice, maxPrice, sort]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosPublic.get("/all-movies", {
        params: {
          page: currentPage,
          limit: 9,
          query: searchQuery,
          category,
          rating,
          minPrice,
          maxPrice,
          sortBy: sort,
        },
      });
      setMovies(data.movies);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Error loading movies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>{error}</div>;
  const uniqueCategories = [...new Set(movies.map((movie) => movie.category))];
  return (
    <div className="my-4">
      <BgCard
        Card={{
          img: "https://static.vecteezy.com/system/resources/thumbnails/002/236/321/small/movie-trendy-banner-vector.jpg",
          title: "Our all movies",
          desc: "Browse and enjoy your favorite movies",
        }}
      />
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-2 flex mb-4">
          <input
            type="text"
            placeholder="Search Movies..."
            className="flex-grow p-2 border rounded-l-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="rounded-r-md bg-blue-600 hover:bg-blue-700"
            onClick={handleSearch}
          >
            <MdSearch className="text-white" />
          </Button>
        </div>
        <FormControl fullWidth className="mb-4 col-span-1">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={handleRatingChange} label="Rating">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="4.0">4.0 & Up</MenuItem>
            <MenuItem value="3.0">3.0 & Up</MenuItem>
            <MenuItem value="2.0">2.0 & Up</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} onChange={handleSortChange} label="Sort By">
            <MenuItem value="createdAtDesc">Newest First</MenuItem>
            <MenuItem value="createdAtAsc">Oldest First</MenuItem>
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 text-white rounded overflow-hidden shadow-lg flex flex-col"
            data-aos="fade-up"
          >
            <img
              className="w-full h-64"
              src={movie.image}
              alt={movie.name}
              data-aos="zoom-in"
            />
            <div className="px-4 py-4 flex-grow">
              <div className="font-bold text-xl mb-2 font-cinzel">
                {movie.name}
              </div>
              <p className="text-gray-300 text-base font-raleway mb-4">
                {movie.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span className="text-gray-300">
                    Released:{" "}
                    {moment(movie.releaseDate).isValid()
                      ? moment(movie.releaseDate).format("MMMM D, YYYY")
                      : "Release Date Not Available"}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <FaStar className="mr-2 text-yellow-500" />
                  <span className="text-gray-300">{movie.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center mt-2">
                  <FaFilm className="mr-2 text-yellow-500" />
                  <span className="text-gray-300">
                    Category: {movie.category}
                  </span>
                </div>

                <div className="flex items-center mt-2">
                  <FaMoneyBillWave className="mr-2 text-green-500" />
                  <span className="text-gray-300">Price: {movie.price}$</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-500 p-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center bg-gray-100 rounded-md p-4 items-center text-center mt-6">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllMovies;
