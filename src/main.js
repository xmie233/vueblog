import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/img/font_maqv8cucfwc/iconfont.css'
import './assets/img/font_t80qdzzj24j/iconfont.css'
import './assets/css/common.css'
import animated from 'animate.css'

Vue.use(mavonEditor)
Vue.use(animated)
Vue.config.productionTip = false

Vue.filter('toDate', (date) => {                    // 2017年5月10日15：35
  if (date) {
    const d = new Date(date)
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' +
      d.getDate() + '日 ' + hours + ' : ' + minutes
  }
})

Vue.filter('toTag', (arr) => {
  if (arr) {
    return arr.join('，')
  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
