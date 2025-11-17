import './init.js'
import express from 'express';
import { router } from './src/routers/index.router.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views/');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // pour parser les données POST

app.use(router);

app.listen(3010, () => {
  console.log('Server is running on http://localhost:3010');
});
