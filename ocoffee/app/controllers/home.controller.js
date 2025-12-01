import dataMapper from '../models/dataMapper.js';
export default {
  homePage (req, res){
     const coffeeResults = dataMapper.findAllCoffee();
    
            coffeeResults.then((result) => { // cas où on reçoit un résultat sans rencontrer d'erreur
                res.render('home', {coffees: result});
    
            }).catch((error) => {
    
                console.log(error.message);
                res.status(500).render('error/500');
    
            });
    
  },
};