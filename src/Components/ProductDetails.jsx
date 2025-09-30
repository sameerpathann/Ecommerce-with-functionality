import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = ({
  data,
  setCartItems,
  wishlistData,
  setwishlistData,
}) => {
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const foundProduct = data.find((item) => item._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
    }
  }, [id, data]);

  const handleAddToCart = async () => {
    if (!token) return navigate("/signup");
    try {
      const body = { productId: product._id, quantity: 1 };
      await axios.post(
        "http://192.168.29.2:7210/api/v1/user/add-to-cart",
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item._id === product._id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          return [...prev, { ...product, qty: 1 }];
        }
      });

      toast.success("Added to Cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    if (!token) return navigate("/signup");
    const isAlreadyWishlisted = wishlistData?.some(
      (item) => item._id === product._id
    );
    if (isAlreadyWishlisted) {
      toast("Already in Wishlist!");
      return;
    }
    try {
      const body = { productId: product._id };
      await axios.post(
        "http://192.168.29.2:7210/api/v1/wishlist/add-to-wishlist",
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setwishlistData((prev) => [...prev, { ...product, qty: 1 }]);
      toast.success("Added to Wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl sm:text-3xl text-[#FFB900]">
          Loading product...
        </p>
      </div>
    );
  }

  const selectedImage = product.images?.[selectedImageIndex] || "";

  return (
    <div className="min-h-screen sm:mt-10 lg:h-[100vh] flex flex-col mb-10 lg:m-0 lg:flex-row items-center justify-center gap-8 p-4">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center bg-gray-200 rounded-2xl p-4 lg:h-[80%]">
        <div className="w-full flex justify-center mb-4">
          <img
            className="w-[60%] h-[300px] object-contain"
            src={selectedImage}
            alt={product.title || "Product"}
          />
        </div>

        <div className="flex gap-2 mt-2">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.title || "Product"}
              className={`w-20 h-20 object-contain rounded cursor-pointer border transition-all ${
                idx === selectedImageIndex
                  ? "border-orange-500 scale-105"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[35%] flex flex-col gap-3 justify-center lg:px-6">
        <h1 className="text-xl md:text-xl font-semibold">
          {product.name || "Product"}
        </h1>

        <div className="flex items-center gap-2">
          {product.discountedPrice ? (
            <>
              <span className="text-lg sm:text-xl font-semibold text-orange-600">
                ₹{product.discountedPrice}
              </span>
              <del className="text-gray-400">
                ₹
                {typeof product.price === "number"
                  ? product.price
                  : product.price?.price || 0}
              </del>
            </>
          ) : (
            <span className="text-lg sm:text-xl font-semibold text-orange-600">
              ₹
              {typeof product.price === "number"
                ? product.price
                : product.price?.price || 0}
            </span>
          )}
        </div>

        <h6 className="text-base sm:text-lg font-medium">
          {product.category?.title || "category not found"}
        </h6>

        <p className="text-sm sm:text-base md:text-base font-normal text-gray-700">
          {product.description?.split(" ").slice(0, 35).join(" ") + "..."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-2 py-1 rounded-md cursor-pointer font-semibold text-base sm:text-lg hover:opacity-90"
          >
            Add To Cart
          </button>
          <button
            onClick={handleWishlist}
            className="bg-[#f75757] hover:bg-[#fe4141] transition-all text-white px-2 py-1 rounded-md cursor-pointer font-semibold text-base sm:text-lg"
          >
            Add To Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
