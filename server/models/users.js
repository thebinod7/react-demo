const mongoose = require("mongoose");
const { ObjetId } = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, {
  collection: "users",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model("Users", UserSchema);