import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Link } from "react-router-dom";
import useGetPopularMovies from "../../../hooks/useGetPopularMovies";
const Banner = () => {
  const { movies, isLoading, error } = useGetPopularMovies();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Error fetching popular movies</div>;

  return (
    <div className=" my-12 px-4 sm:px-6 lg:px-8">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id} className="swiper-slides p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-72 w-full">
                <img
                  src={movie.image}
                  className="h-full w-full object-cover"
                  alt={movie.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {movie.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {movie.description.slice(0, 70)}...
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-indigo-600">
                    {movie.price} USD
                  </span>
                  <span className="text-gray-600">
                    Category: {movie.category}
                  </span>
                  <span className="text-gray-600">Rating: {movie.rating}</span>
                </div>
                <Link to={`/movieDetails/${movie._id}`}>
                  <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Watch Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
