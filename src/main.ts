import Vue from 'vue'
import App from './App.vue'
import './plugins/vue-modal'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App),
}).$mount('#app')

Object.defineProperty(window, 'app', {
  value: app,
})
