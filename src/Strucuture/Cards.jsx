import toast from "react-hot-toast";
import { FaBolt, FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";

const Cards = ({
  product,
  cartItems,
  wishlistData,
  setwishlistData,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const isLoggedIn = !!token;
  const existingItem = cartItems.find((item) => item._id === product._id);
  const count = existingItem ? existingItem.qty : 0;

  const addToCartAPI = async (productId, qty) => {
    try {
      await axios.post(
        "http://192.168.29.2:7210/api/v1/user/add-to-cart",
        { productId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Add to Cart API error:", error);
      toast.error("Failed to add to cart!");
    }
  };

  const updateCartAPI = async (productId, qty) => {
    try {
      if (qty === 0) {
        await axios.post(
          "http://192.168.29.2:7210/api/v1/user/delete-cart-product",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://192.168.29.2:7210/api/v1/user/update-cart-product",
          { productId, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Update Cart API error:", error);
      toast.error("Failed to update cart!");
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) return navigate("/signup");
    const newQty = 1;
    const newCart = [...cartItems, { ...product, qty: newQty }];
    updateCart(newCart);
    addToCartAPI(product._id, newQty);
    toast.success("Added to cart successfully!");
  };

  const handleIncrement = () => {
    if (!isLoggedIn) return navigate("/signup");
    if (!existingItem) return handleAddToCart();
    const newQty = existingItem.qty + 1;
    const newCart = cartItems.map((item) =>
      item._id === product._id ? { ...item, qty: newQty } : item
    );
    updateCart(newCart);
    updateCartAPI(product._id, newQty);
  };

  const handleDecrement = () => {
    if (!isLoggedIn) return navigate("/signup");
    if (!existingItem) return;
    const newQty = existingItem.qty - 1;
    if (newQty <= 0) {
      const newCart = cartItems.filter((item) => item._id !== product._id);
      updateCart(newCart);
      updateCartAPI(product._id, 0);
      toast.success("Removed from Cart!");
    } else {
      const newCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, qty: newQty } : item
      );
      updateCart(newCart);
      updateCartAPI(product._id, newQty);
    }
  };

  const isWishlisted = wishlistData.some((item) => item._id === product._id);

  const handleWishlist = async () => {
    if (!isLoggedIn) return navigate("/signup");
    const apiUrl = "http://192.168.29.2:7210/api/v1/wishlist/add-to-wishlist";
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { productId: product._id };
    try {
      await axios.post(apiUrl, body, config);
      if (isWishlisted) {
        setwishlistData((prev) =>
          prev.filter((item) => item._id !== product._id)
        );
        toast.success("Removed from wishlist!");
      } else {
        setwishlistData((prev) => [...prev, product]);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      console.error("Wishlist API error:", err);
      toast.error("Failed to update wishlist!");
    }
  };

  return (
    <div className="bg-white w-full max-w-[285px] border border-gray-200 py-2 rounded-md shadow-md overflow-hidden flex flex-col relative">
      <div
        onClick={handleWishlist}
        className="absolute right-2 top-2 cursor-pointer text-lg"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-red-500" />
        )}
      </div>

      <div
        className="w-full h-40 flex items-center justify-center bg-gray-50 cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 gap-2 p-3">
        <div>
          <h3 className="text-sm font-bold line-clamp-2 text-gray-800">
            {product.name.length > 25
              ? product.name.split(" ").slice(0, 3) + "..."
              : product.name}
          </h3>
          <h5 className="text-sm font-bold text-cyan-500 mt-1">
            ₹{product.discountedPrice || product.price}
          </h5>
        </div>

        <div className="flex flex-col gap-2">
          {count === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 rounded-md py-2 font-bold text-white bg-amber-400 hover:bg-amber-500 hover:shadow-md transition-all text-sm uppercase cursor-pointer"
            >
              <FaBolt /> Add to Cart
            </button>
          ) : (
            <>
              <div className="w-full flex items-center justify-between rounded-md py-2 px-2 font-semibold text-white bg-amber-400 transition-all hover:shadow-md text-sm">
                <button
                  onClick={handleDecrement}
                  className="p-1 bg-white text-cyan-600 rounded-full transition-transform active:scale-90 cursor-pointer"
                >
                  <MdDelete size={18} />
                </button>
                <span className="font-bold">{count}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1 bg-white text-cyan-600 rounded-full transition-transform active:scale-90 cursor-pointer"
                >
                  <FaPlus size={16} />
                </button>
              </div>
              <span className="text-green-700 text-[12px] flex items-center gap-1 font-semibold">
                <FaCircleCheck /> Added To Cart
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
