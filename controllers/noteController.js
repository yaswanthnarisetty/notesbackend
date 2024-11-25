import Note from "../models/Note.js"
import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";

export const CreateNote = async (req, res) => {
  try {
    const { name, content, categoryId,isFavorite } = req.body;

    // Check if categoryId is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Create a new note
    const note = new Note({
      name,
      content,
      category: categoryId,
      isFavorite
    });

    // Save the note
    await note.save();

    // Update the category with the new note ID
    await Category.findByIdAndUpdate(
      categoryId,
      { $push: { notes: note._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note:", err); // Detailed logging
    res.status(500).json({ error: err.message || 'Error creating note' });
  }
};

export const EditNote = async (req, res) => {
    try {
      const { name, content, categoryId } = req.body;
      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { name, content, category: categoryId },
        { new: true }
      );
      res.status(200).json(note);
    } catch (err) {
      res.status(500).json({ error: 'Error updating note' });
    }
  };
  
export const DeleteNote =async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (note) {
        await Category.findByIdAndUpdate(note.category, { $pull: { notes: note._id } });
      }
      res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting note' });
    }
  };
  
  export const GetNoteByCategory =   async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      // Validate categoryId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
  
      // Fetch all notes with the given category
      const notes = await Note.find({ category: categoryId });
  
      res.status(200).json(notes);
    } catch (err) {
      console.error("Error fetching notes by category:", err);
      res.status(500).json({ error: 'Error fetching notes by category' });
    }
  };
  
  export const FavoriteStatus =  async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      note.isFavorite = !note.isFavorite;
      await note.save();
      res.status(200).json(note);
    } catch (err) {
      res.status(500).json({ error: 'Error toggling favorite status' });
    }
  };
  