import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories = [], products = [], checked = [], radio = [] } =
    useSelector((state) => state.shop || {});

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  // ✅ Fetch and set categories
  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      const fetchedCategories =
        categoriesQuery.data.categories || categoriesQuery.data || [];
      dispatch(setCategories(fetchedCategories));
    }
  }, [categoriesQuery.data, dispatch]);

  // ✅ Update products whenever filters or price change
  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      let filteredProducts = filteredProductsQuery.data;

      if (priceFilter) {
        filteredProducts = filteredProducts.filter((product) =>
          product.price.toString().includes(priceFilter)
        );
      }

      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand || []));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = Array.from(
    new Set(
      (filteredProductsQuery.data || [])
        .map((product) => product.brand)
        .filter((brand) => brand !== undefined)
    )
  );

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen px-6 lg:px-30 py-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4 rounded-xl p-5 mb-6 lg:mb-0 shadow-2xl ">
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg">
          Filters
        </h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Categories</h3>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((c) => (
              <div key={c._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${c._id}`}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor={`category-${c._id}`} className="ml-2 text-gray-700">
                  {c.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories found</p>
          )}
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Brands</h3>
          {uniqueBrands.length > 0 ? (
            uniqueBrands.map((brand) => (
              <div key={brand} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor={brand} className="ml-2 text-gray-700">
                  {brand}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No brands available</p>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Price</h3>
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-pink-400"
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      </div>

      {/* Products Section */}
      <div className="flex-1 px-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          {products?.length} Products
        </h2>
        {products.length === 0 ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
