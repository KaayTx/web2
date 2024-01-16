const movies = [];

const readAllMovies = async () => {
    try {
      const res = await fetch('/api/films');
      const films = await res.json();
      return films;
    } catch (err) {
      console.error('readAllMovies::error: ', err);
      throw err;
    }
  };
const addOneMovie = (movie) => movies.push(movie);

export {readAllMovies, addOneMovie};