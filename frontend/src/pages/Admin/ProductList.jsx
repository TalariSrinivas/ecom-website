import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories, isLoading, isError } = useFetchCategoriesQuery();

  // ✅ Submit as JSON instead of FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image, // ✅ Cloudinary URL from upload step
      };

      const res = await createProduct(productData).unwrap();

      if (res.error) {
        toast.error("Product creation failed. Try again.", { autoClose: 2000 });
      } else {
        toast.success(`${res.name} created successfully!`, { autoClose: 2000 });
        setTimeout(() => {
          navigate("/admin/allproducts"); // ✅ Redirect after success
        }, 1500);
      }
    } catch (error) {
      toast.error("Product creation failed. Try again.", { autoClose: 2000 });
    }
  };

  // ✅ Upload image to Cloudinary first
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", { autoClose: 2000 });
      setImage(res.imageUrl); // ✅ Use Cloudinary URL
      setImageUrl(res.imageUrl);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Create New Product
        </h2>

        {/* Image Preview */}
        {imageUrl && (
          <div className="text-center mb-6">
            <img
              src={imageUrl}
              alt="product"
              className="w-64 h-64 mx-auto object-cover rounded-xl shadow-md border"
            />
          </div>
        )}

        {/* Upload Image */}
        <div className="mb-6 text-center">
          <label className="cursor-pointer inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform">
            {image ? "Change Image" : "Upload Image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Count In Stock</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              {isLoading ? (
                <p className="text-gray-500">Loading categories...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load categories</p>
              ) : (
                <select
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-10 rounded-lg text-lg font-semibold hover:opacity-90 transition"
            >
              Create Product
            </button>
          </div>
        </form>
        <AdminMenu />
      </div>
    </div>
  );
};

export default ProductList;
