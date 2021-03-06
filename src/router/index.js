import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

Router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && token !== 'null' && (JSON.parse(user).role+'' === token.split('z|')[1])) {
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.split('z|')[0];
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default Router
