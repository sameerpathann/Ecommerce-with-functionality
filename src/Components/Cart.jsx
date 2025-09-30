import EmptyCart from "./EmptyCart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) return navigate("/signup");
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://192.168.29.2:7210/api/v1/user/view-cart",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status) {
        const products = response.data.data.products.map((item) => {
          const productDetail = item.productDetail || {};
          const discountedPrice =
            productDetail.discountedPrice || productDetail.price;
          const discountPercent = productDetail.discountPercent || 0;
          return {
            _id: item.productId,
            qty: item.quantity,
            price: productDetail.price || item.price,
            discountedPrice,
            discountPercent,
            totalPrice: item.quantity * discountedPrice,
            name: productDetail.name || "",
            description: productDetail.description || "",
            images: productDetail.images || [],
          };
        });
        setCartItems(products);
        updateTotalAmount(products);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateTotalAmount = (items) => {
    const total = items.reduce((acc, i) => acc + i.totalPrice, 0);
    setTotalAmount(total);
  };

  const updateQtyAPI = async (id, qty) => {
    try {
      if (qty === 0) {
        await axios.post(
          "http://192.168.29.2:7210/api/v1/user/delete-cart-product",
          { productId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://192.168.29.2:7210/api/v1/user/update-cart-product",
          { productId: id, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Update cart API error:", error);
      toast.error("Failed to update cart");
    }
  };

  const handleQtyChange = async (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const newQty =
          type === "inc" ? item.qty + 1 : Math.max(item.qty - 1, 1);
        return {
          ...item,
          qty: newQty,
          totalPrice: newQty * item.discountedPrice,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    updateTotalAmount(updatedCart);
    const updatedQty = updatedCart.find((i) => i._id === id).qty;
    await updateQtyAPI(id, updatedQty);
  };

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmRemove) return;
    try {
      await axios.post(
        "http://192.168.29.2:7210/api/v1/user/delete-cart-product",
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
      updateTotalAmount(updatedCart);
      toast.success("Removed from cart!");
    } catch (error) {
      console.error("Delete cart API error:", error);
      toast.error("Failed to remove product");
    }
  };

  const handleOrder = () => {
    toast.success("Order placed successfully!");
    setCartItems([]);
    setTotalAmount(0);
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
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-semibold mb-3">{error}</p>
        <button
          onClick={fetchCart}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return cartItems.length > 0 ? (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-[60%] h-auto lg:h-screen flex flex-col">
        <div className="flex-1 overflow-y-scroll px-4 py-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="w-full px-4 py-3 flex flex-col gap-5 mb-2 border border-gray-200 shadow rounded-md"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <div className="w-full sm:w-[25%] h-36 sm:h-40 flex-shrink-0">
                  <img
                    className="w-full h-full object-contain"
                    src={item.images?.[0]}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 flex flex-col sm:gap-3 gap-2 sm:justify-center md:justify-center lg:justify-end lg:gap-3">
                  <h1 className="text-base font-semibold">{item.name}</h1>
                  <h2 className="text-sm text-gray-600">
                    {item.description?.slice(0, 100)}...
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h6 className="text-lg font-semibold text-orange-600">
                      ₹{item.totalPrice}
                    </h6>
                    {item.discountPercent > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.price * item.qty}
                      </span>
                    )}
                    {item.discountPercent > 0 && (
                      <span className="text-sm text-green-600 font-semibold">
                        ({item.discountPercent}% off)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex w-[25%] items-center justify-center gap-2">
                  <button
                    onClick={() => handleQtyChange(item._id, "dec")}
                    className="h-8 w-8 border rounded-full font-semibold text-xl flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <div className="h-8 w-10 border flex items-center justify-center text-base font-semibold">
                    {item.qty}
                  </div>
                  <button
                    onClick={() => handleQtyChange(item._id, "inc")}
                    className="h-8 w-8 border rounded-full font-semibold text-xl flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 shadow-inner bg-[#f3f3f3] flex items-center gap-5 sm:justify-between px-4">
          <button
            onClick={() => navigate("/")}
            className="uppercase font-semibold text-white bg-blue-500 w-full sm:w-[30%] h-12 rounded sm:text-lg cursor-pointer hover:bg-blue-600 transition-colors ease-linear"
          >
            Add more Items
          </button>
          <button
            onClick={handleOrder}
            className="uppercase font-semibold text-white bg-orange-500 w-full sm:w-[30%] h-12 rounded sm:text-lg cursor-pointer hover:bg-orange-600 transition-colors ease-linear"
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[40%] h-auto px-3 py-3 flex flex-col mt-5 lg:mt-0">
        <div className="w-full sm:w-[90%] bg-[#fff] shadow rounded">
          <div className="w-full border-b border-gray-300 px-5 py-1">
            <h1 className="uppercase font-semibold text-lg text-gray-500">
              Price Details
            </h1>
          </div>

          <div className="px-5 py-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{item.totalPrice}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart
      title={"Your Cart is Empty!"}
      subHeading={"Add items to it now."}
    />
  );
};

export default Cart;
