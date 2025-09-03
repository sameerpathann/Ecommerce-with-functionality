import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";
import Slider from "react-slick";

const ImageSlider = () => {
  const settings = {
    dots: false,
    fade: true,
    arrows: false,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return (
    <div className="slider-container w-full h-full px-3 py-5">
      <Slider {...settings}>
        <div className="rounded-md h-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={banner1}
            alt=""
          />
        </div>
        <div className="rounded-md h-full overflow-hidden">
          <img src={banner2} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
