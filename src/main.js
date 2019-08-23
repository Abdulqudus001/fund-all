import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import vuetify from '@/plugins/vuetify';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueCookies);

// Axios global config
axios.defaults.baseURL = 'https://test.fundall.io/api/v1';
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  post: {
    'Content-Type': 'application/json',
  },
  common: {
    Authorization: `Bearer ${VueCookies.get('api_token')}`,
  },
};

Vue.use(VueAxios, axios);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
