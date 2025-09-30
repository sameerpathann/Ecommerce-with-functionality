import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    socialPlatform: "email",
    socialId: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const ragisterUser = async () => {
    const response = await axios.post(
      "http://192.168.29.2:7210/api/v1/user/create",
      formData
    );
    console.log(response);
    if (response.data.status) {
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.data));
      setformData({
        name: "",
        gender: "",
        email: "",
        password: "",
        countryCode: "+91",
        phone: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        postCode: "",
        socialPlatform: "email",
        socialId: "",
      });
      toast.success(`Register Successfully`);
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  };

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

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      ragisterUser();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-r from-[#f0b00095] to-[#e36429ac]">
      <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[65%] h-auto shadow-2xl rounded-2xl p-8 bg-gradient-to-br from-orange-50 to-orange-100">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            <div>
              <input
                value={formData.name}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                placeholder="Full Name"
                className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <input
                value={formData.email}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="text"
                placeholder="Email"
                className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
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
                placeholder="Password"
                className="px-3 py-2 bg-white w-full outline-none border border-gray-300 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
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
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex gap-3">
              <input
                value={formData.countryCode}
                onChange={(e) =>
                  setformData((prev) => ({
                    ...prev,
                    countryCode: e.target.value,
                  }))
                }
                type="text"
                placeholder="+91"
                className="px-3 py-2 w-20 bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
              />
              <input
                value={formData.phone}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, phone: e.target.value }))
                }
                type="text"
                placeholder="Phone Number"
                className="px-3 py-2 flex-1 bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm -mt-2">{errors.phone}</p>
            )}

            <div>
              <input
                value={formData.dob}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, dob: e.target.value }))
                }
                type="date"
                placeholder="Date of Birth"
                className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <input
              value={formData.address}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, address: e.target.value }))
              }
              type="text"
              placeholder="Address"
              className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base col-span-2"
            />

            <input
              value={formData.city}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, city: e.target.value }))
              }
              type="text"
              placeholder="City"
              className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
            />

            <input
              value={formData.state}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, state: e.target.value }))
              }
              type="text"
              placeholder="State"
              className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
            />

            <input
              value={formData.postCode}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, postCode: e.target.value }))
              }
              type="text"
              placeholder="Postal Code"
              className="px-3 py-2 w-full bg-white outline-none border border-gray-300 
                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 rounded-lg text-base"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-3 bg-gradient-to-r from-[#FF7F50] to-[#FF4500] 
              hover:opacity-90 transition-all duration-300 text-lg text-white 
              font-semibold cursor-pointer rounded-lg shadow-md mt-4"
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
    </div>
  );
};

export default Signup;
