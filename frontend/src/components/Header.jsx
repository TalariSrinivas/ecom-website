import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1 className="text-center text-red-500">Error loading products</h1>;

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10 px-6 lg:px-25 py-10 bg-gray-50">
      {/* Left - Small Products Grid */}
      <div className="hidden lg:block w-1/3">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Top Picks</h2>
        <div className="grid grid-cols-2 gap-6">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Right - Carousel */}
      <div className="w-full lg:w-2/3 ">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
