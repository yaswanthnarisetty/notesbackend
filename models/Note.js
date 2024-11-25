import mongoose from 'mongoose';
import Category from './CategoryModel.js';

const noteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isFavorite: { type: Boolean, default: false }
  });
  
export default mongoose.model('note', noteSchema);
  