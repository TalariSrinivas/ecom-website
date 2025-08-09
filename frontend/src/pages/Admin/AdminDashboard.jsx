import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      tooltip: { theme: "dark" },
      dataLabels: { enabled: true },
      stroke: { curve: "smooth" },
      title: { text: "Sales Trend", align: "left" },
      grid: { borderColor: "#e5e7eb" },
      markers: { size: 4 },
      xaxis: {
        categories: [],
        title: { text: "Date" },
      },
      yaxis: {
        title: { text: "Sales" },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: ["#9333EA"], // purple end
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      colors: ["#ec4899"], // pink start
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: { categories: formattedSalesDate.map((item) => item.x) },
        },
        series: [{ name: "Sales", data: formattedSalesDate.map((item) => item.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales Card */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
            <div>
              <p className="text-lg font-medium">Total Sales</p>
              <h1 className="text-3xl font-bold mt-2">
                {isLoading ? <Loader /> : `$ ${sales?.totalSales.toFixed(2)}`}
              </h1>
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-full shadow-md">
              <FaDollarSign size={32} className="text-pink-600" />
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
            <div>
              <p className="text-lg font-medium">Customers</p>
              <h1 className="text-3xl font-bold mt-2">
                {loading ? <Loader /> : customers?.length}
              </h1>
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-full shadow-md">
              <FaUsers size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
            <div>
              <p className="text-lg font-medium">Total Orders</p>
              <h1 className="text-3xl font-bold mt-2">
                {loadingTwo ? <Loader /> : orders?.totalOrders}
              </h1>
            </div>
            <div className="bg-white bg-opacity-30 p-4 rounded-full shadow-md">
              <FaShoppingCart size={32} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Chart + Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Chart Section (1/3) */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Sales Analytics</h2>
            <div className="bg-white rounded-xl p-4">
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="100%"
                height="350"
              />
            </div>
          </div>

          {/* Order List Section (2/3) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Recent Orders</h2>
            <div className="overflow-x-auto max-h-[400px]">
              <div className="min-w-[1250px]">
                <OrderList />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
