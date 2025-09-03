import Card from "./Card";
import ImageSlider from "./ImageSlider";
import Banner from "./Banner";
import Loader from "./Loader";
import Errormsg from "./ErrorMsg";

const Home = ({
  cartItems,
  setCartItems,
  wishlistCount,
  setwishlistData,
  wishlistData,
  error,
  loading,
  filteredData,
}) => {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        {loading ? (
          <Loader />
        ) : error ? (
          <Errormsg />
        ) : (
          <>
            <ImageSlider />
            {filteredData.length == 0 ? (
              <div className="w-full h-[50vh] flex items-center justify-center">
                <h2 className="text-center mt-10 text-lg font-semibold">
                  No Results Found
                </h2>
              </div>
            ) : (
              <Card
                data={filteredData}
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlistCount={wishlistCount}
                setwishlistData={setwishlistData}
                wishlistData={wishlistData}
              />
            )}
            <Banner />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
