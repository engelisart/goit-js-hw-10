import { fetchBreeds } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import '../node_modules/slim-select/dist/slimselect.css'

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};



window.addEventListener('DOMContentLoaded', onStartWindow);
refs.breedSelect.addEventListener('change', onBreedSelectChange);

function onStartWindow() {
  refs.breedSelect.style.display = 'None';
  refs.error.style.display = 'None';
  refs.catInfo.style.display = 'None';


  fetchBreeds()
    .then(data => {
      data.forEach(d => {
        refs.breedSelect.innerHTML += `<option value=${d.id}>${d.name}</option>`;
      });

      refs.loader.style.display = 'None';
      refs.breedSelect.style.display = 'Block';
      new SlimSelect({
        select: refs.breedSelect
      })
    })
    .catch(() => {
      refs.loader.style.display = 'None';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function onBreedSelectChange(event) {
  refs.loader.style.display = 'Block';
  refs.catInfo.style.display = 'None';

  fetchBreeds().then(data => {
    const info = data.filter(d => d.id == event.target.value)[0];

    refs.catInfo.innerHTML = `
    <div class="container">
        <img class="cat-image" src="${info.image.url}" alt="">
        <div class="cat-details">
            <h1 class="cat-name">${info.name}</h1>
            <p class="cat-desc">${info.description}</p>
            <p class="cat-temp"><b>Temperaments:</b>${info.temperament}</p>
        </div>
    </div>
    `;

    refs.loader.style.display = 'None';
    refs.catInfo.style.display = 'Block';
  });

  
}
