import Category from "../models/CategoryModel.js";

export const createCategory = async (req, res) => {
    try {
      const { name,icon } = req.body;
      const category = new Category({ name,icon });
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(500).json({ error: 'Error creating category' });
    }
  }
  export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  };
  export const getSingleCategory =  async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (err) {
      console.error("Error fetching category:", err);
      res.status(500).json({ error: 'Error fetching category' });
    }
  };
  export const updateCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: 'Error updating category' });
    }
  };
  export const deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting category' });
    }
  };