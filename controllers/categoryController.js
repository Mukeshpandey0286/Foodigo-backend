import { categoryModel } from "../models/categoryModel.js";

// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "No title is provided for category!",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();

    res.status(201).send({
      success: true,
      message: "Category Created!",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Category API!",
      error,
    });
  }
};

// GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories Found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "All categories fetched successfully!",
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GET ALL Category API!",
      error,
    });
  }
};

// UPDATE CATEGORIES
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In UPDATE Category API!",
      error,
    });
  }
};

// DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Please provide the category id!",
    });
  }

  const category = await categoryModel.findById(id);
  if (!category) {
    return res.status(404).send({
      success: false,
      message: "No category is available with this category id!",
    });
  }
  await categoryModel.findByIdAndDelete(id);
  res.status(200).send({
    success: true,
    message: "Category deleted successfully!",
  });
};

export {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
