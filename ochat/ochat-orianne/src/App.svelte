<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { Markdown } from "svelte-exmarkdown";

  //variables

  //historique de conversation
  let conversationHistory = false;
  //clé entrée par l'utilisateur
  let userToken = "";
  //si on montre la modale
  let viewToken = false;
  //message de l'utilisateur
  let userMessage = "";
  //tableau des messages
  let messages = [];
  //tableau des conversations
  let conversations = [];
  //conversation ouverte
  let selectedConversation = null;
  //titre nouvelle conversation
  let newConversationTitle = "";

  //fonction au démarrage
  onMount(() => {
    //constante qui récupère la clé dans le locale storage
    const storageToken = localStorage.getItem("key");
    if (storageToken) {
      viewToken = true;
      userToken = storageToken;
    }
    //charge la liste des conversations
    getConversations();
  });

//ouvrir ou fermer la barre latérale
  function openHistory() {
    conversationHistory = !conversationHistory;
  }

  //sauvegarde le token
  function saveToken() {
    if (userToken.trim().length > 0) {
      //stock le token entré par l'utilisateur dans le local storage
      localStorage.setItem("key", userToken);
      viewToken = true;
    } else {
      alert("Veuillez entrer une clé valide.");
    }
  }

  //déconnexion
  function logout() {
    //enlève la clé du local storage
    localStorage.removeItem("key");
    viewToken = false;
    userToken = "";
  }

//récupère les conversations
  async function getConversations() {
    //tant que pas d'erreur
    try {
      //constante qui contient les conversations stockée dans l'API pocketbase
      const response = await fetch(
        "http://127.0.0.1:8090/api/collections/conversations/records",
      );
      //contient la réponse envoyé par le serveur et la converti en json
      const data = await response.json();
      //met a jour le tableau conversation
      conversations = data.items;
      //gère les erreurs si try ne s'éxécute pas 
    } catch (err) {
      console.error("Erreur");
    }
  }

//créer une conversation
async function createConversation() {
  //si pas de conversation, stop la fonction
  if (!newConversationTitle.trim()) return;

  const response = await fetch(
    "http://127.0.0.1:8090/api/collections/conversations/records",
    {
      //méthode 'post' car création de conversation
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //prend en title le titre de la nouvelle conversation
      body: JSON.stringify({ title: newConversationTitle }),
    },
  );

  const data = await response.json();

  //donnée ou tableau vide
  const newConv = data || {}; 

  //on copie le contenu du tableau existant en y ajoutant la nouvelle conversation
  conversations = [...conversations, newConv];
  // on ouvre directement la nouvelle conversation
  selectedConversation = newConv; 
  messages = [];
  newConversationTitle = "";
}

  //charge les messages appartenant à la conversation sélectioné
  async function loadConversation(conv) {
    selectedConversation = conv;
    const response = await fetch(
      //id de la conversation pour que ca soit celle ci qui s'ouvre
      `http://127.0.0.1:8090/api/collections/messages/records?filter=(stockage='${conv.id}')`,
    );

    const data = await response.json();

    messages = data.items.map((message) => ({
      //qui a envoyé le message
      role: message.ia_message ? "assistant" : "user",
      //quel est son contenu
      content: message.content,
    }));
  }

