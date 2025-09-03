import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import { FaArrowLeft } from "react-icons/fa";
const Wishlist = ({
  wishlistData,
  setwishlistData,
  setCartItems,
  cartItems,
}) => {
  const navigate = useNavigate();
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateWishlist = (newWishlist) => {
    setwishlistData(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (!existingItem) {
      const newCart = [...cartItems, { ...product, qty: 1 }];
      updateCart(newCart);
    } else {
      const newCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      updateCart(newCart);
    }

    const newWishlist = wishlistData.filter((item) => item.id !== product.id);
    updateWishlist(newWishlist);
  };

  const handleRemoveFromWishlist = (productId) => {
    if (window.confirm("Are you sure ?")) {
      const newWishlist = wishlistData.filter((item) => item.id !== productId);
      updateWishlist(newWishlist);
    }
  };

  return (
    <>
      {wishlistData.length > 0 ? (
        <div className="whishlist-wrapper">
          <div className="whishlist-container">
            <div className="wishlist-header flex items-center justify-between">
              <h1>My Wishlist</h1>
              <h4
                onClick={() => navigate("/")}
                className="text-base flex items-center gap-2 font-semibold text-gray-400 hover:text-gray-500 transition-colors cursor-pointer ease-linear"
              >
                <FaArrowLeft className="text-base" /> Back
              </h4>
            </div>

            <div className="hidden wishlist-table md:block">
              <table cellSpacing={"15"} className="wishlist-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistData?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          className="img cursor-pointer"
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td>{item.title.split(" ").slice(0, 3).join(" ")}</td>
                      <td>₹{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="wishlist-button"
                        >
                          Add To Cart
                        </button>
                        <button
                          style={{ background: "red" }}
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="wishlist-button ml-2"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden space-y-4 py-4">
              {wishlistData?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h2 className="text-sm font-semibold">
                      {item.title.split(" ").slice(0, 3).join(" ")}
                    </h2>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="text-sm font-bold">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="wishlist-button"
                  >
                    Add To Cart
                  </button>
                  <button
                    style={{ background: "red" }}
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="wishlist-button ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart
          title={"Your Wishlist is empty!"}
          subHeading={"Seems like you don't have wishes here. Make a wish!"}
        />
      )}
    </>
  );
};

export default Wishlist;
