"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// http://mongoosejs.com/docs/schematypes.html
const articleSchema = new Schema({
  title: String,
  URL: String,
  img: String,
  categories: [String],
  location: String, // or lat/long {key: Number}?
  date: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
