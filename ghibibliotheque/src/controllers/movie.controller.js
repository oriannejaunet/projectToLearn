import movies from '../../data/movies.js';

export function displayMovies (req, res) {
  res.render('movies', {
    // movies: movies,
    // La version raccourcie quand la clé et la valeur ont le même nom
    movies,
    pageTitle: 'Tous les films',
    description: 'Tous les films du studio Ghibli'
  });
}

export function displayMovie(req, res) {
  // Je vais récupérer l'id dans les paramètres de l'URL
  const movieId = Number(req.params.id);

  // On va chercher dans notre tableau de films celui qui a l'id correspondant à celui dans l'URL
  const movieFound = movies.find((movie) => movie.id === movieId);

  // Si aucun film n'a été trouvé, on affiche une page 404
  if (!movieFound) {
    res
      .status(404)
      .render('404');
    return;
  }

  res.render('movie', {
    // Je passe à la vue le film trouvé
    movie: movieFound,
  });
}

export function displayCurrentMovies(req, res) {
  // 🔹 Tri du tableau par date de sortie décroissante (plus récent → plus ancien)
  const sortedMovies = movies.toSorted((a, b) => b.release_date - a.release_date);

  const NB_RECENT_MOVIE = process.env.NB_RECENT_MOVIE || 5;
  // 🔹 Sélection des 5 plus récents
  const latestMovies = sortedMovies.slice(0, NB_RECENT_MOVIE);
  return res.render('movies', {
    movies: latestMovies,
    pageTitle: 'Films récents',
    description: 'Découvrez les 5 derniers films sortis'
  });
}
