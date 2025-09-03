import { FiAlertCircle } from "react-icons/fi";

const Errormsg = ({ message = "Something went wrong!" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center p-4">
      <div className="text-red-500 mb-4 animate-bounce">
        <FiAlertCircle size={60} />
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-2 animate-pulse">
        Oops!
      </h2>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

export default Errormsg;
