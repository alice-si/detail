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

Vue.component('v-select', vSelect)
Vue.use(BootstartpVue)
Vue.component('row', Row)
Vue.component('column', Column)

Vue.config.productionTip = false

// Replace this area with Alice config data
var firebaseConfig = {
  apiKey: 'AIzaSyClWtMV50HsCpghxr3UupyTKJsr_PHOfLQ',
  authDomain: 'alice-vodafone-test.firebaseapp.com',
  projectId: 'alice-vodafone-test',
  storageBucket: 'alice-vodafone-test.appspot.com',
  messagingSenderId: '1005741895404',
  appId: '1:1005741895404:web:ab917813d9211ece4bffc9',
  measurementId: 'G-3ZZB6E56MQ'
}
// config area end

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
