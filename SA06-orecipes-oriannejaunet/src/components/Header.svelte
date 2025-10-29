<script>

let { filterRecipeName = $bindable() } = $props();

</script>

<header>
    <!-- Logo du site -->
    <a href="/">
        <img src="logo.png" alt="Logo" class="logo" aria-hidden="true" />
    </a>

    <!-- Filtre de recherche de recettes -->
    <form>
        <input
            type="text"
            placeholder="Rechercher une recette"
            bind:value={filterRecipeName}
        />
    </form>
</header>
