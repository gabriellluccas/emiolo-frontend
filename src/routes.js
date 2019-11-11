import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/auth/login';
import Register from './components/auth/register';

import UsersList from './components/lists/users';
import SpeciesList from './components/lists/species';
import PlanetsList from './components/lists/planets';

import Planet from './components/info/planet';
import Person from './components/info/person';
import Film from './components/info/film';
import Specie from './components/info/specie';
import Starship from './components/info/starship';
import Vehicle from './components/info/vehicle';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      {path: '/', name: 'login', component: Login},
      {path: '/register', name: 'register', component: Register},
      {path: '/users', name: 'users', component: UsersList},
      {path: '/swapi/species', name: 'species', component: SpeciesList},
      {path: '/swapi/planets', name: 'planets', component: PlanetsList},
      {path: '/swapi/planet', name: 'planet', component: Planet, props: true},
      {path: '/swapi/person', name: 'person', component: Person, props: true},
      {path: '/swapi/film', name: 'film', component: Film, props: true},
      {path: '/swapi/specie', name: 'specie', component: Specie, props: true},
      {path: '/swapi/starship', name: 'starship', component: Starship, props: true},
      {path: '/swapi/vehicle', name: 'vehicle', component: Vehicle, props: true}
  ]
})