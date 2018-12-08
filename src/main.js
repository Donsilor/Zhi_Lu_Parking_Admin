// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import 'jquery-ui';
import $ from 'jquery';
import echarts from 'echarts';
import api from "./assets/js/sereviceapi";
import './assets/iconfont/iconfont.css';
import { User } from "./assets/js/entity";
import vueDrag from 'vue-dragging';
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'babel-polyfill'
import { CentralInterface} from "./assets/js/entity";
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

Vue.use(contentmenu)

Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vueDrag);
Vue.use(VueVideoPlayer);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  CentralInterface.$emit("addTab", to.meta.title, to.name, to.path);

  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (User.info.id) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});


