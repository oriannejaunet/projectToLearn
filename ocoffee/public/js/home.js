const btn = document.getElementById("see-all-products-button");
const articles = document.getElementById("articles-list");

btn.addEventListener("click", () => {
    articles.classList.toggle("only-display-3-articles");

    if (articles.classList.contains("only-display-3-articles")) {
        btn.textContent = "Voir tous les produits";
    } else {
        btn.textContent = "Voir moins";
    }
});

