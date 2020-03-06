// vue.use会调用install这个对象里的方法
import ceb from './home/ceb'
import toubu from './home/header'

export default {
  install: function (Vue) {
    // 这可以全局注册
    Vue.component('ceb', ceb)
    Vue.component('toubu', toubu)
  }
}
