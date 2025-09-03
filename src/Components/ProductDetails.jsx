import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = ({ data, setCartItems, setwishlistData }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = data.find((item) => item.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, data]);

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });

    toast("Added to Cart!", {
      icon: "",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setTimeout(() => {
      navigate("/cart");
    }, 1200);
  };

  const handleWishlist = () => {
    setwishlistData((prev) => [...prev, { ...product, qty: 1 }]);
    toast("Added to wishlist!", {
      icon: "",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setTimeout(() => {
      navigate("/wishlist");
    }, 1200);
  };

  return (
    <>
      {product ? (
        <>
          <div className="min-h-screen sm:mt-10 lg:h-[100vh] flex flex-col mb-10 lg:m-0 lg:flex-row items-center justify-center gap-8 p-4">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] flex items-center justify-center bg-gray-200 rounded-2xl p-4 lg:h-[70%]">
              <img
                className="w-[40%] object-contain cursor-pointer"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[35%] flex flex-col gap-3 justify-center lg:px-6">
              <h1 className="text-xl md:text-xl font-semibold">
                {product.title}
              </h1>
              <h4 className="text-lg sm:text-xl font-semibold">
                ₹{product.price}
              </h4>
              <h6 className="text-base sm:text-lg font-medium">
                {product.category}
              </h6>
              <p className="text-sm sm:text-base md:text-base font-normal text-gray-700">
                {product.description.split(" ").slice(0, 35).join(" ") + "..."}
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
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-2xl sm:text-3xl text-[#FFB900]">
            Loading product...
          </p>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
