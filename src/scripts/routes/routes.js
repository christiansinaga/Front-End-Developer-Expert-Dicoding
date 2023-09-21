/* eslint-disable no-unused-vars */
import ListRestaurants from '../views/pages/list';
import FavoriteRestaurants from '../views/pages/favorite';
import DetailRestaurants from '../views/pages/detail';
import SearchRestaurants from '../views/pages/search';

const routes = {
  '/': ListRestaurants,
  '/list': ListRestaurants,
  '/favorite': FavoriteRestaurants,
  '/detail/:id': DetailRestaurants,
  '/search': SearchRestaurants,
};

export default routes;
