"use strict";

function addArticle(article) {
  document.getElementsByClassName("articles-container")[0].innerHTML += `
  <div class="article-info">
    <div id="title">Title: ${article.title}</div>
    <div id="URL">URL: ${article.URL}</div>
    <div id="categories">Categories: ${article.categories}</div>
    <div id="location">Location: ${article.location}</div>
    <div id="date">Date: ${article.date}</div>
  </div>`;
}

function displayArticles() {
  myArticles.forEach((article) => {
    addArticle(article);
  });
}

window.addEventListener("load", displayArticles);
