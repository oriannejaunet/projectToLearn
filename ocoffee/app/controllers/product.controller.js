import dataMapper from '../models/dataMapper.js';

export default {
    list(req, res) {

        const coffeeResults = dataMapper.findAllCoffee();

        coffeeResults.then((result) => { // cas où on reçoit un résultat sans rencontrer d'erreur
            res.render('catalogue', {coffees: result});

        }).catch((error) => {

            console.log(error.message);
            res.status(500).render('error/500');

        });

    },

    async coffeeId(req, res, next) {

        try {

            const coffeeId = req.params.reference;
            const coffee = await dataMapper.findCoffeeByReference(coffeeId);
            console.log(coffee)
            if (!coffee) {
                next();
                return;
            }

            res.render('coffeeDetails', { coffee });

        } catch (error) {

            // pour chaque bloc try, on associe un bloc catch. ce bloc sera exécutée seulement si le bloc try rencontre un problème
            console.log(error.message);
            res.status(500).render('error/500');

        }

    }

};