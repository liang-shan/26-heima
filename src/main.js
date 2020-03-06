import Vue from 'vue'
import components from '@/components'
import App from './App.vue'
import router from './router'
import './promission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'

import axios from './utils/request' // 引入axios
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性

Vue.use(components)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
