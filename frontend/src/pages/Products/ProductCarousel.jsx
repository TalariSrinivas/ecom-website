import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  if (isLoading) return null;
  if (error) return <Message variant="danger">Error loading carousel</Message>;

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl  bg-white">
      <Slider {...settings} className="rounded-2xl">
        {products.map(
          ({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
            countInStock,
          }) => (
            <div key={_id} className="relative">
              {/* Product Image */}
              <img
                src={image}
                alt={name}
                className="w-full rounded-xl object-cover h-[40rem]"
              />

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-6 rounded-b-xl">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-lg font-semibold mb-2">$ {price}</p>
                <p className="text-sm opacity-80 mb-4">{description.substring(0, 100)}...</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="flex items-center"><FaStore className="mr-2" /> Brand: {brand}</p>
                    <p className="flex items-center"><FaClock className="mr-2" /> {moment(createdAt).fromNow()}</p>
                    <p className="flex items-center"><FaStar className="mr-2" /> Reviews: {numReviews}</p>
                  </div>
                  <div>
                    <p className="flex items-center"><FaStar className="mr-2" /> Ratings: {Math.round(rating)}</p>
                    <p className="flex items-center"><FaShoppingCart className="mr-2" /> Qty: {quantity}</p>
                    <p className="flex items-center"><FaBox className="mr-2" /> Stock: {countInStock}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
