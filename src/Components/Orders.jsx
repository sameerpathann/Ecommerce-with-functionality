import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Orderscard from "../Strucuture/Orderscard";
import { FaFilter } from "react-icons/fa6";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orderProducts")) || [];
    setAllOrders(orders);
    setFilteredOrders(orders);
  }, []);

  const applyFilters = (
    searchValue = query,
    statuses = selectedStatuses,
    times = selectedTimes
  ) => {
    let results = allOrders;

    if (searchValue.trim() !== "") {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (statuses.length > 0) {
      results = results.filter((item) => statuses.includes(item.orderStatus));
    }

    if (times.length > 0) {
      results = results.filter((item) => {
        const orderDate = new Date(item.orderTime);
        const year = orderDate.getFullYear();
        const now = new Date();

        return times.some((t) => {
          if (t === "Last 30 Days") {
            const diff = (now - orderDate) / (1000 * 60 * 60 * 24);
            return diff <= 30;
          }
          if (t === "Older") {
            return year < 2021;
          }
          return year.toString() === t;
        });
      });
    }

    setFilteredOrders(results);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    applyFilters(value);
  };

  const handelStatusFilter = (status) => {
    let updated = [...selectedStatuses];
    if (updated.includes(status)) {
      setShowFilters((prev) => !prev);
      updated = updated.filter((s) => s !== status);
    } else {
      updated.push(status);
      setShowFilters((prev) => !prev);
    }
    setSelectedStatuses(updated);
    applyFilters(query, updated, selectedTimes);
  };

  const handelTimeFilter = (time) => {
    let updated = [...selectedTimes];
    if (updated.includes(time)) {
      updated = updated.filter((t) => t !== time);
      setShowFilters((prev) => !prev);
    } else {
      updated.push(time);
      setShowFilters((prev) => !prev);
    }
    setSelectedTimes(updated);
    applyFilters(query, selectedStatuses, updated);
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row gap-2 px-3 py-6 relative">
      <div
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-[70%] sm:w-[50%] lg:w-[22%] bg-white sm:shadow-2xl shadow-[inset_0px_0px_20px_5px_rgba(0,_0,_0,_0.1)] rounded-r-lg lg:rounded-lg p-4 font-semibold z-50 transform transition-transform duration-300 ${
          showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h1 className="text-xl">Filters</h1>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-600 hover:text-black"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <h1 className="text-xl hidden lg:block mb-4">Filters</h1>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm uppercase">Order Status</h2>
          {["On the way", "Delivered", "Cancelled", "Returned"].map(
            (status, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-sm font-normal cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => handelStatusFilter(status)}
                />
                {status}
              </label>
            )
          )}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <h2 className="text-sm uppercase">Order Time</h2>
          {["Last 30 Days", "2024", "2023", "2022", "2021", "Older"].map(
            (time, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-sm font-normal cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={selectedTimes.includes(time)}
                  onChange={() => handelTimeFilter(time)}
                />
                {time}
              </label>
            )
          )}
        </div>
      </div>

      <div className="w-full lg:w-[78%] flex flex-col  gap-4">
        <div className="flex sm:flex-row gap-2 w-full px-3 justify-between">
          <div className="h-full flex items-center">
            <h1 className="sm:text-xl text-base font-semibold">
              Filter Orders
            </h1>
          </div>
          <div className="sm:w-[50%] w-[70%] relative h-full flex justify-end">
            <input
              onChange={handleSearch}
              value={query}
              type="text"
              placeholder="Search your orders here"
              className="border rounded-md h-10 px-3 w-full lg:w-[70%] bg-white border-gray-300 focus:border-yellow-500 outline-none"
            />
            <button
              onClick={() => applyFilters(query)}
              className="bg-yellow-500 absolute right-[38px] lg:right-[0] cursor-pointer h-10 rounded-r-md font-semibold flex items-center justify-center sm:gap-2 sm:text-sm text-white sm:w-auto w-fit px-4 top-0  gap-1 text-xs"
            >
              <IoSearchSharp className="text-lg" />
            </button>

            <FaFilter
              onClick={() => setShowFilters(true)}
              className="text-3xl lg:hidden text-yellow-500 cursor-pointer ml-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto px-3 py-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((item, i) => <Orderscard key={i} item={item} />)
          ) : (
            <div className="text-center text-gray-500 font-medium py-10">
              No orders found 🚫
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
