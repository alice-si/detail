import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import BootstartpVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Row, Column } from 'vue-grid-responsive'
import firebase from 'firebase'
require('dotenv').config()

Vue.component('v-select', vSelect)
Vue.use(BootstartpVue)
Vue.component('row', Row)
Vue.component('column', Column)

Vue.config.productionTip = false

// Replace this area with Alice config data
var firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId
}
// config area end

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
