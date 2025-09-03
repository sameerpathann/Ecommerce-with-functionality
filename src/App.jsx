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
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [wishlistData, setwishlistData] = useState(
    () => JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("productData")) {
      (async () => {
        try {
          setError(false);
          setLoading(true);
          const response = await axios.get("https://fakestoreapi.com/products");
          setData(response.data);
          localStorage.setItem("productData", JSON.stringify(response.data));
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setLoading(false);
        }
      })();
    } else {
      setData(JSON.parse(localStorage.getItem("productData")));
    }
  }, []);
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const wishlistCount = wishlistData.length;

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
  }, [wishlistData]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handelLogout = (func) => {
    if (typeof func === "function") {
      func((prev) => !prev);
    }
    console.log(user);
    if (user) {
      localStorage.clear();
      setwishlistData([]);
      setCartItems([]);
      toast("Logout Sucessfully!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast("Please Login first!", {
        icon: "",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
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
          user={user}
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
                setLoading={setLoading}
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
