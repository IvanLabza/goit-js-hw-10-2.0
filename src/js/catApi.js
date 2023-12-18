import {
  fetchBreeds,
  fetchCatByBreed,
  axios,
  catInfo,
  fetchCatList,
} from './index.js';

import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_WXbF52R1spkTlMz9vew7yvRXw9LDzwR8zgvU2Mvb0gqIxYzeaAqaEZ6yzKe0O95I';

let m = 1;

const selectCat = new SlimSelect({
  select: '.breed-select',

  events: {
    afterChange: newVal => {
      add();

      if (m > 2) {
        fetchCatByBreed(newVal[0].value);

        catInfo.innerHTML = ``;

        fetchCatList.classList.toggle('is-hidden');
      }
    },
  },
});

function add() {
  m += 1;
}

fetchBreeds()
  .then(breeds => {
    renderCatList(breeds);
    localStorage.setItem('breeds', JSON.stringify(breeds));
  })
  .catch(error => console.log(error));

function renderCatList(breeds) {
  let data = [];

  breeds.forEach(breed => {
    data.push({ text: breed.name, value: breed.id });
  });

  selectCat.setData(data);
  fetchCatByBreed(data[0].value);
}
