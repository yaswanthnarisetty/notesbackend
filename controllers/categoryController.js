import Category from "../models/CategoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = new Category({ name, icon, user: req.user._id });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

// Get all categories for the logged-in user
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

// Get a single category for the logged-in user
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: 'Error fetching category' });
  }
};

// Update a category for the logged-in user
export const updateCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, icon },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: 'Error updating category' });
  }
};

// Delete a category for the logged-in user
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: 'Error deleting category' });
  }
};
