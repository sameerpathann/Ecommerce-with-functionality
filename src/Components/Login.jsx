import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import loginSvg from "../assets/Login-pana.svg";
import axios from "axios";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async () => {
    const response = await axios.post(
      "http://192.168.29.2:7210/api/v1/user/login",
      formData
    );
    if (response.data.status) {
      if (!localStorage.getItem("loggedInUser")) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.data.profile)
        );
      }
      localStorage.setItem("token", response.data.data.token);
      setformData({ email: "", password: "" });
      toast.success("Login Successful 🎉");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      loginUser();
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-6 bg-gradient-to-r from-[#f0b00095] to-[#e36429ac] px-4">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col md:flex-row items-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-xl p-6">
          <div className="hidden md:flex w-1/2 items-center justify-center">
            <img src={loginSvg} alt="login" className="w-[80%]" />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <div className="pb-7">
              <h1 className="text-center text-3xl font-bold text-orange-500">
                Welcome back
              </h1>
              <h6 className="text-center text-sm text-gray-500">
                Login to continue Shopping
              </h6>
            </div>
            <form onSubmit={handelSubmit} className="flex flex-col gap-6">
              <div>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setformData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  type="text"
                  placeholder="Enter Your Email"
                  className="px-3 py-2 w-full outline-none ring bg-white ring-gray-200 focus:ring-orange-400 rounded-md text-base"
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
                  className="px-3 py-2 w-full outline-none bg-white ring ring-gray-200 focus:ring-orange-400 rounded-md text-base"
                />
                {isShowPassword ? (
                  <FaRegEyeSlash
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 cursor-pointer text-lg text-gray-400"
                  />
                ) : (
                  <FaRegEye
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 cursor-pointer text-lg text-gray-400"
                  />
                )}
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="px-3 py-2 bg-orange-500 hover:bg-orange-600 transition-colors text-lg text-white font-semibold cursor-pointer rounded-md"
              >
                Login
              </button>

              <div className="flex justify-center gap-2">
                <h6 className="text-base text-gray-500">
                  Don't have an account?
                </h6>
                <span
                  onClick={() => navigate("/signup")}
                  className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium"
                >
                  Sign up
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
