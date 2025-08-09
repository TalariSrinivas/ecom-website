import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      {/* Product Image */}
      <div className="relative">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        <HeartIcon product={p} />
        <span className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
          {p?.brand}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-lg font-semibold text-gray-800">{p?.name}</h5>
          <p className="text-pink-600 font-bold">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          {p?.description?.substring(0, 60)} ...
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Read More
          </Link>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={22} className="text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
