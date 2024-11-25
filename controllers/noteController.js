import Note from "../models/Note.js";
import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { name, content, categoryId, isFavorite } = req.body;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Check if the category belongs to the logged-in user
    const category = await Category.findOne({ _id: categoryId, user: req.user._id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found or unauthorized' });
    }

    // Create the note
    const note = new Note({
      name,
      content,
      category: categoryId,
      isFavorite,
      user: req.user._id // Associate the note with the logged-in user
    });

    // Save the note
    await note.save();

    // Add the note ID to the category's notes array
    category.notes.push(note._id);
    await category.save();

    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: err.message || 'Error creating note' });
  }
};

// Edit a note
export const editNote = async (req, res) => {
  try {
    const { name, content, categoryId } = req.body;

    // Check if the note exists and belongs to the logged-in user
    const note = await Note.findOne({ _id: req.params.id }).populate('category');
    if (!note || note.category.user.toString() !== req.user._id) {
      return res.status(404).json({ error: 'Note not found or unauthorized' });
    }

    // Update the note details
    note.name = name;
    note.content = content;
    note.category = categoryId || note.category;

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Error updating note' });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id }).populate('category');

    // Check if the note belongs to the logged-in user
    if (!note || note.category.user.toString() !== req.user._id) {
      return res.status(404).json({ error: 'Note not found or unauthorized' });
    }

    // Delete the note and remove its ID from the category's notes array
    await Note.findByIdAndDelete(req.params.id);
    await Category.findByIdAndUpdate(note.category._id, { $pull: { notes: note._id } });

    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting note' });
  }
};

// Get notes by category
export const getNotesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Check if the category belongs to the logged-in user
    const category = await Category.findOne({ _id: categoryId, user: req.user._id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found or unauthorized' });
    }

    // Fetch notes for the category
    const notes = await Note.find({ category: categoryId });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes by category:", err);
    res.status(500).json({ error: 'Error fetching notes by category' });
  }
};

// Toggle favorite status
export const toggleFavoriteStatus = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('category');

    // Check if the note belongs to the logged-in user
    if (!note || note.category.user.toString() !== req.user._id) {
      return res.status(404).json({ error: 'Note not found or unauthorized' });
    }

    // Toggle the favorite status
    note.isFavorite = !note.isFavorite;
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Error toggling favorite status' });
  }
};

// Get all favorite notes for the logged-in user
export const getAllFavorites = async (req, res) => {
  try {
    // Fetch favorite notes for the user
    const favoriteNotes = await Note.find({ user: req.user._id, isFavorite: true });

    res.status(200).json(favoriteNotes);
  } catch (err) {
    console.error("Error fetching favorite notes:", err);
    res.status(500).json({ error: 'Error fetching favorite notes' });
  }
};

