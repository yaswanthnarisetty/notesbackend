import mongoose from 'mongoose';
import Category from './CategoryModel.js';

const noteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isFavorite: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model
  });
  
export default mongoose.model('note', noteSchema);
  