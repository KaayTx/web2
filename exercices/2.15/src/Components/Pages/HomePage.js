const HomePage = () => {
  const main = document.querySelector('main');


fetch('https://v2.jokeapi.dev/joke/Any?type=single')
.then((reponse) => reponse.json())
.then((data) => {
  main.innerHTML = `
  <h1>Category : </h1>
  <div>${data.category}</div>
  <h1>Joke</h1>
  <div>${data.joke}</div>`;
})
.catch((err) => console.log(err))
};
export default HomePage;
