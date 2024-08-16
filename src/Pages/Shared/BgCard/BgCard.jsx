import PropTypes from "prop-types";
import "./styles.css";
const BgCard = ({ Card }) => {
  const { img, title, desc } = Card;
  // const truncatedDesc = desc.length > 100 ? desc.slice(0, 100) : desc;

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
      <img src={img} alt="img" className="w-full h-full opacity-80" />
      <div className="bg-opacity-60 absolute md:w-[75%] md:h-1/2 my-6 md:my-auto rounded-2xl mx-auto inset-0 flex flex-col justify-center items-center p-6 text-center text-[#151515] font-cinzel animated-gradient">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-xl font-raleway mt-2 md:w-2/3 mx-auto">{desc}</p>
      </div>
    </div>
  );
};

BgCard.propTypes = {
  Card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default BgCard;
