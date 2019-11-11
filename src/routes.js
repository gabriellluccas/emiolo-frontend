import Vue from 'vue';
import Router from 'vue-router';

import UsersList from './components/lists/users';
import SpeciesList from './components/lists/species';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      {path: '/', name: 'users', component: UsersList},
      {path: '/swapi/species', name: 'species', component: SpeciesList}
  ]
})