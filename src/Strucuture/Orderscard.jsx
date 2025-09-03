import { IoStar } from "react-icons/io5";

const Orderscard = ({ item }) => {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row rounded-md border border-gray-300 cursor-pointer bg-white shadow-sm transition hover:shadow-[-1px_0px_5px_5px_rgba(0,_0,_0,_0.1)] duration-200">
        <div className="w-full sm:w-[65%] flex flex-col sm:flex-row">
          <div className="w-full sm:w-[25%] flex items-center justify-center p-2">
            <img
              className="h-24 w-24 object-contain"
              src={item.image}
              alt="product"
            />
          </div>

          <div className="w-full sm:w-[75%] flex flex-col justify-center p-2">
            <p className="text-base font-medium">{item.title}</p>
            <h6 className="text-base mt-2">₹{item.price * item.qty}</h6>
          </div>
        </div>

        <div className="w-full sm:w-[35%] flex flex-col justify-center p-3 gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 ${
                item.orderStatus === "Delivered"
                  ? `bg-green-500`
                  : item.orderStatus === "Cancelled"
                  ? `bg-red-500`
                  : item.orderStatus === "On the way"
                  ? `bg-blue-500`
                  : item.orderStatus === "Returned"
                  ? `bg-gray-500`
                  : ""
              } rounded-full`}
            ></div>
            <h3 className="text-sm font-semibold">{item.orderDate}</h3>
          </div>
          <h6
            className={`text-xs ${
              item.orderStatus === "On the way"
                ? `text-blue-400`
                : item.orderStatus === "Delivered"
                ? `text-green-400`
                : item.orderStatus === "Cancelled"
                ? `text-red-500`
                : ""
            } `}
          >
            {item.orderStatus === "On the way"
              ? "Order will deliver soon"
              : item.orderStatus === "Delivered"
              ? "Your item has been delivered"
              : item.orderStatus === "Cancelled"
              ? "Your order is Cancelled"
              : item.orderStatus === "Returned"
              ? "Item is returned"
              : ""}
          </h6>

          <div className="flex items-center gap-2">
            <IoStar className="text-yellow-500" />
            <h3 className="text-sm text-yellow-500 cursor-pointer font-semibold">
              Rate & Review product
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderscard;
