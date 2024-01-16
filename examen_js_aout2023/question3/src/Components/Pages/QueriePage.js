import Navigate from '../Router/Navigate';
import { clearPage, renderPageTitle } from '../../utils/render';

const QueryPage = () => {
    clearPage();
    renderPageTitle('CREATE A QUERY');
    renderForm();
  };

  function renderForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title ';
  title.required = true;
  title.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Add query ';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(title);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onaddquery);
  }

  async function onaddquery(e) {
    e.preventDefault();
    const title = document.querySelector('#title');
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.value }),
        };

        const response = await fetch('http://localhost:3000/queries', option);
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const data = await response.json();
        console.log('New query added : ', data);
        Navigate('/');
    }

  
  export default QueryPage;
  