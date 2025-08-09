import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories, isLoading: catLoading, isError: catError } =
    useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", { autoClose: 2000 });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const result = await updateProduct({ productId: params._id, formData });

      if (result?.error) {
        toast.error(result.error, { autoClose: 2000 });
      } else {
        toast.success("Product successfully updated", { autoClose: 2000 });
        setTimeout(() => {
          window.location.reload(); // ✅ Reload the current page
        }, 1500);
      }
    } catch (err) {
      toast.error("Product update failed. Try again.", { autoClose: 2000 });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, { autoClose: 2000 });
      setTimeout(() => {
        navigate("/admin/allproducts"); // ✅ Go back to product list
      }, 1500);
    } catch (err) {
      toast.error("Delete failed. Try again.", { autoClose: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Update / Delete Product
        </h2>

        {/* Product Image */}
        {image && (
          <div className="text-center mb-6">
            <img
              src={image}
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
              {catLoading ? (
                <p className="text-gray-500">Loading categories...</p>
              ) : catError ? (
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
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