//sauvegarder un message
  async function saveMessage(message) {
    if (!selectedConversation) {
      alert("Aucune conversation sélectionnée !");
      return;
    }

    //cela s'éxécutera si pas d'erreur
    try {
      const response = await fetch(
        "http://127.0.0.1:8090/api/collections/messages/records",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: message.content,
            ia_message: message.role === "assistant",
            //récupère l'id de  la conversation
            stockage: selectedConversation.id, 
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        //lance une erreur qui sera attrapée par catch()
        throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
      }

    } catch (err) {
      console.error("erreur");
    }
  }

  //permet d'envoyer le message a pocketbase et a mistral et obtenir une réponse
  async function sendMessage() {

//     if (!userToken || !userToken.startsWith("mistral-")) {
//   alert("Votre clé Mistral est invalide ou manquante. Veuillez la saisir à nouveau.");
//   logout(); // efface la clé et réaffiche la modale
//   return;
// }
    //si message vide, fin de la fonction
    if (userMessage.trim() === "") return;

    //contient le message de l'utilisateur
    const userMsg = { role: "user", content: userMessage };
    //on l'ajoute a la copie du tableau messages
    messages = [...messages, userMsg];
    //on le sauvegarde
    await saveMessage(userMsg);

    //tant que pas d'erreur on éxécute cela 
    try {
      const response = await fetch(
        "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            model: "mistral-small",
            messages: messages,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        //lance une erreur qui sera traité par catch()
        console.error("erreur");
        throw new Error(data.error?.message || "erreur");
      }

      //contient le texte de la réponse de l'ia les "?" servent à éviter les erreurs si une des propriétés n'existe pas, ca renverra "undefined"
      const replyText =
        data.choices?.[0]?.message?.content || "Pas de réponse";

        //contient le message de l'ia
      const iaMsg = { role: "assistant", content: replyText };
      //qui est ajouté au tableau messages
      messages = [...messages, iaMsg];
      //et est sauvegardé
      await saveMessage(iaMsg);

      //gère l'erreur
    } catch (error) {
      console.error("erreur");

      //contient le message d'erreur
      const errorMsg = {
        role: "assistant",
        content: "erreur",
      };
      //on l'ajoute au tableau messages
      messages = [...messages, errorMsg];
      //et on le sauvegarde
      await saveMessage(errorMsg);
    }
//le contenu du message de l'utilisateur est réinitialisé
    userMessage = "";
  }

  // 🗑️ Supprimer une conversation
  async function deleteConversation(conv) {
    const confirmation = confirm(
      `Voulez-vous vraiment supprimer la conversation "${conv.title}" ?`
    );
    if (!confirmation) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8090/api/collections/conversations/records/${conv.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      // Met à jour la liste locale
      conversations = conversations.filter((c) => c.id !== conv.id);

      // Si c'était la conversation ouverte, on la ferme
      if (selectedConversation?.id === conv.id) {
        selectedConversation = null;
        messages = [];
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  }

</script>

<main>
  <!-- si pas de clé trouvée-->
  {#if !viewToken}
  <!-- création d'une modale -->
    <dialog class="tokenScreen">
      <p>Veuillez entrer votre clé</p>
      <!-- la valeur sera contenue dans userToken -->
      <input
        type="password"
        placeholder="Entrez votre clé"
        bind:value={userToken}
      />
      <!-- la fonction saveToken s'éxécute au clic -->
      <button onclick={saveToken}>Valider</button>
    </dialog>
  {:else}
    <header>
      <h1>O Chat</h1>
      <div>
        <button class="openClose-btn" onclick={openHistory}>☰</button>
        <button class="logout-btn" onclick={logout}>Déconnexion</button>
      </div>
    </header>

    <!--si il y a un historique de conversation ou si l'écran est >= 1440px-->
    {#if conversationHistory || window.innerWidth >= 1440}
      <div class="gestionArea" transition:slide={{ duration: 300 }}>
        <!-- valeur entrée sera contenue dans newConversationTitle -->
        <input
          type="text"
          placeholder="Nouvelle conversation"
          bind:value={newConversationTitle}
        />
        <!-- createConversation s'éxécute au clic -->
        <button class="creation" onclick={createConversation}>Créer</button>
<!-- chaque conv du tableau conversations s'affichera sous forme de liste désordonnée -->
        <ul>
          {#each conversations as conv}
          <li>
            <button class="conversation" onclick={() => loadConversation(conv)}>{conv.title}</button>
            <button class="delete-btn" onclick={() => deleteConversation(conv)}>Supprimer</button>
          </li>
          {/each}
        </ul>
      </div>
    {/if}

<!-- zone de chat     -->
<div class="chatArea">
  <!-- si conversation sélectionée -->
      {#if selectedConversation}
      <!-- pour chaque message du tableau messages -->
        {#each messages as message}
        <!-- si le message est envoyé par user -->
          {#if message.role === "user"}
            <div class="userMessage">
              {message.content}
            </div>
          {:else}
            <div class="iaMessage">
              <!-- utilisation du fichier markdown pour la transcription des messages de l'ia -->
              <Markdown md={message.content} />
            </div>
          {/if}
        {/each}
      {/if}
    </div>

    <!-- zone d’envoi -->
    <div class="attachmentArea">
      <!-- le message entré sera contenu dans userMessage -->
      <input
        type="text"
        placeholder="Entrez un message"
        bind:value={userMessage}
      />
      <!-- sendMessage s'éxécute au clic-->
      <button onclick={sendMessage}
        >Envoyer</button
      >
    </div>
  {/if}
</main>
