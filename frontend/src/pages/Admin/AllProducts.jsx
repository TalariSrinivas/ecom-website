import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Heading */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-5 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              All Products ({products.length})
            </h1>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-45 bg-gray-100 flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 truncate">
                      {product.name}
                    </h2>

                    {/* Price */}
                    <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full shadow mb-4">
                      $ {product.price}
                    </span>

                    {/* Update Button */}
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full py-2 shadow-md hover:scale-105 transition-transform duration-300 text-center"
                    >
                      Update Product
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>

        
          <AdminMenu />
       
      </div>
    </div>
  );
};

export default AllProducts;
