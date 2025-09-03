import { useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-around pt-10 pb-6 relative bg-white">
      <div
        className="
          w-[85%] gap-6 flex flex-wrap 
          justify-between 
          border-t border-gray-400 border-b border-dashed
          pt-8 pb-14
        "
      >
        <div className="w-full sm:w-[40%] lg:w-[19%] ">
          <div className="flex flex-col gap-4">
            <img
              onClick={() => navigate("/")}
              className="lg:h-[40px] sm:w-[65%] w-[32%] cursor-pointer"
              src={logo}
              alt=""
            />
            <h6 className="text-sm font-semibold text-gray-500  cursor-pointer">
              69 Selous Ave, Harare, Zimbabwe <br /> support(+263)030000052
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold  cursor-pointer mt-7">
              Info@demo.com
            </h6>
          </div>
        </div>

        <div className="w-full sm:w-[48%] lg:w-[15%] ">
          <h1 className="text-lg font-semibold mb-2">Help Center</h1>
          <div className="flex flex-col gap-3">
            <h6 className="text-sm font-semibold text-gray-500 cursor-pointer">
              FAQ
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              About Ecommerce
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Support Ticket
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Contact Us
            </h6>
          </div>
        </div>

        <div className="w-full sm:w-[45%] lg:w-[15%] mb-6 lg:mb-0">
          <h1 className="text-lg font-semibold mb-2">Quick Links</h1>
          <div className="flex flex-col gap-3">
            <h6 className="text-sm font-semibold text-gray-500 cursor-pointer">
              Become A Supplier
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Track Order
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Services & Membership
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Help & Community
            </h6>
          </div>
        </div>

        <div className="w-full sm:w-[45%] lg:w-[18%] mb-6 lg:mb-0">
          <h1 className="text-lg font-semibold mb-2">Buy on E-Commerce</h1>
          <div className="flex flex-col gap-2">
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Term & Conditions
            </h6>
            <h6 className="text-sm text-gray-500 font-semibold cursor-pointer">
              Privacy & Rules
            </h6>
          </div>
        </div>

        <div className="w-full sm:w-[45%] lg:w-[22%]">
          <h1 className="text-lg font-bold mb-1">Download App</h1>
          <div className="flex lg:gap-2 gap-2">
            <img
              className="lg:w-[40%] w-[40%] sm:h-[50px] object-contain cursor-pointer"
              src="https://cdn.pixabay.com/photo/2021/09/22/16/07/google-play-6647242_640.png"
              alt="Google Play"
            />
            <img
              className="lg:w-[40%] w-[40%] sm:h-[50px] object-contain cursor-pointer"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17Dlfop0XoXj0yd3Q_B_io3z4W6koxAOpYg&s"
              alt="App Store"
            />
          </div>
        </div>
      </div>

      <div className="w-[85%] flex flex-col sm:flex-row justify-between items-center mt-6">
        <h6 className="text-xs cursor-pointer font-semibold text-gray-500">
          ©2021 E-Commerce All Rights Reserved
        </h6>

        <div className="flex items-center gap-3">
          <h6 className="text-sm text-gray-500 font-semibold">
            Stay Connected :
          </h6>
          <FaFacebookF className="text-gray-500 cursor-pointer" />
          <FaTwitter className="text-gray-500 cursor-pointer" />
          <FaInstagram className="text-gray-500 cursor-pointer" />
          <FaPinterest className="text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="w-8 h-8 rounded cursor-pointer bg-cyan-600 text-white flex items-center justify-center absolute right-[10px] bottom-[10px]">
        <IoIosArrowUp
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg"
        />
      </div>
    </div>
  );
};

export default Footer;
