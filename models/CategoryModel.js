import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model
});

export default mongoose.model('Category', categorySchema);
