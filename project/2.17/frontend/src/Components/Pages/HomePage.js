// eslint-disable-next-line import/no-extraneous-dependencies
import anime from 'animejs/lib/anime.es';
import grootImage from '../../img/groot.jpg';
import stormtrooperImage from '../../img/stormtrooper.jpg';

const HomePage = () => {
  const homePage = `
  <div class="container text-center">
          <div class="row">
            <div class="col">
              <h3>Welcome to myMovies !</h3>
  
              <p>Here you can find a selection of our favorite movies ; )</p>
            </div>
          </div>
  
          <div class="row mb-3">
          <div class="col">
            <button type="button" class="btn btn-dark">About</button>
          </div>
  
  
          <div class="row">
            <div id="groot" class="col-12 col-lg-6 clickable">
              <img class="img-thumbnail" src="${grootImage}" alt="Groot" />
            </div>
  
            <div id="stormtrooper" class="col-12 col-lg-6 clickable">
              <img class="img-thumbnail" src="${stormtrooperImage}" alt="Stormtrooper" />
            </div>
          </div>
  </div>`;
  
    const main = document.querySelector('main');
    main.innerHTML = homePage;

    // si on met les 2 anime là ça marche aussi apparemment
    anime({
      targets: ['#groot'],
      scale: 0.5,
      duration: 2000,
      direction: 'alternative',
      easing: 'linear',
      rotate: '5turn',
    });

    anime({
      targets: ['#stormtrooper'],
      scale: 0.5,
      duration: 2000,
      direction: 'alternative',
      easing: 'linear',
      rotate: '-5turn',
    });


    const groot = document.querySelector('#groot');
    groot.addEventListener('mouseover', () => {
      anime({
          targets: groot,
          scaleX: -1,
          duration: 1000,
          easing: 'easeInOutQuad',
          direction: 'alternate',
      });
    });

    const stormtrooper = document.querySelector('#stormtrooper');
    stormtrooper.addEventListener('click', () => {
      anime({
        targets: stormtrooper,
        scaleX: -1,
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
      });
    });
};

export default HomePage;
