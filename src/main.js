import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import BootstartpVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Row, Column } from 'vue-grid-responsive'

Vue.component('v-select', vSelect)
Vue.use(BootstartpVue)
Vue.component('row', Row)
Vue.component('column', Column)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
