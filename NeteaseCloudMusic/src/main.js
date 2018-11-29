// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* 导入字体图标 */
import './public/sass/_style.scss'
/* axios 插件 */
import VueAxios from 'vue-axios'
import axios from 'axios'
/* 导入 vuex  */
import store from './store'
/* 图片预览插件 */
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
/* 导入 Muse-UI 三方库 */
import Mues from './muse-ui.config'
/* 导入触摸插件 */
import VueTouch from 'vue-touch'

/* 使用 axios Viewer Mues-ui */
Vue.use(VueAxios, axios, Viewer)
Vue.use(Mues)

/* 导入vue-touch后, 使用touch插件 */
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
