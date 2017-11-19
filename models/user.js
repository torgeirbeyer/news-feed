"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// http://mongoosejs.com/docs/schematypes.html
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  email: String,
  password: String,
  preferences: [String],
  articles: [ObjectId],
  current_location: String // should we use string (cities names) or lat/long {key: Number}?
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
