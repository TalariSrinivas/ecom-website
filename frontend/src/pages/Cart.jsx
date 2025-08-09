import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart || {};

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty.{" "}
          <Link
            to="/shop"
            className="text-pink-500 font-semibold hover:underline"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Shopping Cart
            </h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-medium text-gray-700 hover:text-pink-500"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-pink-600 font-bold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <select
                    className="p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </span>
              <span className="font-semibold">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <hr className="my-4" />
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
            <Link
              to="/shop"
              className="block text-center text-pink-500 font-medium mt-4 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
