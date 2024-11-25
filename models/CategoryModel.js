import mongoose from 'mongoose';


// const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon:{ type: String, required: true},
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

export default mongoose.model('Category', categorySchema);
