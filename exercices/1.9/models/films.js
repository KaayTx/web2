const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '../data/films.json');

function readAllMovies(minDuration){
    const films = parse(jsonDbPath);

    if(minDuration === undefined) return films;

    const minDurationAsNumber = Number(minDuration);
    if(Number.isNaN(minDurationAsNumber) || minDurationAsNumber < 0) return undefined;

    const filmsWithMinDuration = films.filter((film) => film.duration >= minDuration);
    return filmsWithMinDuration;
};

function readOneMovie(id){
    const idAsNumber = Number(id);

    const films = parse(jsonDbPath);
    const indexFilm = films.findIndex((film) => film.id === idAsNumber);
    if(indexFilm < 0) return undefined;
    return films[indexFilm];
    
};

function createOneMovie(title, link, duration, budget){
    const films = parse(jsonDbPath);

    const newFilm = {
        id: getNextID(),
        title,
        link,
        duration,
        budget,
    };

    films.push(newFilm);

    serialize(jsonDbPath, films);

    return newFilm;

};

function getNextID(){
    const films = parse(jsonDbPath);
    const lastIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if(lastIndex === undefined) return 1;
    const lastId = films[lastIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
};

function deleteOneMovie(id){
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if(foundIndex < 0) return undefined;
    const deletedMovies = films.splice(foundIndex, 1);
    const deletedMovie = deletedMovies[0];
    serialize(jsonDbPath, films);

    return deletedMovie;
};

function updateOneFilm(id, whatToUpdate){
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if(foundIndex < 0) return undefined;

    const updatedMovie = { ...films[foundIndex], ...whatToUpdate };
    
    films[foundIndex] = updatedMovie;

    serialize(jsonDbPath, films);

    return updatedMovie;
};

function updateOrCreateOneFilm(id, filmProps){
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if(foundIndex < 0) {
        const newFilm = { id: idAsNumber, ...filmProps };
        films.push(newFilm);
        serialize(jsonDbPath, films);
        return newFilm;
    };

    const updatedMovie = { ...films[foundIndex], ...filmProps };
    
    films[foundIndex] = updatedMovie;

    serialize(jsonDbPath, films);

    return updatedMovie;
};


module.exports = {
    readAllMovies,
    readOneMovie,
    createOneMovie,
    deleteOneMovie, 
    updateOneFilm,
    updateOrCreateOneFilm,
};