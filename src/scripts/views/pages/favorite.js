import FavoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import { createRestaurantsItemTemplate } from '../templates/page-template-generator';

const FavoriteRestaurants = {
  async render() {
    return `
      <section class="content">
        <div class="container">
          <h1 tabindex="0">Top Restaurant Selections</h1>
          <div class="list" id="explore-restaurant"></div>
          <div class="no-favorites" id="no-favorites">No favorites selected yet.</div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIDB.getAllResto();
    const restaurantsContainer = document.querySelector('#explore-restaurant');
    const noFavoritesMessage = document.querySelector('#no-favorites');

    if (restaurants.length === 0) {
      // Tampilkan pesan jika tidak ada restoran favorit
      noFavoritesMessage.style.display = 'block';
    } else {
      // Sembunyikan pesan jika ada restoran favorit
      noFavoritesMessage.style.display = 'none';

      // Tampilkan restoran favorit
      restaurantsContainer.innerHTML = ''; // Bersihkan isi sebelum menambahkan elemen baru
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantsItemTemplate(restaurant);
      });
    }
  },
};

export default FavoriteRestaurants;
