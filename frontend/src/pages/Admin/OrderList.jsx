import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaEye } from "react-icons/fa";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
          {/* Sidebar */}
          <AdminMenu />

          {/* Main Content */}
          <div className="flex-1 flex justify-center items-start p-6">
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-center">
                <h2 className="text-2xl font-bold text-white">Order List</h2>
              </div>

              {/* Table Container with Vertical Scroll */}
              <div className="overflow-x-auto">
                <div className="max-h-[700px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                      <tr>
                        <th className="p-4">ITEM</th>
                        <th className="p-4">ID</th>
                        <th className="p-4">USER</th>
                        <th className="p-4">DATE</th>
                        <th className="p-4">TOTAL</th>
                        <th className="p-4">PAID</th>
                        <th className="p-4">DELIVERED</th>
                        <th className="p-4 text-center">ACTION</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {orders.map((order, index) => (
                        <tr
                          key={order._id}
                          className={`hover:bg-gray-100 transition ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          {/* Item Image */}
                          <td className="p-4">
                            <img
                              src={order.orderItems[0].image}
                              alt={order._id}
                              className="w-16 h-16 rounded-lg object-cover shadow-md"
                            />
                          </td>

                          {/* Order ID */}
                          <td className="p-4 text-gray-700">{order._id}</td>

                          {/* Username */}
                          <td className="p-4 text-gray-600">
                            {order.user ? order.user.username : "N/A"}
                          </td>

                          {/* Date */}
                          <td className="p-4 text-gray-500">
                            {order.createdAt
                              ? order.createdAt.substring(0, 10)
                              : "N/A"}
                          </td>

                          {/* Total Price */}
                          <td className="p-4 font-bold text-gray-800">
                            $ {order.totalPrice.toFixed(2)}
                          </td>

                          {/* Paid Status */}
                          <td className="p-4">
                            {order.isPaid ? (
                              <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm">
                                Completed
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full text-sm">
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Delivered Status */}
                          <td className="p-4">
                            {order.isDelivered ? (
                              <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm">
                                Completed
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full text-sm">
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Action Button */}
                          <td className="p-4 text-center">
                            <Link to={`/order/${order._id}`}>
                              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                                <FaEye /> More
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
