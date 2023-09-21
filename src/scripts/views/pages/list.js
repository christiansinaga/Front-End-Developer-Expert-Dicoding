/* eslint-disable no-undef */
import RestaurantsSource from '../../data/restaurant-source';
import { createRestaurantsItemTemplate } from '../templates/page-template-generator';

const ListRestaurants = {
  async render() {
    return `
      <section class="content">
      <div class="container">
          <h1 tabindex="0">Explore Our Exciting Dining Options</h1>
          <div class="list" id="explore-restaurant"></div>
      </div>
  </section>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantsSource.listResto();
    const restaurantsContainer = document.querySelector('#explore-restaurant');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantsItemTemplate(restaurant);
    });
  },
};

export default ListRestaurants;
