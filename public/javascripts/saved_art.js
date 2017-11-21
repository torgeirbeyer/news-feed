function addArticle(char) {
  document.getElementsByClassName("articles-container")[0].innerHTML += `
  <div class="article-info">
    <div id="title">Title: ${myArticles.title}</div>
    <div id="URL">URL: ${myArticles.URL}</div>
    <div id="categories">Categories: ${myArticles.categories}</div>
    <div id="location">Location: ${myArticles.location}</div>
    <div id="date">Date: ${myArticles.date}</div>
  </div>`;
}
