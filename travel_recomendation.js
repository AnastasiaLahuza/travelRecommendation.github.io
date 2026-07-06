const resultContainer = document.getElementById('result');
const searchInput = document.getElementById('destinationInput');
const searchBtn = document.getElementById('btnSearch');
const resetBtn = document.getElementById('btnReset');

function searchDestination() {
  const input = searchInput.value.toLowerCase().trim();
  resultContainer.innerHTML = '';

  fetch('travel_recomendation_api.json')
    .then(response => response.json())
    .then(data => {
      let results = [];

      if (input.includes('beach')) {
        results = data.beaches;
      } else if (input.includes('temple')) {
        results = data.temples;
      } else if (input.includes('countries')) {
        data.countries.forEach(country => {
          results = results.concat(country.cities);
        });
      } else {
        data.countries.forEach(country => {
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(input)) {
              results.push(city);
            }
          });
        });
      }

      if (results.length > 0) {
        results.forEach(item => {
          resultContainer.innerHTML += `
            <div class="result-card">
              <h2>${item.name}</h2>
              <img src="${item.imageUrl}" alt="${item.name}">
              <p>${item.description}</p>
            </div>`;
        });
      } else {
        resultContainer.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultContainer.innerHTML = 'An error occurred while fetching data.';
    });
}

searchBtn.addEventListener('click', searchDestination);
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  resultContainer.innerHTML = '';
});