import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className=" shadow-2xl rounded-2xl overflow-hidden relative hover:shadow-lg transition-transform transform hover:scale-105">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className=" object-cover"
        />
        <HeartIcon product={product} />
      </div>

      {/* Product Info */}
      <div className="p-2 text-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-sm font-semibold truncate">{product.name}</h2>
          <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium mt-1 px-2 py-0.5 rounded-full">
            $ {product.price}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Product;
