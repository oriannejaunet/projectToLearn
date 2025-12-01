import dataMapper from '../models/dataMapper.js';

export default {

    async addCoffeeForm(req, res) {
        try {

            const countries = await dataMapper.getAllCountries();
            const characteristics = await dataMapper.getAllCharacteristics();

            res.render('addCoffee', {
                countries, characteristics
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).render('error/500');
        }
    },


    async addCoffee(req, res) {
        try {
            const coffeeData = {
                reference: Number(req.body.reference),
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                available: req.body.available === "Oui",
                country_id: Number(req.body.country_id),
            };

            const newCoffee = await dataMapper.addCoffee(coffeeData);
            const coffeeId = newCoffee.reference;

            const characteristics = req.body.characteristics;

            let characteristicsArray = [];

            if (characteristics === undefined) {
                characteristicsArray = [];
            }
            else if (typeof characteristics === "string") {
                characteristicsArray = [characteristics];
            }
            else if (Array.isArray(characteristics)) {
                characteristicsArray = characteristics;
            }

            for (const id of characteristicsArray) {
                await dataMapper.addCoffeeCharacteristic(
                    coffeeId,
                    Number(id)
                );
            }


            res.redirect('/admin/addCoffee');

        } catch (error) {
            console.error(error.message);
            res.status(500).render('error/500');
        }
    }


};