const Loader = ({ fullScreen = false }) => {
    return (
      <div
        className={`flex justify-center items-center ${
          fullScreen ? "h-screen" : "h-32"
        }`}
      >
        <div className="relative w-12 h-12">
          {/* Gradient Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-pink-500 border-r-purple-500 animate-spin"></div>
          {/* Inner Circle */}
          <div className="absolute inset-2 rounded-full bg-white"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  