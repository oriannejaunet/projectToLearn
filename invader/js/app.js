// ton code ici
const main = document.querySelector("main");
const grid = document.createElement("div");
grid.classList.add("grid_pixels");
main.appendChild(grid); // 2. Ajouter la grille au <main>

// creation de fonction de génération de grille
function addGrid(gridSize, pixelSize) {
    while (grid.firstChild !== null) {
        grid.removeChild(grid.firstChild);
    }

    grid.style.gridTemplateColumns = `repeat(${gridSize}, ${pixelSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, ${pixelSize}px)`;

    // 3. Ajouter la userValueGrille et la userValuePixel grace à une boucle
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        grid.appendChild(pixel);
        // gérer l'etape 3 avec le changement de couleur au clic

        pixel.addEventListener("click", () => {
            const pixelColor = pixel.style.backgroundColor;
            if (pixelColor === "black") {
                pixel.style.backgroundColor = "grey";
            }
            else {
                pixel.style.backgroundColor = "black";
            }
        })
    }
} //fermeture fonction creation grille

// Ajouter le formulaire
const header = document.querySelector("header");
const form = document.createElement("form");
// form.id = "invader" //Creation id pour recuperer le button avec
header.appendChild(form);

const labelGrille = document.createElement("label");
// labelGrille.setAttribute("for", "taille_grille")
const inputGrille = document.createElement("input");
inputGrille.type = "number";
// inputGrille.name = "taille_grille"
inputGrille.placeholder = "Choisir une taille";

const labelPixel = document.createElement("label");
// labelPixel.setAttribute("for", "taille_pixels") //Creation de l'interieur du label
//setAttribute obligatoire car "for" est réservé déjà en JS
const inputPixel = document.createElement("input");
inputPixel.type = "number";
// inputPixel.name = "taille_pixels"
inputPixel.placeholder = "Choisir une taille de pixels";


const button = document.createElement("button");
button.type = "submit";
// button.form = "invader" //lier son button à l'id du form
button.textContent = "Valider";


form.appendChild(labelPixel);
form.appendChild(inputPixel);
form.appendChild(labelGrille);
form.appendChild(inputGrille);
form.appendChild(button);

form.addEventListener("submit", (event) => {
    event.preventDefault(); //Empecher reset formulaire
    const userValuePixel = Number(inputPixel.value);
    const userValueGrille = Number(inputGrille.value);
    if (!Number.isInteger(userValuePixel) || !Number.isInteger(userValueGrille)) {
        alert("Attention, veuillez entrer un nombre entier")
    }
    else {
        addGrid(userValueGrille, userValuePixel);
        console.log("ca affiche bien")
    }
})




