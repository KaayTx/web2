const movies = [];

const readAllMovies = () => fetch('/api/movies').then((reponse) => reponse.json());

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };