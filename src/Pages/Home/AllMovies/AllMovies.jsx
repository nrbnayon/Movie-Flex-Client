import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFilm,
  FaMoneyBillWave,
  FaStar,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import {
  Pagination,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LoaderSpinner from "./../../Shared/LoaderSpinner/LoaderSpinner";
import BgCard from "./../../Shared/BgCard/BgCard";
import { NavLink } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

const AllMovies = () => {
  const axiosPublic = useAxiosPublic();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
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
      // if (data.movies.length === 0) {
      //   setError("No movies found based on your search criteria.");
      // } else {
      //   setError(null);
      // }
    } catch (error) {
      setError("Error loading movies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCategory("");
    setRating("");
    setSort("");
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(1);
    setSearchInput("");
    setSearchQuery("");
    setRating("");
    setSort("");
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
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const uniqueCategories = [
    "Hollywood",
    "DC",
    "MCU",
    "Bollywood",
    "Anime",
    "Sci-Fi",
    "Drama",
    "Animation",
    "Crime",
    "Action",
    "Biography",
    "Comedy",
  ];

  return (
    <div className="my-4">
      <BgCard
        Card={{
          img: "https://wallpapercave.com/wp/wp1945909.jpg",
          title: "Our all movies",
          desc: "Browse and enjoy your favorite movies",
        }}
      />
      <div className="px-4 md:w-[80%] my-6 mb-4 mx-auto text-center">
        <button
          className="btn btn-primary px-6 py-2 my-2"
          onClick={() => handleCategoryChange("")}
        >
          All
        </button>
        <div className="flex flex-wrap justify-between md:justify-center items-center gap-2 md:gap-4">
          {uniqueCategories.map((cat) => (
            <NavLink
              key={cat}
              className={({ isActive }) =>
                `btn btn-sm md:btn-md ${
                  isActive ? "btn-info" : "btn-secondary"
                } border`
              }
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="my-6 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Movies..."
              className="input flex-grow p-2 border rounded-l-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-r-md"
              onClick={handleSearch}
            >
              <MdSearch />
            </button>
          </div>
          <FormControl fullWidth className="mb-4 lg:mb-0">
            <InputLabel>Filter by Rating</InputLabel>
            <Select
              value={rating}
              onChange={handleRatingChange}
              label="Filter by Rating"
              className="bg-white border-gray-300 focus:ring-2  focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="5.0">5.0</MenuItem>
              <MenuItem value="4.0">4.0 & Up</MenuItem>
              <MenuItem value="3.0">3.0 & Up</MenuItem>
              <MenuItem value="2.0">2.0 & Up</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={handleSortChange}
              label="Sort By"
              className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <InputLabel>Sort By</InputLabel>
              <MenuItem value="createdAtDesc">Newest First</MenuItem>
              <MenuItem value="createdAtAsc">Oldest First</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="text-center text-gray-500 min-h-20">
          <h2 className="font-bold text-2xl text-red-500">No movies found</h2>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => {
            const directorText = Array.isArray(movie.director)
              ? movie.director.join(", ")
              : movie.director;
            const actorsText = movie.actors.join(", ");
            const combinedText = `Director: ${directorText} | Actors: ${actorsText}`;

            return (
              <div
                key={movie.name}
                className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col relative group"
                data-aos="fade-up"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 transition-transform duration-300 hover:scale-90"
                    src={movie.image}
                    alt={movie.name}
                    data-aos="zoom-in"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-transparent text-white text-lg font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => alert("Play button clicked")}
                  >
                    <FaPlay className="w-12 h-12 fill-red-600 transition-transform duration-300 hover:scale-110" />
                  </button>
                </div>
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
                        {moment(movie.releaseDate).format("DD MMMM YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-2" />
                      <span className="text-gray-300">{movie.rating}/5</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-gray-300 text-xs mb-2">
                      <Typewriter
                        words={[combinedText]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={70}
                        delaySpeed={1000}
                      />
                    </h5>
                  </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block rounded bg-blue-800 text-white px-3 py-1 text-sm font-semibold">
                        <FaMoneyBillWave className="inline-block mr-1" />
                        {movie.price} $
                      </span>
                    </div>
                    <div className="flex items-center rounded bg-purple-600 text-white px-3 py-2 text-sm font-semibold">
                      <FaFilm className="mr-1 text-yellow-500" />
                      <span className="text-gray-300">{movie.category}</span>
                    </div>
                    <button className="btn btn-success hover:bg-red-700 text-white rounded-md">
                      <FaPlay />
                      Play
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center bg-gray-100 rounded-md p-4 items-center text-center mt-6 mb-10">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllMovies;
