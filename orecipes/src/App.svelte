<script>
  import { onDestroy, onMount } from "svelte";
  import RecipeCard from "./components/RecipeCard.svelte";
  import Header from "./components/Header.svelte";

  let recipes = $state([]);

  let filterRecipeName = $state("");

  const newRecipe = $state({
    title: "",
    image: "",
    description: "",
  });

  // Fonction d'ajout d'une recette
  async function addRecipe(event) {
    // Je dois stopper l'événement par défaut
    // du formulaire par le navigateur
    event.preventDefault();

    // 1 - Je renseigne l'adresse de l'API pour récupérer mes données
    const apiEndpoint = "http://127.0.0.1:8090/api/collections/recipes/records";

    // J'utilise fetch() pour faire appel à mon API
    // repsonse contient toutes les infos renvoyés par le serveur
    // MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(apiEndpoint, {
      method: "POST", // J'indique ici quel type de requête je fais
      headers: {
        // Spécifier le format des données
        // 'Content-Type' est une clé liée à la propriété headers
        // qui permet de spécifier le type de données à passer
        "Content-Type": "application/json",
      },
      // On va renseigner le corps de la requête (body)
      // en traduisant l'objet newRecipe au format JSON
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      alert("Erreur lors de la création de la recette, veuillez réessayer !");
      return;
    }

    // ! Le push sur le state, c'est pas ouf...
    // Il faudrait vérifier cela autrement... ($effect)...
    recipes.push(await response.json());

    // Version old but gold
    const addRecipeForm = document.getElementById("add-recipe");
    addRecipeForm.reset();
  }

  // Fonction de récupération des recettes
  // au lancement de notre application
  async function getRecipes() {
    // 1 - Je renseigne l'adresse de l'API pour récupérer mes données
    const apiEndpoint = "http://localhost:8090/api/collections/recipes/records";

    // J'utilise fetch() pour faire appel à mon API
    // repsonse contient toutes les infos renvoyés par le serveur
    // MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(apiEndpoint);

    // On va traduire au format JSON le corps de la requête
    const result = await response.json();

    // Ici, je remarque que result renvoie un tableau avec différentes infos
    console.log(result);

    // Je n'ai plus qu'à attribuer les infos au state
    // result.items me renvoie le bon tableau avec uniquement les recettes
    recipes = result.items;
  }

  // On indique qu'au montage du composant,
  // on va appeler notre fonction pour l'affichage des recettes
  onMount(async () => {
    await getRecipes();
  });
</script>

<div class="container">
  <Header bind:filterRecipeName />
  <!-- Section principale du site -->
  <main>
    <section class="add-recipe">
      <h2>Ajouter une recette</h2>
      <form id="add-recipe" onsubmit={addRecipe}>
        <label
          >Titre
          <input
            type="text"
            name="title"
            aria-label="Titre de la recette"
            bind:value={newRecipe.title}
            required
          />
        </label>
        <label
          >Image URL
          <input
            type="text"
            name="image"
            aria-label="URL de l'image"
            bind:value={newRecipe.image}
          />
        </label>
        <label
          >Description
          <textarea
            name="description"
            aria-label="Description de la recette"
            bind:value={newRecipe.description}
            required
          ></textarea>
        </label>
        <button type="submit" aria-label="Ajouter votre recette">Ajouter</button
        >
      </form>
    </section>

    <!-- Section avec les recettes -->
    <section class="recipes">
      {#each recipes as recipe}
        {#if recipe.title
          .toLowerCase()
          .includes(filterRecipeName.toLowerCase())}
          <!-- A l'endroit où j'appelle mon composant, je dois déclarer les informations à renseigner pour chaque prop -->
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            description={recipe.description}
            bind:recipes
          />
        {/if}
      {/each}
    </section>
  </main>
</div>
