Feature('Posting Restaurants Review');

const { I } = inject();

Scenario('User can post a review for a restaurant', async () => {
  // Navigate to the detail page of a restaurant (replace 'restaurantId' with a valid ID)
  I.amOnPage('/');
  I.seeElement('#explore-restaurant');
  I.waitForElement('.restaurant_title', 10);
  I.seeElement('.restaurant_title');

  const firstRestaurant = locate('.restaurant_title').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  // Fill in the review form
  const name = 'John Doe';
  const review = 'This restaurant is amazing!';
  I.fillField('#name-input', name);
  I.fillField('#review-input', review);

  // Submit the review
  I.click('#submit-review');

  // Wait for the review to be posted (you can adjust the timeout as needed)
  I.waitForText('Your review has been posted successfully', 10);

  // Verify that the review appears in the restaurant's reviews section
  I.see(name, '.review-name');
  I.see(review, '.review-body');
});
