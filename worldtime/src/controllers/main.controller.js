import capitalCities from "../../modules/capital-cities.js";
import { getFormattedDate } from "../../modules/formatted.js";

const date = new Date();
export function homePage (req, res) {
    //en premier argument, chemin vers fichier EJS, 2ème argument, objet JS avec pairs clé/valeurs
    res.render('homepage' , {
        title: 'Mon super site de capitale',
        //je passe une variable a mon template ejs qui contient le tableau de capitales
        cities : capitalCities
    } );
}

export function cityDetail (req, res) {
    const city  = req.params.city;
    let capital;

    for (const c of capitalCities) {
        if (c.name.toLowerCase() === city.toLowerCase()) {
            capital = c;
            break;
        }
    }

    if (!capital) {
        return res.status(404).send(`<p>Aucune donnée pour "${city}".</p>`);
    }

const formatted = getFormattedDate(capital);

    res.send(` <p>Fuseau horaire ${capital.tz}</p>  <p>Date et heure locales :${formatted}</p>`);
};
