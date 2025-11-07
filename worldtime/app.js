// TODO
import { router } from './src/routers/index.router.js';
import express from 'express';

const app = express();
app.use(router);
app.set('view engine' , 'ejs');
app.set('views' , './src/views');


app.listen(4242, () => {
    console.log('Server is running on http://localhost:4242');
});