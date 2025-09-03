import toast from "react-hot-toast";
import { FaBolt, FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

const Cards = ({
  product,
  cartItems,
  wishlistData,
  setwishlistData,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const isLoggedIn = !!localStorage.getItem("user");

  const existingItem = cartItems.find((item) => item.id === product.id);
  const count = existingItem ? existingItem.qty : 0;

  const handleAddToCart = () => {
    if (!isLoggedIn) return navigate("/signup");

    if (!existingItem) {
      const newCart = [...cartItems, { ...product, qty: 1 }];
      toast("Added to Cart!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      updateCart(newCart);
    }
  };

  const handleIncrement = () => {
    if (!isLoggedIn) return navigate("/signup");

    if (existingItem) {
      const newCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      updateCart(newCart);
    } else {
      const newCart = [...cartItems, { ...product, qty: 1 }];
      updateCart(newCart);
    }
  };

  const handleDecrement = () => {
    if (!isLoggedIn) return navigate("/signup");

    if (existingItem?.qty === 1) {
      const newCart = cartItems.filter((item) => item.id !== product.id);
      updateCart(newCart);
      toast("Removed from Cart!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#F75757",
          color: "#fff",
        },
      });
    } else {
      const newCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      );
      updateCart(newCart);
    }
  };

  const isWishlisted = wishlistData.some((item) => item.id === product.id);

  const handleWishlist = (wishlistproduct) => {
    if (!isLoggedIn) return navigate("/signup");

    if (!isWishlisted) {
      setwishlistData((prev) => [...prev, wishlistproduct]);
      toast("Added to wishlist!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      setwishlistData((prev) =>
        prev.filter((p) => p.id !== wishlistproduct.id)
      );
      toast("Removed from wishlist!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#F75757",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="bg-white w-[100%] border border-gray-200 py-2 rounded-md relative shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)]  overflow-hidden flex  flex-col">
      {isWishlisted ? (
        <FaHeart
          onClick={() => handleWishlist(product)}
          className="absolute right-[8px] top-[10px] cursor-pointer text-lg text-red-500"
        />
      ) : (
        <FaRegHeart
          onClick={() => handleWishlist(product)}
          className="absolute right-[8px] top-[10px] cursor-pointer text-lg text-red-500"
        />
      )}

      <img
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-full h-28 sm:h-32 md:h-40 object-contain cursor-pointer"
        src={product.image}
        alt={product.title}
      />

      <div className="flex flex-col justify-between flex-1 gap-1 sm:p-3">
        <div>
          <h3 className="text-xs mt-3 sm:text-sm font-bold line-clamp-2 text-gray-800">
            {product.title.length > 20
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </h3>
          <h5 className="text-xs sm:text-sm font-bold text-cyan-500 mt-1">
            From ₹{product.price}
          </h5>
        </div>

        <div className="flex flex-col mt-1">
          {count === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1 sm:gap-2 rounded-sm py-1.5 sm:py-2 font-bold 
                       cursor-pointer transition-all duration-300 text-white bg-amber-400 
                       hover:bg-amber-500 hover:shadow-sm active:scale-95 text-xs sm:text-base uppercase"
            >
              <FaBolt className="text-xs sm:text-base" />
              Add to Cart
            </button>
          ) : (
            <>
              <div
                className="w-full flex items-center justify-between rounded-md py-1.5 sm:py-2 px-2 font-semibold 
                          text-white bg-amber-400 transition-all duration-300 hover:shadow-md text-xs sm:text-sm"
              >
                <button
                  onClick={handleDecrement}
                  className="p-1 bg-white text-cyan-600 cursor-pointer rounded-full transition-all duration-200 active:scale-90"
                >
                  <MdDelete size={16} className="sm:size-[18px]" />
                </button>
                <span className="text-xs sm:text-base font-bold">{count}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1 bg-white text-cyan-600 cursor-pointer rounded-full transition-all duration-200 active:scale-90"
                >
                  <FaPlus size={12} className="sm:size-[15px]" />
                </button>
              </div>
              <span className="text-green-700 text-[12px] flex items-center gap-0.5 font-semibold">
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
