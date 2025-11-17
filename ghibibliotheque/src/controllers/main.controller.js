import movies from '../../data/movies.js';

export function displayHomepage(req, res) {
  const firstThreeMovies = movies
  // Si je souhaite trier les films pour récupérer les 3 derniers sortis
  // le trie ici est décroissant sur la date de sortie
  // On utilise la méthode toSorted pour ne pas muter (modifier) le tableau original
    .toSorted((a, b) => b.release_date - a.release_date)
  // Dans ce nouveau tableau trié, on ne garde que les 3 premiers éléments
    .slice(0, 3);

  res.render('home', {
    // Je passe dans une variable `movies` les 3 films à afficher
    // Côté ejs, je pourrai accéder à cette variable via `movies`
    movies: firstThreeMovies,
  });
}
