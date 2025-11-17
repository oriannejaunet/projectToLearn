// food.controller.js

import { getAllFoods, addFood } from "../services/food.service.js";

// afficher la page d'accueil
export async function displayHomePage(req, res) {
    const foods = await getAllFoods(req.query.search);

    res.render("home", { foods });
}

// afficher le formulaire pour créer un nouvel aliment
export function showCreateFoodForm(req, res) {
    res.render('create');
}

// traiter le formulaire POST
export async function createFood(req, res) {
    const name = req.body.name;
        await addFood(name);
        res.redirect("/");
}



