/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable quotes */

import movies from '../../data/movies.js';

export function moviesByDirector(req, res) {
  const directorName = req.params.directorName;
  const filteredMovies = movies.filter((movie) => {
    return movie.director === directorName});
  // 3️⃣ Si aucun film trouvé
  if (filteredMovies.length === 0) {
    return res.render('404');
  }

  // Object.groupBy(
  //   movies,
  //   movie => movie.director
  // );
  
 // 4️⃣ Rendu de la vue avec un titre approprié et les films filtrés
  res.render('movies', {movies: filteredMovies,
    pageTitle: `Films de ${directorName}`,
    description: `Films de ${directorName}`
  })

}

export function directorNumberMovies (req, res) {
  const directorCount = {};
  movies.forEach((movie) => {
    const director = movie.director;

    if (directorCount[director]){
      directorCount[director] += 1;
    }
    else{
      directorCount[director] = 1;
    }
  })
  res.json(directorCount);

}
