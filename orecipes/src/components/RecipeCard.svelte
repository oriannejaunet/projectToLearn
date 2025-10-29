<script>
  import Markdown from "svelte-exmarkdown";
  import Icon from "@iconify/svelte";
  import EditForm from "./EditForm.svelte";

  // Ici, je déclare des props qui sont des
  // sorte de variables à intégrer dans mon composant
  let { id, title, image, description, recipes = $bindable() } = $props();

  // État local pour la modale
  let showModal = $state(false);
  let recipeIdDelete = null;

  async function removeRecipe(recipeIdToDelete) {
    const apiEndpoint = `http://127.0.0.1:8090/api/collections/recipes/records/${recipeIdToDelete}`;
    const response = await fetch(apiEndpoint, { method: "DELETE" });

    recipes = recipes.filter(
      (recipeParam) => recipeParam.id !== recipeIdToDelete,
    );
    console.log(response);
  }

  function confirmDelete(recipeId) {
    recipeIdDelete = recipeId;
    showModal = true;
  }

  function cancelDelete() {
    showModal = false;
    recipeIdDelete = null;
  }

  async function deleteConfirmed() {
    await removeRecipe(recipeIdDelete);
    showModal = false;
    recipeIdDelete = null;
  }
</script>



<article>
  <div class="article-btns">
    <EditForm {id} {title} {image} {description} bind:recipes />
    <button aria-label="Supprimer" onclick={() => confirmDelete(id)}>
      <div class="btn-icon">
        <Icon icon="typcn:times-outline" width="20" height="20" />
      </div>
    </button>
    {#if showModal}
    <div class="modal-overlay">
      <div class="modal">
        <h3>Confirmer la suppression</h3>
        <p>Voulez-vous vraiment supprimer cette recette ?</p>
  
        <div class="modal-actions">
          <button class="cancel-btn" onclick={cancelDelete}>Annuler</button>
          <button class="confirm-btn" onclick={deleteConfirmed}>Supprimer</button>
        </div>
      </div>
    </div>
  {/if}
  </div>
  <div class="article-image">
    <img src={image} alt={`Image de ${title}`} />
  </div>
  <h2>{title}</h2>
  <Markdown md={description} />
</article>
