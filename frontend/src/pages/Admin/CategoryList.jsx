import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";


const CategoryList = () => {
  const { data } = useFetchCategoriesQuery();
  const categories = data?.categories || [];
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} is created.`);
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      toast.error("Updating category failed.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${result.name} is deleted.`);
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Manage Categories
          </h1>
        </div>

        {/* Create Category Form */}
        <div className="mb-8">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  {category.name}
                </p>
                <button
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full py-2 px-6 shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No categories available.
            </p>
          )}
        </div>

        {/* Modal for Edit/Delete */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="bg-white p-6 rounded-lg text-gray-800 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">Edit Category</h2>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
            />
            <button
              onClick={handleDeleteCategory}
              className="mt-4 w-full bg-red-500 text-white font-semibold rounded-full py-2 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </Modal>
        <AdminMenu />
      </div>
    </div>
  );
};

export default CategoryList;
