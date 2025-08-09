import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer flex items-center justify-center w-8 h-8 bg-gray-100/70 rounded-full shadow-md shadow-pink-500 hover:bg-gray-200 transition-all duration-300"
      onClick={toggleFavorites}
    >
      <div
        className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 transition-transform duration-300"
        style={{
          WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
            isFavorite
              ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M462.3 62.7c-54.5-46.4-136-38.3-186.4 13.7L256 96.6l-19.9-20.3c-50.4-52-131.9-60.1-186.4-13.7C7.6 107.1-10.6 184.3 43 245.6l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0L469 245.6c53.6-61.3 35.4-138.5-6.7-182.9z"/></svg>'
              : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M462.3 62.7c-54.5-46.4-136-38.3-186.4 13.7L256 96.6l-19.9-20.3c-50.4-52-131.9-60.1-186.4-13.7C7.6 107.1-10.6 184.3 43 245.6l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0L469 245.6c53.6-61.3 35.4-138.5-6.7-182.9z" stroke="black" stroke-width="30" fill="none"/></svg>'
          )}')`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
        }}
      ></div>
    </div>
  );
};

export default HeartIcon;
