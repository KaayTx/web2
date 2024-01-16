import Navigate from '../Router/Navigate';
import { addOneMovie } from '../../models/movies';

const AddMoviePage = () => {
  const addMoviePage = `
  <div class="text-center">
    <h3>Movies</h3>
  
    <p>Here you can find all movies</p>
  
    <form class="px-5">
              <div class="mb-3">
                <label for="title">Enter title</label>
                <input
                  class="form-control"
                  type="text"
                  name="title"
                  id="title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="duration">Enter duration (minutes)</label>
                <input
                  class="form-control"
                  type="number"
                  name="duration"
                  id="duration"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="budget">Enter budget (million)</label>
                <input
                  class="form-control"
                  type="number"
                  name="budget"
                  id="budget"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="link">Enter link</label>
                <input
                  class="form-control"
                  type="url"
                  name="link"
                  id="link"
                  required
                />
              </div>
              <input type="submit" class="btn btn-primary" value="Add Movie" />
      </form>  
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = addMoviePage;

  const form = document.querySelector('form');
  const title = document.querySelector('#title');
  const duration = document.querySelector('#duration');
  const budget = document.querySelector('#budget');
  const link = document.querySelector('#link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const movieToBeAdded = {
      title: title.value,
      duration: duration.value,
      budget: budget.value,
      link: link.value,
    };

    addOneMovie(movieToBeAdded);
    Navigate('/movies');

  });

};


export default AddMoviePage;