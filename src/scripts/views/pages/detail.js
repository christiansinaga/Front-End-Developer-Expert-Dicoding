/* eslint-disable no-undef */
import RestaurantsSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantsDetailTemplate } from '../templates/page-template-generator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import PostReview from '../../utils/review-post';
import { sendMessageToWebSocket } from '../../utils/websocket-initiator';

const DetailRestaurants = {
  async render() {
    return `
      <h2 class="title_detail">Detail Restoran</h2>
      <section class="content"></section>
      <div id="likeButtonContainer"></div>
      <div class="form-review">
        <form id="review-form">
          <div class="mb-3">
            <label for="name-input" class="form-label">Name</label>
            <input type="text" class="form-control" id="name-input" minlength="3" placeholder="Your name..." required>
          </div>

          <div class="mb-3">
            <label for="review-input" class="form-label">Review</label>
            <textarea class="form-control" id="review-input" minlength="3" placeholder="Your review..." required></textarea>
          </div>

          <button id="submit-review" type="submit" class="submit-btn">Submit Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantsSource.detailResto(url.id);
    const restaurantContainer = document.querySelector('.content');
    restaurantContainer.innerHTML += createRestaurantsDetailTemplate(restaurant);

    // Buat elemen customer-reviews secara dinamis jika belum ada
    let reviewContainer = document.querySelector('.customer-reviews');
    if (!reviewContainer) {
      reviewContainer = document.createElement('div');
      reviewContainer.className = 'customer-reviews';
      const contentSection = document.querySelector('.content');
      contentSection.appendChild(reviewContainer);
    }

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        description: restaurant.description,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    // Dapatkan elemen-elemen yang diperlukan
    const descValue = document.getElementById('desc');
    const btnSelengkapnya = document.getElementById('btnSelengkapnya');
    const btnSembunyi = document.getElementById('btnSembunyi');

    // Tambahkan event listener untuk tombol "Selengkapnya"
    btnSelengkapnya.addEventListener('click', () => {
      // Tampilkan deskripsi lengkap
      descValue.classList.remove('partial');
      // Sembunyikan tombol "Selengkapnya"
      btnSelengkapnya.classList.add('hide');
      // Tampilkan tombol "Sembunyikan"
      btnSembunyi.classList.remove('hide');
    });

    // Tambahkan event listener untuk tombol "Sembunyikan"
    btnSembunyi.addEventListener('click', () => {
      // Tampilkan deskripsi parsial
      descValue.classList.add('partial');
      // Tampilkan tombol "Selengkapnya"
      btnSelengkapnya.classList.remove('hide');
      // Sembunyikan tombol "Sembunyikan"
      btnSembunyi.classList.add('hide');
    });

    // Tambahkan event listener untuk form review
    const reviewForm = document.querySelector('#review-form');
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.querySelector('#name-input').value;
      const reviewInput = document.querySelector('#review-input').value;

      if (nameInput.trim() === '' || reviewInput.trim() === '') {
        errorMessage.textContent = 'Name and review cannot be empty';
        return;
      }

      // Kirim ulasan menggunakan PostReview function
      const reviewResponse = await PostReview(restaurant.id, nameInput, reviewInput);

      // Kirim data ulasan ke websocket
      if (reviewResponse) {
        sendMessageToWebSocket({
          name: nameInput,
          review: reviewInput,
        });
      }

      // Setelah mengirim ulasan, kosongkan input field
      document.querySelector('#name-input').value = '';
      document.querySelector('#review-input').value = '';
    });
  },
};

export default DetailRestaurants;
