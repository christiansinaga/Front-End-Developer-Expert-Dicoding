// unlikeButtonSpec.js

import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIDB from '../src/scripts/data/favorite-restaurant-idb';


describe('Unliking A Restaurant', () => {
  const addButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addButtonContainer();
  });

  it('should not display liked button when the restaurant is not liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should not throw an error if the unliked restaurant ID is not provided', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {}, // Mengirimkan restoran tanpa ID
    });

    // Cobalah menghapus restoran yang tidak ada dalam daftar favorit
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak seharusnya ada error yang dilempar
    expect(await FavoriteRestaurantIDB.getAllResto()).toEqual([]);
  });

});
