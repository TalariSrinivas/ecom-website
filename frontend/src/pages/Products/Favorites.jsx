import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No favorite products yet.{" "}
          <Link
            to="/shop"
            className="text-pink-500 font-semibold hover:underline"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="bg-white  rounded-xl p-4  hover:scale-105 transition-all duration-300"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
