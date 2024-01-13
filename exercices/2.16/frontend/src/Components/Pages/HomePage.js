const HomePage = () => {
  const main = document.querySelector('main');
  fetch('http://localhost:3000/questions')
  .then((reponse) => reponse.json())
  .then((data) => {
  main.innerHTML = `
    <h1>${data.question}</h1>
    <p>${data.answers.text}</p>
  `;
  })
  .catch((err) => console.log(err))
};

export default HomePage;
