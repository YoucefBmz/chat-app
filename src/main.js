import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBVeCiTIz8QRZ8bDHWcia18wGK8BzSIWDM",
    authDomain: "vue-auth-chat.firebaseapp.com",
    databaseURL: "https://vue-auth-chat.firebaseio.com",
    projectId: "vue-auth-chat",
    storageBucket: "vue-auth-chat.appspot.com",
    messagingSenderId: "1005281136346",
    appId: "1:1005281136346:web:8ff2202d31bba139655fe3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

window.db = db;



createApp(App).use(router).mount('#app')
