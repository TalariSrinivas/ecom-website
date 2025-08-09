import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const payHandler = async () => {
    try {
      await payOrder({ orderId, details: { status: "COD Paid" } });
      refetch();
      toast.success("Order marked as paid (COD)");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  if (isLoading) return <Loader />;
  if (error) return <Messsage variant="danger">{error.data.message}</Messsage>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Items Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Order Items
          </h2>
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
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
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-center">${item.price}</td>
                      <td className="p-3 text-center">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Shipping Details
          </h2>
          <div className="space-y-3 text-gray-600">
            <p><strong className="text-gray-800">Order:</strong> {order._id}</p>
            <p><strong className="text-gray-800">Name:</strong> {order.user.username}</p>
            <p><strong className="text-gray-800">Email:</strong> {order.user.email}</p>
            <p><strong className="text-gray-800">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            <p><strong className="text-gray-800">Payment:</strong> Cash on Delivery</p>
          </div>

          {/* Payment & Delivery Status */}
          <div className="mt-6">
            {order.isPaid ? (
              <Messsage variant="success">Paid on {order.paidAt}</Messsage>
            ) : (
              <Messsage variant="danger">Not Paid (COD)</Messsage>
            )}
            {order.isDelivered ? (
              <Messsage variant="success">Delivered on {order.deliveredAt}</Messsage>
            ) : (
              <Messsage variant="danger">Not Delivered</Messsage>
            )}
          </div>

          {/* Order Summary */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between"><span>Items:</span> <span>${order.itemsPrice}</span></div>
            <div className="flex justify-between"><span>Shipping:</span> <span>${order.shippingPrice}</span></div>
            <div className="flex justify-between"><span>Tax:</span> <span>${order.taxPrice}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${order.totalPrice}</span></div>
          </div>

          {/* Action Buttons */}
          {userInfo && userInfo.isAdmin && !order.isPaid && (
            <button
              onClick={payHandler}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full py-3 mt-6 shadow-md hover:scale-105 transition-transform duration-300"
            >
              Confirm Payment (COD)
            </button>
          )}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button
              type="button"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full py-3 mt-4 shadow-md hover:scale-105 transition-transform duration-300"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
