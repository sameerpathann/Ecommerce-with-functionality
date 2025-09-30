import logo from "../assets/logo.png";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart, FaUserCircle, FaAngleDown } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import Profile from "./Profile";
const Header = ({ search, setSearch, cartCount, wishlistCount }) => {
  const [userProfile, setUserProfile] = useState();
  const [isTimOpen, setisTimOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  return (
    <>
      <div className="relative w-full h-[12%] flex items-center justify-between py-2 bg-white top-0 px-6">
        <div className="flex items-center w-[80%] lg:gap-48  gap-10">
          <div className="w-28 h-16 flex items-center">
            <img
              onClick={() => navigate("/")}
              className="w-full cursor-pointer h-full object-contain"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="relative w-[55%] lg:w-[40%]  hidden sm:flex items-center justify-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none p-2 border rounded-md bg-white border-gray-300 focus:border-yellow-500"
              type="text"
              placeholder="Search for products, Brand, and more"
            />
            <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-yellow-500 rounded-r-md cursor-pointer">
              <IoSearchSharp className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="flex items-center lg:gap-3 lg:w-[20%] justify-end">
          <div
            onClick={() => setisTimOpen((prev) => !prev)}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <div className="relative flex items-center justify-center h-10 w-10">
              {userProfile?.image ? (
                <img
                  className="w-full h-full rounded-full"
                  src={Profile.image}
                  alt=""
                />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
            </div>
            <div className="flex items-center">
              <h4 className="hidden md:block capitalize">
                {userProfile?.name.split(" ")[0] || "Guest"}
              </h4>
              <FaAngleDown className="md:text-[22px] md:mt-1" />
            </div>
          </div>

          <div
            className="relative flex items-center gap-2 cursor-pointer  pl-4"
            onClick={() => navigate("/wishlist")}
          >
            <div className="relative">
              <FaRegHeart className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {wishlistCount}
                </span>
              )}
            </div>
            <h4 className="hidden md:block">Wishlist</h4>
          </div>

          <div
            className="relative flex items-center gap-2 cursor-pointer pl-4"
            onClick={() => navigate("/cart")}
          >
            <div className="relative">
              <RiShoppingCart2Line className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
            <h4 className="hidden md:block">Cart</h4>
          </div>
        </div>
        <div
          className={`w-[35%] h-[120%] top-[60px] right-[70px] sm:w-[15%] sm:right-[80px] sm:top-[65px] md:right-[190px] lg:w-[13%] lg:right-[220px] absolute  z-1 bg-white shadow-[0px_0px_7px_6px_rgba(0,_0,_0,_0.1)] rounded-md overflow-auto ${
            isTimOpen ? `block` : `hidden`
          }`}
        >
          <div
            onClick={() => {
              navigate("/profile");
              setisTimOpen((prev) => !prev);
            }}
            className="flex items-center px-2 hover:bg-[#e7e5e5] h-[50%] border-b cursor-pointer transition-colors justify-between border-gray-300 text-base"
          >
            <h6 className="text-sm sm:text-lg md:text-lg lg:text-xl">
              Profile
            </h6>
            <FaUserCircle className="lg:text-lg" />
          </div>

          <div
            onClick={() => {
              navigate("/Login");
              setisTimOpen((prev) => !prev);
            }}
            className="flex items-center px-2 hover:bg-[#e7e5e5] h-[50%] border-b cursor-pointer transition-colors justify-between border-gray-300 text-base"
          >
            <h6 className="text-sm sm:text-lg md:text-lg lg:text-xl">Login</h6>
            <RiLoginBoxLine className="lg:text-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
