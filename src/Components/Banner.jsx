import { MdOutlineEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import newLatter from "../assets/newslatter.jpg";

const Banner = () => {
  return (
    <div className="relative w-full h-[30vh] sm:h-[35vh] lg:h-[25vh] mt-10 mb-10 flex items-center justify-center px-6">
      <div className="w-full h-full rounded-md overflow-hidden relative">
        <img
          className="w-full h-full object-cover rounded-md"
          src={newLatter}
          alt="Newsletter"
        />

        <div className="absolute inset-0 flex flex-col  lg:pl-52 items-center justify-center md:items-start text-white w-full h-full p-2">
          <div className="w-[90%] flex flex-col gap-2 sm:w-[70%] md:w-[50%] h-[70%]">
            <h1 className="md:text-xl lg:text-2xl font-bold">
              Join Our Newsletter
            </h1>
            <div className="w-full h-[60%] pl-2 px-1 rounded-md bg-white flex items-center">
              <span className="bg-cyan-100 p-2 rounded">
                <MdOutlineEmail className="text-cyan-600 text-lg font-bold" />
              </span>
              <input
                required={true}
                type="email"
                placeholder="Enter your Email"
                className="w-[70%] px-2 py-2.5 rounded-md  focus:outline-none text-black text-sm sm:text-base placeholder:font-semibold placeholder:text-black"
              />
              <button className="bg-yellow-500 cursor-pointer text-white px-4 py-1.5 sm:py-2.5  rounded-sm flex items-center gap-2 text-sm sm:text-base">
                Subscribe <FaArrowRight className="font-semibold" size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
