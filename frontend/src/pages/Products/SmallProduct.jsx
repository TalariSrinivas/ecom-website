import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="relative bg-white shadow-2xl  rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-53 bg-gray-100 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
        <HeartIcon product={product} />
      </div>

      {/* Info */}
      <div className="p-3 text-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-sm font-semibold text-gray-700 truncate">{product.name}</h2>
          <span className="inline-block mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
            $ {product.price}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
