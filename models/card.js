const { Schema, model, Types } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = model('Card', cardSchema);
