import EmptyCart from "./EmptyCart";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const discount = 0;
  const protectPromiseFees = 0;
  const totalPrice = cartItems.map((item) => {
    return item.price * item.qty;
  });
  const subTotal = totalPrice.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const grandTotal = subTotal - discount - protectPromiseFees;
  const handelRemove = (id) => {
    if (window.confirm("Are You Sure")) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };
  const handelQty = (id, type) => {
    if (type === "inc") {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty }
            : item
        )
      );
    }
  };
  const handelOrder = () => {
    toast.success("Order Successfully");

    const getRandomDate = (type) => {
      const now = new Date();
      let start, end;

      switch (type) {
        case "Last 30 Days":
          start = new Date();
          start.setDate(now.getDate() - 30);
          end = now;
          break;
        case "2024":
          start = new Date(2024, 0, 1);
          end = new Date(2024, 11, 31);
          break;
        case "2023":
          start = new Date(2023, 0, 1);
          end = new Date(2023, 11, 31);
          break;
        case "2022":
          start = new Date(2022, 0, 1);
          end = new Date(2022, 11, 31);
          break;
        case "2021":
          start = new Date(2021, 0, 1);
          end = new Date(2021, 11, 31);
          break;
        default:
          start = new Date(2019, 0, 1);
          end = new Date(2020, 11, 31);
      }

      const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());

      return new Date(randomTime).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const updatedOrders = cartItems.map((item, i) => {
      const orderTimeOptions = [
        "Last 30 Days",
        "2024",
        "2023",
        "2022",
        "2021",
        "Older",
      ];
      const orderTime = orderTimeOptions[i % orderTimeOptions.length];

      return {
        ...item,
        orderStatus: ["On the way", "Delivered", "Cancelled", "Returned"][
          i % 4
        ],
        orderTime,
        orderDate: getRandomDate(orderTime),
        orderId: Date.now() + "-" + item.id,
      };
    });

    const prevOrders = JSON.parse(localStorage.getItem("orderProducts")) || [];
    localStorage.setItem(
      "orderProducts",
      JSON.stringify([...prevOrders, ...updatedOrders])
    );

    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-[60%] h-auto lg:h-screen flex flex-col">
            <div className="flex-1 overflow-y-scroll px-4 py-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full px-4 py-3 flex flex-col gap-5 mb-2 border border-gray-200 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="w-full sm:w-[25%] h-36 sm:h-40 flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 flex flex-col sm:gap-3 gap-2 sm:justify-center md:justify-center lg:justify-end lg:gap-3">
                      <h1 className="text-base font-semibold">
                        {item.title.split(" ").slice(0, 6).join(" ")}
                      </h1>
                      <h2 className="text-sm text-gray-600">
                        {item.description.split(" ").slice(0, 15).join(" ") +
                          "..."}
                      </h2>
                      <h6 className="text-lg font-semibold text-orange-600">
                        ₹{item.price * item.qty}
                      </h6>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex w-[25%] items-center justify-center gap-2">
                      <button
                        onClick={() => handelQty(item.id, "dec")}
                        className="h-8 w-8 border rounded-full font-semibold text-xl flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <div className="h-8 w-10 border flex items-center justify-center text-base font-semibold">
                        {item.qty}
                      </div>
                      <button
                        onClick={() => handelQty(item.id, "inc")}
                        className="h-8 w-8 border rounded-full font-semibold text-xl flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handelRemove(item.id)}
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
                onClick={handelOrder}
                className="uppercase font-semibold text-white bg-orange-500 w-full sm:w-[30%] h-12 rounded sm:text-lg cursor-pointer hover:bg-orange-600 transition-colors ease-linear"
              >
                Place Order
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[40%] h-auto px-3 py-3 flex flex-col  mt-5 lg:mt-0">
            <div className="w-full sm:w-[90%] bg-[#fff] shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded">
              <div className="w-full border-b border-gray-300 px-5 py-1">
                <h1 className="uppercase font-semibold text-lg text-gray-500">
                  Price Details
                </h1>
              </div>

              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">Price</h1>
                  <h1>{subTotal.toFixed(1)}</h1>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">Discount</h1>
                  <h1>{discount}</h1>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">Protect Promise fees</h1>
                  <h1>{protectPromiseFees}</h1>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-dashed  border-gray-300 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Total Amount</h1>
                <h1 className="text-xl">₹{grandTotal.toFixed(1)}</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart
          title={"Your Cart is Empty!"}
          subHeading={"Add items to it now."}
        />
      )}
    </>
  );
};

export default Cart;
