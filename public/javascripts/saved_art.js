function addArticle(char) {
  document.getElementsByClassName("articles-container")[0].innerHTML += `
  <div class="character-info">
    <div class="name">ID: ${char.id}</div>
    <div class="name">Name: ${char.name}</div>
    <div class="occupation">Occupation: ${char.occupation}</div>
    <div class="debt">Debt: ${char.debt}</div>
    <div class="weapon">Weapon: ${char.weapon}</div>
  </div>`;
}
