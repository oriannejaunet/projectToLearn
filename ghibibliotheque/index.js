import express from 'express';
import { router } from './src/routers/index.router.js';
import { notFound } from './src/middlewares/not-found.midlleware.js';
import { informations } from './src/middlewares/informations.middleware.js';
const app = express();

app.use(informations);

// Je rajoute à express la gestion des fichiers statiques
// Tous les fichiers dans le dossier "public" seront servis tels quels
app.use(express.static('public'));

// On va configurer ejs
app.set('view engine', 'ejs');
// Le dossier qui contiendra les fichiers / les vues `ejs` sera le dossier au chemin `./views`
app.set('views', './src/views');

app.use(router);

app.use(notFound);

// On récupère le port dans les variables d'environnement
// OU si il n'est pas défini, on utilise le port 3000
// Le `||` permet de définir une valeur par défaut
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
