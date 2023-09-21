const assert = require('assert');

Feature('Liking and Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Liking multiple restaurants', async ({ I }) => {
    I.seeElement('#no-favorites');
    I.see('No favorites selected yet.', '#no-favorites');
    I.amOnPage('/');

    // Array to store the names of liked restaurants
    const likedRestaurantNames = [];
    for (let i = 1; i <= 3; i += 1) {
      I.waitForElement('.restaurant_title', 10);
      I.seeElement('.restaurant_title');

      // Adding the restaurant name to the array of liked restaurants
      const currentRestaurant = locate('.restaurant_title').at(i);
      likedRestaurantNames.push(await I.grabTextFrom(currentRestaurant));
      I.click(currentRestaurant);

      I.waitForElement('#likeButton', 10);
      I.seeElement('#likeButton');
      I.click('#likeButton');
      I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.seeElement('#explore-restaurant');

    // Checking one by one if the list of restaurants in the favorite page
    for (let i = 1; i <= likedRestaurantNames.length; i++) {
      I.waitForElement('.restaurant_title', 10);
      I.seeElement('.restaurant_title');

      const currentFavoriteRestaurant = locate('.restaurant_title').at(i);
      const currentFavoriteRestaurantName = await I.grabTextFrom(
        currentFavoriteRestaurant,
      );

      assert.ok(
        likedRestaurantNames.includes(currentFavoriteRestaurantName),
        `${currentFavoriteRestaurantName} is not in the list of favorite restaurants`
      );
    }
  });

Scenario('Unliking one restaurant', async ({ I }) => {
  // Liking a restaurant first

  I.amOnPage('/');
  I.seeElement('#explore-restaurant');
  I.waitForElement('.restaurant_title', 10);
  I.seeElement('.restaurant_title');
  const firstRestaurant = locate('.restaurant_title').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');

  // Unliking the previously liked restaurant
  I.seeElement('#explore-restaurant');
  I.waitForElement('.restaurant_title', 10);
  I.seeElement('.restaurant_title');
  I.click(locate('.restaurant_title').first());
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.dontSee(firstRestaurantName);
});

Scenario('Liking and Unliking a Restaurant', async ({ I }) => {
    I.amOnPage('/');

    // Like a restaurant
    I.waitForElement('.restaurant_title', 10);
    I.seeElement('.restaurant_title');
    const firstRestaurant = locate('.restaurant_title').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');

    // Unlike the liked restaurant
    I.waitForElement('.restaurant_title', 10);
    I.seeElement('.restaurant_title');
    I.click(locate('.restaurant_title').first());
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
    I.dontSee(firstRestaurantName);
  });