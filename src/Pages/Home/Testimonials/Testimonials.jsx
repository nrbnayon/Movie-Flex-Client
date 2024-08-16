import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./styles.css";
import { Navigation, Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionTitle from "./../../Shared/BgCard/SectionTitle";

const Testimonials = () => {
  const header = {
    title: "---What Our Users Say---",
    desc: "Testimonials",
  };

  const reviews = [
    {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
      feedbackText:
        "Amazing movie! The visuals were stunning and the plot was gripping from start to finish.",
      title: "Action Masterpiece",
      rating: 5,
    },
    {
      _id: "2",
      name: "Jane Smith",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
      feedbackText:
        "A great watch. The character development was impressive and the soundtrack was fantastic.",
      title: "Great Character Development",
      rating: 4,
    },
    {
      _id: "3",
      name: "Alice Johnson",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
      feedbackText:
        "Not the best film I've seen, but still worth watching. Some interesting moments and good acting.",
      title: "Interesting Moments",
      rating: 3,
    },
    {
      _id: "4",
      name: "Bob Brown",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
      feedbackText:
        "Fantastic film! The action sequences were top-notch, and the storyline kept me engaged.",
      title: "Top-Notch Action",
      rating: 5,
    },
    {
      _id: "5",
      name: "Emily Davis",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
      feedbackText:
        "The film was okay. It had its moments, but overall it didn’t live up to the hype.",
      title: "Mediocre Experience",
      rating: 2,
    },
  ];

  return (
    <div className="my-4 rounded-md">
      <SectionTitle header={header} />
      <div className="py-4">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col text-black justify-center items-center bg-white p-6 my-8 rounded-lg shadow-lg">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-2xl text-orange-400 font-bold font-cinzel">
                  {review.name}
                </p>
                <div className="relative md:w-2/3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300"
                  >
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                  </svg>
                  <p className="text-center text-lg italic p-8">
                    {review.feedbackText}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="absolute bottom-0 right-0 w-8 h-8"
                  >
                    <path
                      fill="currentColor"
                      d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"
                    ></path>
                  </svg>
                </div>

                <div className="md:flex justify-around gap-2">
                  <p className="mt-2">{review.title}</p>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
