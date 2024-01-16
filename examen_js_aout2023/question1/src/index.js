import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import questions from './utils/questions';

const main = document.createElement('main');
document.body.appendChild(main);

function renderQuestions() {
    const randomQuestions = getRandomQuestions(questions, 3);

    const tableLines = randomQuestions.map((question) => {
        const answersHTML = question.answers.map((answer) => `
              <label>
                <input type="radio" name="question${question.id}" value="${answer.text}">
                ${answer.text}
              </label><br>
            `).join('');

        return `
          <tr>
            <td>${question.question}</td>
            <td>${answersHTML}</td>
          </tr>
        `;
    }).join('');

    main.innerHTML = `
      <div class="table-responsive pt-5">
        <table class="table table-danger">
          <tr>
            <th>Question</th>
            <th>Answers</th>
          </tr>
          ${tableLines}
        </table>
      </div>
    `;

    const scoreButton = document.createElement('button');
    scoreButton.textContent = 'Calculate Score';
    scoreButton.addEventListener('click', calculateScore);
    main.appendChild(scoreButton);
}

function calculateScore() {
    const selectedAnswers = document.querySelectorAll('input[type=radio]:checked');
    let score = 0;

    selectedAnswers.forEach((selectedAnswer) => {
        const questionId = parseInt(selectedAnswer.name.replace('question', ''), 10);
        const question = questions.find((q) => q.id === questionId);

        if (question && question.answers.find((a) => a.text === selectedAnswer.value && a.isCorrect)) {
            score += 1;
        }
    });

    main.innerHTML = `<p>Your Score: ${score}/3</p>`;
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', renderQuestions);
    main.appendChild(restartButton);
}

function getRandomQuestions(allQuestions, count) {
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, count);
}

renderQuestions();
