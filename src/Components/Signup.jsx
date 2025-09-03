import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import signupSvg from "../assets/Sign up-pana.svg";
import toast from "react-hot-toast";

const Signup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include uppercase, lowercase, number & special char";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("user", JSON.stringify(formData));
      setformData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Signup Successful 🎉");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#f0b00095] to-[#e36429ac]">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="w-full lg:w-1/2 px-6 py-6">
            <form
              onSubmit={handelSubmit}
              className="w-full flex flex-col justify-between gap-6"
            >
              <div className="pt-2">
                <h1 className="text-center text-3xl font-bold text-orange-500">
                  Create Account
                </h1>
                <h6 className="text-center text-sm mt-2 text-gray-500">
                  Signup to get Started
                </h6>
              </div>
              <div className="flex flex-col gap-5 mt-2">
                <div>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setformData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                    focus:border-orange-400 focus:ring-2 focus:ring-orange-300 
                    rounded-lg text-base"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    value={formData.email}
                    onChange={(e) =>
                      setformData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Enter Your Email"
                    className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                    focus:border-orange-400 focus:ring-2 focus:ring-orange-300 
                    rounded-lg text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    value={formData.password}
                    onChange={(e) =>
                      setformData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="px-3 py-2 bg-white w-full outline-none border border-gray-300 
                    focus:border-orange-400 focus:ring-2 focus:ring-orange-300 
                    rounded-lg text-base"
                  />
                  {isShowPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                    />
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-[#FF7F50] to-[#FF4500] 
                hover:opacity-90 transition-all duration-300 text-lg text-white 
                font-semibold cursor-pointer rounded-lg shadow-md"
              >
                Sign up
              </button>

              <div className="flex justify-center gap-2 text-sm mt-2">
                <h6 className="text-gray-500">Already have an Account?</h6>
                <span
                  onClick={() => navigate("/login")}
                  className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium"
                >
                  Log In
                </span>
              </div>
            </form>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
            <img
              src={signupSvg}
              alt="Signup Illustration"
              className="w-[80%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
