import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`group xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 bg-white shadow-2xl w-[4%] hover:w-[15%] h-screen fixed transition-all duration-300`}
      id="navigation-container"
    >
      {/* TOP MENU */}
      <div className="flex flex-col justify-start">
        {/* Common Links */}
        <Link
          to="/home"
          className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
        >
          <div className="flex items-center">
            <AiOutlineHome className="mt-[3rem] mr-2" size={26} />
            <span className="ml-2 mt-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </div>
        </Link>

        <Link
          to="/shop"
          className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
        >
          <div className="flex items-center">
            <AiOutlineShopping className="mt-[2rem] mr-2" size={26} />
            <span className="ml-2 mt-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Shop
            </span>
          </div>
        </Link>

        <Link
          to="/cart"
          className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
        >
          <div className="flex items-center">
            <AiOutlineShoppingCart className="mt-[2rem] mr-2" size={26} />
            <span className="ml-2 mt-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Cart
            </span>
          </div>
          {cartItems.length > 0 && (
            <div className="absolute top-9">
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          )}
        </Link>

        <Link
          to="/favorites"
          className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
        >
          <div className="flex items-center">
            <FaHeart className="mt-[2rem] mr-2" size={20} />
            <span className="ml-2 mt-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Favorites
            </span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      {/* BOTTOM MENU */}
      <div className="flex flex-col justify-end">
        {userInfo && (
          <>
            {/* Admin-only Links */}
            {userInfo.isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
                >
                  <div className="flex items-center">
                    <MdDashboard className="mt-[1rem] mr-2" size={26} />
                    <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Dashboard
                    </span>
                  </div>
                </Link>

                <Link
                  to="/admin/allproducts"
                  className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
                >
                  <div className="flex items-center">
                    <AiOutlineShopping className="mt-[1rem] mr-2" size={26} />
                    <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Products
                    </span>
                  </div>
                </Link>

                <Link
                  to="/admin/categorylist"
                  className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
                >
                  <div className="flex items-center">
                    <BiCategory className="mt-[1rem] mr-2" size={26} />
                    <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Category
                    </span>
                  </div>
                </Link>

                <Link
                  to="/admin/orderlist"
                  className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
                >
                  <div className="flex items-center">
                    <BsCartCheck className="mt-[1rem] mr-2" size={24} />
                    <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Orders
                    </span>
                  </div>
                </Link>

                <Link
                  to="/admin/userlist"
                  className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
                >
                  <div className="flex items-center">
                    <FaUsers className="mt-[1rem] mr-2" size={24} />
                    <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Users
                    </span>
                  </div>
                </Link>
              </>
            )}

            {/* Profile for any logged-in user */}
            <Link
              to="/profile"
              className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
            >
              <div className="flex items-center">
                <CgProfile className="mt-[1rem] mr-2" size={26} />
                <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={logoutHandler}
              className="flex relative text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2 mb-4"
            >
              <div className="flex items-center">
                <FiLogOut className="mt-[1rem] mr-2" size={24} />
                <span className="ml-2 mt-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Logout
                </span>
              </div>
            </button>
          </>
        )}

        {!userInfo && (
          <>
            <Link
              to="/login"
              className="flex items-center mb-4 text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                LOGIN
              </span>
            </Link>

            <Link
              to="/register"
              className="flex items-center mb-4 text-gray-800 hover:text-pink-500 font-semibold transition-all duration-300 transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                REGISTER
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
