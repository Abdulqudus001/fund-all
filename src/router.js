import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/landing.vue';
import Login from './views/login.vue';
import Register from './views/register.vue';
import Home from './views/home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
  ],
});
