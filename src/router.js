import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Attendance from './views/Attendance.vue'
import Ict from './views/Ict.vue'
import Login from './views/Login.vue'
import UploadPage from './views/UploadPage.vue'
import Framework from './views/Framework.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ins',
      name: 'ins',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Ins.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: Attendance
    },
    {
      path: '/ict',
      name: 'ict',
      component: () => import('./views/Ict.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage
    },
    {
      path: '/framework',
      name: 'framework',
      component: Framework
    }    
  ]
})
