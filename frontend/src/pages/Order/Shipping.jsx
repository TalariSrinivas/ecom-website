import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default COD
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 py-10">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <ProgressSteps step1 step2 />
      </div>

      {/* Form Container */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
            Shipping Details
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Address */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Country
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Select Payment Method
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Continue Button */}
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
