import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "./Banner/Banner";
import AllMovies from "./AllMovies/AllMovies";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 1000,
      easing: "ease",
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>MovieFlex | Home</title>
      </Helmet>
      <div data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
        <Banner />
      </div>
      <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
        <AllMovies />
      </div>
      <div data-aos="zoom-out" data-aos-delay="300" data-aos-duration="1000">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
