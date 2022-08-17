import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
      info: document.querySelector('.country-info'),
}
refs.input.addEventListener('input', debounce(searchName, DEBOUNCE_DELAY))

function searchName() {
    const ourCountry = refs.input.value.trim();
    if (ourCountry === '') {
        refs.list.innerHTML = '';
        refs.info.innerHTML = '';
        return
    }
  

     fetchCountries(ourCountry)
         .then(renderCountry)
    .catch((error) => {
      console.log(error)
         refs.info.innerHTML = ''
       refs.list.innerHTML = ''
    });
}

function renderCountry(country) {
    let variable = ""
    if (country.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      refs.info.innerHTML = ''
       refs.list.innerHTML = ''
    return;
    }
    else if (country.length > 1) {
   
        variable = country
        .map(({ name, flags }) => {
        return `
     <li class="item"><img class="country-img" src=${flags.svg} >
       <h2 class="country-title">${name.official}</h2>
     </li>`;
      })
            .join("");
       refs.info.innerHTML = ''
        refs.list.innerHTML = variable
    }
    else {
         
    variable = country
      .map(({ name, capital, population, flags, languages }) => {
        return `
       <div class="card-country"><img class="coutry-img-big" src=${flags.svg}>
         <h2 class="country-title-big">${name.official}</h2>
         <p class="country-info"><span class="text">Capital: </span>${capital}</p>
         <p class="country-info"><span class="text">Population: </span>${population}</p>
         <p class="country-info"><span class="text">Languages: </span>${Object.values(
           languages
         )}</p>
       </div>`;
      })
        .join('');
        refs.list.innerHTML = ''
        refs.info.innerHTML = variable
  }

          return variable;
}