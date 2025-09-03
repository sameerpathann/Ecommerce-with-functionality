import Cards from "../Strucuture/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Card = ({
  data,
  cartItems,
  setCartItems,
  wishlistCount,
  setwishlistData,
  wishlistData,
}) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    initialSlide: 0,
    slidesToScroll: true,
    swipe: true,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          swipe: true,
          draggable: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          swipe: true,
          swipeToSlide: true,
          draggable: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          swipe: true,
          swipeToSlide: true,
          draggable: true,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: false,
          draggable: false,
        },
      },
    ],
  };

  return (
    <div className="mt-6 px-3">
      <div className="w-full bg-white rounded px-3 pt-3">
        <h1 className="text-xl md:text-2xl font-semibold">
          Special Products For You
        </h1>
        <div className="w-[12%] flex items-center justify-between rounded-md overflow-hidden h-[2px] mt-2">
          <div className="w-[32%] h-full bg-cyan-500"></div>
          <div className="w-[35%] h-full bg-cyan-500"></div>
        </div>
        <h6 className="text-xs mt-4 opacity-45 mb-4 font-semibold">
          Special Products For You
        </h6>

        <div className="w-[100%] slider-container h-fit card-slider">
          <Slider {...settings}>
            {data.map((product, index) => (
              <div key={index} className="pr-2 py-2">
                <Cards
                  product={product}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  wishlistCount={wishlistCount}
                  setwishlistData={setwishlistData}
                  wishlistData={wishlistData}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Card;
