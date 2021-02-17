import Vue from 'vue'
// import * as firebase from 'firebase/app'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-database'
require('dotenv').config()

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
firebase.initializeApp(firebaseConfig)

// Add firebase modules globally
Vue.prototype.$firebase = firebase
Vue.prototype.$google = new firebase.auth.GoogleAuthProvider()
Vue.prototype.$database = firebase.database()
