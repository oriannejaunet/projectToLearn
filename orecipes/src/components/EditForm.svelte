<script>
    import Icon from "@iconify/svelte";

    let { id, title, image, description, recipes = $bindable() } = $props();
    let showModal = $state(false);

    function openEditModale() {
        showModal = true;
    }

    function closeEditModale() {
        showModal = false;
    }

    async function submitEditForm() {
        const apiEndpoint = `http://127.0.0.1:8090/api/collections/recipes/records/${id}`;

        // J'utilise fetch() pour faire appel à mon API
        // repsonse contient toutes les infos renvoyés par le serveur
        // MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch(apiEndpoint, {
            method: "PATCH", // J'indique ici quel type de requête je fais
            headers: {
                // Spécifier le format des données
                // 'Content-Type' est une clé liée à la propriété headers
                // qui permet de spécifier le type de données à passer
                "Content-Type": "application/json",
            },
            // On va renseigner le corps de la requête (body)
            // en traduisant l'objet newRecipe au format JSON
            body: JSON.stringify({ title, image, description }),
        });

        if (!response.ok) {
            alert(
                "Erreur lors de la création de la recette, veuillez réessayer !",
            );
            return;
        }
        const updatedRecipe = await response.json();

        // 🔍 Trouver l'index de la recette modifiée dans le tableau
        const index = recipes.findIndex((r) => r.id === id);

        if (index !== -1) {
            // 🔄 Remplacer l'ancienne recette par la nouvelle
            recipes[index] = updatedRecipe;
        } else {
            console.warn(
                "Recette non trouvée dans la liste, ajout par sécurité.",
            );
            recipes.push(updatedRecipe);
        }
        closeEditModale();
    }
</script>

{#if showModal}
    <div class="modal-overlay">
        <div class="modal">
            <h3>Modifier</h3>
            <form id="add-recipe" onsubmit={addRecipe}>
                <label
                    >Titre
                    <input
                        type="text"
                        name="title"
                        aria-label="Titre de la recette"
                        bind:value={title}
                        required
                    />
                </label>
                <label
                    >Image URL
                    <input
                        type="text"
                        name="image"
                        aria-label="URL de l'image"
                        bind:value={image}
                    />
                </label>
                <label
                    >Description
                    <textarea
                        name="description"
                        aria-label="Description de la recette"
                        bind:value={description}
                        required
                    ></textarea>
                </label>
            </form>

            <div class="modal-actions">
                <button class="cancel-btn" onclick={closeEditModale}
                    >Annuler</button
                >
                <button class="confirm-btn" onclick={submitEditForm}
                    >Valider</button
                >
            </div>
        </div>
    </div>
{/if}

<button aria-label="Modifier" onclick={openEditModale}>
    <div class="btn-icon">
        <Icon icon="typcn:pencil" width="20" height="20" />
    </div>
</button>
