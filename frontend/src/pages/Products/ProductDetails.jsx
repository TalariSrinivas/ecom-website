import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    const productIdValue = product._id || product.id;
    dispatch(addToCart({ ...product, _id: productIdValue, qty: Number(qty) }));
    navigate("/cart");
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-6 md:px-16 lg:px-28 py-8">
        <Link
          to="/shop"
          className="text-pink-600 font-semibold hover:underline inline-block mb-6"
        >
          ← Back to Shop
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Product Image */}
              <div className="relative  flex-shrink-0 w-1/2 lg:w-1/3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute top-4 right-4">
                  <HeartIcon product={product} />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <p className="text-4xl font-extrabold text-pink-600 mb-6">
                  $ {product.price}
                </p>

                {/* Ratings & Quantity */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />

                  {product.countInStock > 0 && (
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700 font-medium">Qty:</label>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-24 focus:ring-2 focus:ring-pink-400"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="flex items-center mb-3 text-gray-700">
                      <FaStore className="mr-2 text-pink-500" /> Brand:{" "}
                      <span className="ml-1 font-semibold">
                        {product.brand}
                      </span>
                    </p>
                    <p className="flex items-center mb-3 text-gray-700">
                      <FaClock className="mr-2 text-pink-500" /> Added:{" "}
                      <span className="ml-1">
                        {moment(product.createdAt).fromNow()}
                      </span>
                    </p>
                    <p className="flex items-center mb-3 text-gray-700">
                      <FaStar className="mr-2 text-pink-500" /> Reviews:{" "}
                      <span className="ml-1">{product.numReviews}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center mb-3 text-gray-700">
                      <FaShoppingCart className="mr-2 text-pink-500" /> Quantity
                      Available:{" "}
                      <span className="ml-1">{product.quantity}</span>
                    </p>
                    <p className="flex items-center mb-3 text-gray-700">
                      <FaBox className="mr-2 text-pink-500" /> In Stock:{" "}
                      <span className="ml-1">{product.countInStock}</span>
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Product Tabs (Reviews & Details) */}
            <div className="mt-12">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
