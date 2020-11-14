import Vue from 'vue'
import App from './App.vue'
import message from './utils/message'
Vue.config.productionTip = false
Vue.use(message)
new Vue({
  render: h => h(App),
}).$mount('#app')
