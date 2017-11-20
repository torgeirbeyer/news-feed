"use strict";

const mongoose = require("mongoose");
const Article = require("../models/article");

mongoose.connect("mongodb://localhost/news-feed");

const articles = [
  {
    title: "Spain's Secret Service Had Ties to Attack Leader, Official Says",
    URL: "https://www.nytimes.com/2017/11/17/world/europe/spain-barcelona-attack-imam.html",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlRu8rYi9CENi5OU9r5GhEFpM3Y-knUDHsKyI-GFuEkHJibq_HJlwCP4DTy24wCnNMrQ-HReHqSg",
    categories: ["Politics"],
    location: "Barcelona"
  },
  {
    title: "Managing overtourism an increasing feature of global travel",
    URL: "none",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlRu8rYi9CENi5OU9r5GhEFpM3Y-knUDHsKyI-GFuEkHJibq_HJlwCP4DTy24wCnNMrQ-HReHqSg",
    categories: ["Tourism"],
    location: "Barcelona"
  }
];

Article.create(articles, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((article) => {
    console.log(article.title);
  });
  mongoose.connection.close();
});
