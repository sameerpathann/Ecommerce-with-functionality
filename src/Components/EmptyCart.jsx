import { useNavigate } from "react-router-dom";

const EmptyCart = ({ title, subHeading }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[30%] max-w-md h-auto flex flex-col items-center gap-6">
        <div className="w-52 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 flex rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="empty cart"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3 text-center">
          <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
          <h6 className="text-sm sm:text-base text-gray-600">{subHeading}</h6>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-1/2 py-2 cursor-pointer text-white text-base bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
