import CONFIG from '../../globals/config';

const createRestaurantsItemTemplate = (restaurant) => `
  <div tabindex="0" class="restaurant_item">
  <a href="/#/detail/${restaurant.id}" class="restaurant_card">
    <img tabindex="0" class="restaurant_image" loading="lazy" src="${
      CONFIG.BASE_IMAGE + restaurant.pictureId
    }" alt="${restaurant.name}" title="${restaurant.name}">
    <div tabindex="0" class="restaurant_city">${restaurant.city}</div>
    <div tabindex="0" class="restaurant_item_content">
      <p class="restaurant_rating">
        <i class="fas fa-star">${restaurant.rating}</i>
      </p>
      <h4 class="restaurant_title">${restaurant.name}</h4>
      <div class="restaurant_description">${restaurant.description.slice(
        0,
        150,
      )}...</div>
    </div>
  </a>
</div>

`;

const createRestaurantsDetailTemplate = (restaurant) => `
<div class="detail">
  <div class="img-container">
    <img class="detail-img" crossorigin="anonymous" alt="${restaurant.name}" src="${CONFIG.BASE_IMAGE + restaurant.pictureId}" />
  </div>
  <div id="containerFavorite">
    <ul class="detail-info">
      <li class="info-item">
        <i title="restaurant" class="fas fa-store-alt icon-primary"></i>
        <p class="detail-name-address-rating">${restaurant.name}</p>
      </li>
      <li class="info-item">
        <i title="address" class="fas fa-map-marker-alt icon-primary"></i>
        <p class="detail-name-address-rating">${restaurant.address}, ${restaurant.city}</p>
      </li>
      <li class="info-item">
        <i title="ratings" class="fas fa-star icon-primary"></i>
        <p class="detail-name-address-rating">${restaurant.rating}</p>
      </li>
      <li class="info-item">
        ${restaurant.categories
          .map(
            (category) => `
            <span class="category">${category.name}</span>
          `,
          )
          .join('')
}
      </li>
      <li class="info-item">
        <div class="desc-title">Deskripsi:</div>
      </li>
      <li class="info-item">
        <div class="desc-value partial" id="desc">${restaurant.description}
        </div>
        <li class="info-item">
          <a href="javascript:void(0)" id="btnSelengkapnya"
            class="desc-full show">Selengkapnya</a>
          <a href="javascript:void(0)" id="btnSembunyi"
            class="desc-secret hide">Sembunyikan</a>
        </li>
      </li>
    </ul>
    <div class="like" id="likeButtonContainer"></div>
  </div>
</div>
<h2 class="title-menu">Menu</h2>
<div class="detail-menu">
  <div class="detail-food">
    <h4>Food</h4>
    <ul>
      ${restaurant.menus.foods
        .map(
          (food) => `
            <li>
              <div class="list-item">
                <img src="./images/food.jpg" alt="${food.name}">
                <div class="list-item-text">
                  <p>${food.name}</p>
                </div>
              </div>
            </li>
          `,
        )
        .join('')}
    </ul>
  </div>

  <div class="detail-drink">
    <h4>Drink</h4>
    <ul>
      ${restaurant.menus.drinks
        .map(
          (drink) => `
            <li>
              <div class="list-item">
                <div class="list-item-image">
                  <img src="./images/drink.jpg" alt="${drink.name}" loading="lazy" crossorigin="anonymous"> 
                </div>
                <div class="list-item-text">
                  <p>${drink.name}</p>
                </div>
              </div>
            </li>
          `,
        )
        .join('')}
    </ul>
  </div>
</div>

<h2 class="title-review">Reviews</h2>

<div class="detail-review">
  ${restaurant.customerReviews
    .map(
      (review) => `
        <div class="detail-review-item">
          <div class="review-header">
            <p class="review-name">${review.name}</p>

            <p class="review-date">${review.date}</p>
          </div>

          <div class="review-body">
            ${review.review}
          </div>
        </div>
      `,
    )
    .join('')}
</div>


`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantsItemTemplate,
  createRestaurantsDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
