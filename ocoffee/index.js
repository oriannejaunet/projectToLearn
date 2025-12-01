import express from 'express';
import 'dotenv/config'; //https://www.npmjs.com/package/dotenv
import router from './app/routers/router.js';

const PORT = process.env.PORT;

//* création de l'application
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//* configuration de l'application

// - configuration du moteur de templates
app.set('view engine', 'ejs');
app.set('views', './app/views'); // on indique le chemin où trouver les templates ejs

// - gestion des assets (notamment les fichiers css, images, js front)
app.use(express.static('./public'));
app.use(express.static('./node_modules/leaflet'))


// - branchement du router
app.use(router);

// - gestion des erreurs (404)
app.use(function (req, res) {
  res.status(404).render('error/404');
});

// lancement de l'application
app.listen(PORT, function(){
  console.log(`O cofee is Running on port ${PORT}`);    
});