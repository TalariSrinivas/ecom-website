import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Orders
        </h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm uppercase">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-center">Paid</th>
                  <th className="py-3 px-4 text-center">Delivered</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-4">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.user}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-700">{order._id}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      $ {order.totalPrice}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {order.isPaid ? (
                        <span className="px-3 py-1 bg-green-100 text-green-600 font-medium rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-600 font-medium rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {order.isDelivered ? (
                        <span className="px-3 py-1 bg-green-100 text-green-600 font-medium rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-600 font-medium rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
