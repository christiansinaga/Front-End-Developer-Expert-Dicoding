/* eslint-disable no-undef */
import RestaurantsSource from '../../data/restaurant-source';
import { createRestaurantsItemTemplate } from '../templates/page-template-generator';
import UrlParser from '../../routes/url-parser';

const SearchRestaurants = {
  async render() {
    return `
      <section class="content">
        <h1 tabindex="0">Search Restaurants</h1>
        <div class="list" id="search-results"></div>
      </section>
    `;
  },

  async afterRender() {
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');
    const searchResults = document.querySelector('#search-results');

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const query = url.query || '';

    searchInput.value = query; // Set the query from the URL to the input field

    searchButton.addEventListener('click', async () => {
      const newQuery = searchInput.value.trim();
      const newUrl = `/#/search?q=${newQuery}`;

      window.history.pushState(null, null, newUrl); // Update the URL

      if (newQuery === '') {
        // Handle empty query
        searchResults.innerHTML = '<p>Please enter a search restaurant.</p>';
        return;
      }

      try {
        const restaurants = await RestaurantsSource.searchResto(newQuery);

        if (restaurants.length === 0) {
          searchResults.innerHTML = '<p>No restaurants found.</p>';
        } else {
          searchResults.innerHTML = '';
          restaurants.forEach((restaurant) => {
            searchResults.innerHTML += createRestaurantsItemTemplate(restaurant);
          });
        }
      } catch (error) {
        searchResults.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  },
};

export default SearchRestaurants;
