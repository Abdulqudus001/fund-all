import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/landing.vue';
import Login from './views/login.vue';
import Register from './views/register.vue';
import Home from './views/home.vue';

Vue.use(Router);

const router = new Router({
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
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.$cookies.get('api_token') == null) {
      router.push('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
