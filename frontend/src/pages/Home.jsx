import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "../pages/Products/Product";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; // New Icons

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getTransformValue = () => {
    return `translateX(-${currentIndex * 270}px)`; // 250px width + 20px gap
  };

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <div className="px-6 md:px-16 lg:px-24 py-10 relative">
          {/* Heading and Shop Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full py-2 px-8 shadow-md hover:scale-105 transition-transform duration-300"
            >
              Shop Now
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative flex items-center justify-center overflow-hidden">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-200 disabled:opacity-40 transition duration-300"
            >
              <HiChevronLeft size={28} className="text-gray-700" />
            </button>

            {/* Sliding Container */}
            <div className="w-4/5 overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: getTransformValue(),
                }}
              >
                {data?.products?.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-center items-center"
                    style={{ width: "250px", height: "350px" }}
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= data.products.length - 3}
              className="absolute right-0 z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-200 disabled:opacity-40 transition duration-300"
            >
              <HiChevronRight size={28} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
