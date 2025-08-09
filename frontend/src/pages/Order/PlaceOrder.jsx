import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 py-10">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <ProgressSteps step1 step2 step3 />
      </div>

      {cart.cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Image</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-3">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-indigo-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-3">{item.qty}</td>
                      <td className="p-3">${item.price.toFixed(2)}</td>
                      <td className="p-3">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>Items:</span> <span>${cart.itemsPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping:</span> <span>${cart.shippingPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax:</span> <span>${cart.taxPrice}</span>
              </li>
              <li className="flex justify-between font-bold text-lg">
                <span>Total:</span> <span>${cart.totalPrice}</span>
              </li>
            </ul>

            {error && (
              <Message variant="danger" className="mt-4">
                {error.data.message}
              </Message>
            )}

            {/* Shipping Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Shipping
              </h3>
              <p className="text-gray-600">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Payment Method
              </h3>
              <p className="text-gray-600">{cart.paymentMethod}</p>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              className="mt-8 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
