"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// http://mongoosejs.com/docs/schematypes.html
const articleSchema = new Schema({
  text: String,
  userName: String,
  img: String,
  date: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
