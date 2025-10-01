import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Wishlist from "./Components/Wishlist";
import ProductDetails from "./Components/ProductDetails";
import axios from "axios";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile";
import toast from "react-hot-toast";
import Orders from "./Components/orders";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistData, setwishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.post(
          "http://192.168.29.2:7210/api/v1/product/list-user",
          { search: "" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const productList = Array.isArray(response.data.data?.list)
          ? response.data.data.list
          : [];

        setData(productList);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const wishlistCount = wishlistData.length;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handelLogout = (toggleFunc) => {
    if (typeof toggleFunc === "function") toggleFunc((prev) => !prev);

    if (user) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      setwishlistData([]);
      setCartItems([]);
      toast("Logout Successfully!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } else {
      toast("Please Login first!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-100">
        <Header
          search={search}
          setSearch={setSearch}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          handelLogout={handelLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlistCount={wishlistCount}
                setwishlistData={setwishlistData}
                wishlistData={wishlistData}
                data={data}
                error={error}
                loading={loading}
                filteredData={filteredData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  cartCount={cartCount}
                  wishlistData={wishlistData}
                  setwishlistData={setwishlistData}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails
                  data={data}
                  setCartItems={setCartItems}
                  setwishlistData={setwishlistData}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile handelLogout={handelLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/order"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
