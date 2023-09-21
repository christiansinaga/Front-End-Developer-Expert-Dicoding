import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIDB from '../src/scripts/data/favorite-restaurant-idb';

describe('Liking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should show the like button when the restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        expect(document.querySelector('[aria-label="like this restaurant"]'))
        .toBeTruthy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeFalsy();
    });

    it('should be able to like the restaurant', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        const restaurant = await FavoriteRestaurantIDB.getResto(1);

        expect(restaurant).toEqual({ id: 1 });
        await FavoriteRestaurantIDB.deleteResto(1);
    });

    it('should not add a restaurant again when it has been liked', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        // Tambahkan restoran dengan ID 1 ke daftar restoran yang disukai
        await FavoriteRestaurantIDB.putResto({ id: 1 });

        // Simulasikan pengguna menekan tombol suka
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Harusnya cafe dengan ID 1 cuma ada satu di dalam indexed DB
        expect(await FavoriteRestaurantIDB.getAllResto()).toEqual([{ id: 1 }]);

        // Hapus restoran dari daftar restoran yang disukai
        await FavoriteRestaurantIDB.deleteResto(1);
    });

    it('should not add a restaurant when it has no id', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {},
        });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIDB.getAllResto()).toEqual([]);
    });
});
