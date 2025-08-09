import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

// ✅ Create Category Controller
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Category name is required");
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        res.status(400);
        throw new Error("Category already exists");
    }

    const category = await Category.create({ name });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name) {
        res.status(400);
        throw new Error("Category name is required");
    }

    const category = await Category.findById(categoryId);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    category.name = name;
    const updatedCategory = await category.save();

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory
    });
});
const removeCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const removedCategory = await Category.findByIdAndDelete(categoryId);

    if (!removedCategory) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        category: removedCategory
    });
});
const listCategory = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 }); // sorted by latest first

    res.status(200).json({
        success: true,
        count: categories.length,
        categories,
    });
});

const readCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({
        success: true,
        category,
    });
});


export { createCategory,updateCategory,removeCategory,listCategory,readCategory };
