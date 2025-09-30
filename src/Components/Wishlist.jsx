import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmptyCart from "./EmptyCart";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const Wishlist = ({ setCartItems, cartItems }) => {
  const navigate = useNavigate();
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateWishlist = (newWishlist) => {
    setWishlistData(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const fetchWishlist = async () => {
    if (!token) return navigate("/signup");
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.29.2:7210/api/v1/wishlist/my-wishlist",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data.data;
      const wishlistArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.list)
        ? data.list
        : [];
      setWishlistData(wishlistArray);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = async (item) => {
    if (!token) return navigate("/signup");
    const product = item.productDetails;
    const existingItem = cartItems.find((cart) => cart._id === item.productId);
    const quantity = existingItem ? existingItem.qty + 1 : 1;

    try {
      await axios.post(
        "http://192.168.29.2:7210/api/v1/user/add-to-cart",
        { productId: item.productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let newCart;
      if (!existingItem) {
        newCart = [...cartItems, { ...product, _id: item.productId, qty: 1 }];
      } else {
        newCart = cartItems.map((cart) =>
          cart._id === item.productId ? { ...cart, qty: cart.qty + 1 } : cart
        );
      }
      updateCart(newCart);

      const newWishlist = wishlistData.filter((w) => w._id !== item._id);
      updateWishlist(newWishlist);

      toast.success("Added to cart successfully!");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loader border-t-yellow-500 border-t-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <>
      {wishlistData.length > 0 ? (
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <h4
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors font-semibold"
            >
              <FaArrowLeft /> Back
            </h4>
          </div>

          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {wishlistData.map((item) => {
              const product = item.productDetails;
              return (
                <div
                  key={item._id}
                  className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-gray-50"
                  />
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h2 className="text-lg font-semibold">
                      {product.name.split(" ").slice(0, 3).join(" ")}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {product.category?.length
                        ? product.category.map((c) => c.title).join(", ")
                        : "N/A"}
                    </p>
                    <div className="text-base font-bold">
                      {product.discountedPrice ? (
                        <>
                          <del className="text-gray-400 mr-2">
                            ₹{product.price}
                          </del>
                          ₹{product.discountedPrice}
                        </>
                      ) : (
                        <>₹{product.price || "Not Found"}</>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-auto cursor-pointer bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyCart
          title={"Your Wishlist is empty!"}
          subHeading={"Seems like you don't have wishes here. Make a wish!"}
        />
      )}
    </>
  );
};

export default Wishlist;
