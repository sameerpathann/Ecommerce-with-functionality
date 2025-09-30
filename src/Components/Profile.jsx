import { MdKeyboardArrowRight } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Profile = ({ handelLogout }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: "sameer pathan",
    gender: "male",
    email: "sameerpathan1582004@gmail.com",
    phone: "2133927332",
    address: "221,asdasd asdasd,agada cadad",
    city: "indore",
    state: "madhyapradesh",
    postCode: "452001",
    countryCode: "+91",
    accountStatus: "active",
    image: "",
  });
  const [isEditable, setIsEditable] = useState({
    personalIformation: false,
    email: false,
    phone: false,
  });
  const [Errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const mobileRef = useRef();

  const handelSave = (type) => {
    let updatedUser = { ...loggedInUser };
    let newErrors = { name: "", email: "", phone: "" };

    if (type === "personalDetails") {
      if (!nameRef.current.value.trim()) {
        newErrors.name = "Name is required";
        setErrors(newErrors);
        return;
      }
      updatedUser.name = nameRef.current.value.trim();
      let selectedGender = document.querySelector(
        'input[name="gender"]:checked'
      )?.value;
      if (selectedGender) updatedUser.gender = selectedGender;
      setIsEditable((prev) => ({ ...prev, personalIformation: false }));
    }

    if (type === "email") {
      if (!emailRef.current.value.trim()) {
        newErrors.email = "Email is required";
        setErrors(newErrors);
        return;
      }
      updatedUser.email = emailRef.current.value.trim();
      setIsEditable((prev) => ({ ...prev, email: false }));
    }

    if (type === "phone") {
      if (!mobileRef.current.value.trim()) {
        newErrors.phone = "Phone is required";
        setErrors(newErrors);
        return;
      }
      updatedUser.phone = mobileRef.current.value.trim();
      setIsEditable((prev) => ({ ...prev, phone: false }));
    }

    setErrors(newErrors);
    setLoggedInUser(updatedUser);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row px-4 lg:px-16 py-4 gap-4 relative">
      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold w-fit"
      >
        Show Menu
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-white shadow-lg z-50 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-[25%] flex flex-col gap-3`}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <IoMdClose className="text-2xl text-gray-600" />
          </button>
        </div>

        <div className="h-[90px] bg-white flex border-b border-gray-200 rounded-xs">
          <div className="w-[27%] h-full flex items-center justify-center">
            <img
              className="h-full cursor-pointer w-[60%]"
              src={
                loggedInUser.image ||
                "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
              }
              alt=""
            />
          </div>
          <div className="w-[73%] h-full flex justify-center gap-1 flex-col">
            <span className="text-xs font-semibold text-gray-500">Hello,</span>
            <h1 className="font-semibold text-base capitalize">
              {loggedInUser?.name || "Guest"}
            </h1>
          </div>
        </div>

        <div className="w-full h-full flex flex-col shadow-md bg-white rounded-xs gap-2">
          <div
            onClick={() => navigate("/profile/order")}
            className="md:h-[15%] sm:py-6 sm:px-6 py-4 lg:px-8 px-4 border-b border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <FaBoxes className="text-yellow-500 text-xl" />
              <h1 className="text-gray-500 uppercase font-semibold hover:text-yellow-400 transition-colors text-base md:text-base cursor-pointer">
                My Orders
              </h1>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-gray-500 cursor-pointer" />
          </div>
          <div className="md:h-[15%] sm:py-6 sm:px-6 py-4 lg:px-8 px-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <FaUser className="text-yellow-500 text-xl" />
              <h1 className="text-gray-500 uppercase font-semibold hover:text-yellow-400 transition-colors text-base md:text-base cursor-pointer">
                Account Settings
              </h1>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-gray-500 cursor-pointer" />
          </div>
          <div className="md:h-[15%] sm:py-6 sm:px-6 py-4 lg:px-8 px-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <FaWallet className="text-yellow-500 text-xl" />
              <h1 className="text-gray-500 uppercase font-semibold hover:text-yellow-400 transition-colors text-base md:text-base cursor-pointer">
                Payments
              </h1>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-gray-500 cursor-pointer" />
          </div>
          <div className="md:h-[15%] sm:py-6 sm:px-6 py-4 lg:px-8 px-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <FaFolderOpen className="text-yellow-500 text-xl" />
              <h1 className="text-gray-500 uppercase font-semibold hover:text-yellow-400 transition-colors text-base md:text-base cursor-pointer">
                My Stuff
              </h1>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-gray-500 cursor-pointer" />
          </div>
          <div
            onClick={handelLogout}
            className="flex md:h-[15%] sm:py-6 sm:px-6 py-4 lg:px-8 px-4 items-center justify-between border-b border-gray-200"
          >
            <div className="flex items-center gap-5">
              <FaPowerOff className="text-yellow-500 text-xl" />
              <h1 className="text-gray-500 uppercase font-semibold hover:text-yellow-400 transition-colors text-base md:text-base cursor-pointer">
                Logout
              </h1>
            </div>
            <MdKeyboardArrowRight className="text-2xl text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[70%] flex flex-col gap-y-10 px-4 lg:px-6 py-6 shadow-md rounded-xs bg-white">
        <div>
          <div className="flex items-center gap-6 lg:w-[35%] justify-between">
            <h1 className="lg:text-lg text-xs font-semibold">
              Personal Information
            </h1>
            <h6
              onClick={() =>
                setIsEditable((prev) => ({
                  ...prev,
                  personalIformation: !prev.personalIformation,
                }))
              }
              className="text-sm font-semibold text-yellow-500 cursor-pointer"
            >
              {isEditable.personalIformation ? "Cancel" : "Edit"}
            </h6>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <input
              ref={nameRef}
              defaultValue={loggedInUser?.name || ""}
              disabled={!isEditable.personalIformation}
              className={`px-3 rounded-xs outline-none py-3.5 ring ring-gray-300 focus:ring-yellow-500 w-[60%] capitalize text-sm ${
                isEditable.personalIformation
                  ? "cursor-pointer"
                  : "cursor-not-allowed text-gray-500"
              }`}
              type="text"
            />
          </div>
          <div className="flex gap-6 mt-2 flex-wrap">
            <label
              className={`flex gap-2 items-center text-base ${
                isEditable.personalIformation
                  ? "text-gray-600 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="male"
                defaultChecked={loggedInUser?.gender === "male"}
                disabled={!isEditable.personalIformation}
                className="w-4 h-4"
              />
              Male
            </label>
            <label
              className={`flex gap-2 items-center text-base ${
                isEditable.personalIformation
                  ? "text-gray-600 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="female"
                defaultChecked={loggedInUser?.gender === "female"}
                disabled={!isEditable.personalIformation}
                className="w-4 h-4"
              />
              Female
            </label>
          </div>
          {isEditable.personalIformation && (
            <button
              onClick={() => handelSave("personalDetails")}
              className="bg-yellow-500 mt-4 py-2 px-10 text-white rounded-xs cursor-pointer uppercase text-sm md:text-lg font-semibold"
            >
              Save
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-6 lg:w-[35%] justify-between">
            <h1 className="lg:text-lg text-xs font-semibold">Email Address</h1>
            <h6
              onClick={() =>
                setIsEditable((prev) => ({ ...prev, email: !prev.email }))
              }
              className="text-sm font-semibold text-yellow-500 cursor-pointer"
            >
              {isEditable.email ? "Cancel" : "Edit"}
            </h6>
          </div>
          <input
            ref={emailRef}
            defaultValue={loggedInUser?.email || ""}
            disabled={!isEditable.email}
            className={`rounded-md outline-none text-sm px-3 py-3.5 ring ring-gray-300 focus:ring-yellow-500 flex-1 min-w-[60%] ${
              isEditable.email
                ? "cursor-pointer"
                : "cursor-not-allowed text-gray-500"
            }`}
            type="text"
          />
          {isEditable.email && (
            <button
              onClick={() => handelSave("email")}
              className="bg-yellow-500 py-2 px-10 text-white rounded-xs uppercase text-sm md:text-lg font-semibold cursor-pointer"
            >
              Save
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-6 lg:w-[35%] justify-between">
            <h1 className="lg:text-lg text-xs md:text-base font-semibold">
              Mobile Number
            </h1>
            <h6
              onClick={() =>
                setIsEditable((prev) => ({ ...prev, phone: !prev.phone }))
              }
              className="text-sm font-semibold text-yellow-500 cursor-pointer"
            >
              {isEditable.phone ? "Cancel" : "Edit"}
            </h6>
          </div>
          <input
            ref={mobileRef}
            defaultValue={loggedInUser?.phone || ""}
            disabled={!isEditable.phone}
            className={`px-3 py-3.5 rounded-md outline-none ring ring-gray-300 focus:ring-yellow-500 flex-1 min-w-[60%] ${
              isEditable.phone
                ? "cursor-pointer"
                : "cursor-not-allowed text-gray-500"
            }`}
            type="text"
          />
          {isEditable.phone && (
            <button
              onClick={() => handelSave("phone")}
              className="bg-yellow-500 py-2 px-10 text-white rounded-xs uppercase text-sm md:text-lg font-semibold"
            >
              Save
            </button>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-lg font-semibold">Address</h1>
          <p>
            {loggedInUser.address}, {loggedInUser.city}, {loggedInUser.state} -{" "}
            {loggedInUser.postCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
