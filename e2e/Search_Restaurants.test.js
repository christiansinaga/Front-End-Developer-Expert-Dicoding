const assert = require('assert'); // Import assert library

Feature('Searching Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('searching for restaurants with empty query', async ({ I }) => {
  I.seeElement('hero-content');
  I.click('#search-input');

  // Mengisi kolom pencarian dengan query kosong
  I.fillField('#search-input', '');
  I.click('#search-button');

  // Menunggu pesan kesalahan
  I.waitForText('Please enter a search restaurant.', 5, '.list');
});

Scenario('searching for non-existent restaurants', async ({ I }) => {
  I.seeElement('hero-content');
  I.click('#search-input');

  // Mengisi kolom pencarian dengan query yang tidak ada hasilnya
  I.fillField('#search-input', 'NonExistentRestaurant');
  I.click('#search-button');

  // Menunggu pesan tidak ada hasil
  I.waitForText('No restaurants found.', 5, '.list');
});

Scenario('clicking on a restaurant in search results', async ({ I }) => {
  I.seeElement('hero-content');
  I.click('#search-input');

  // Mengisi kolom pencarian
  I.fillField('#search-input', 'Fairy Cafe');
  I.click('#search-button');

  // Menunggu hasil pencarian
  I.waitForText('Search Restaurants', 5, 'h1');
  I.waitForElement('.restaurant_title', 10);
  I.seeElement('.restaurant_title');

  // Mengklik salah satu restoran dalam hasil pencarian
  I.click(locate('.restaurant_title').first());
});
