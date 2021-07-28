<template>
  <h1>
      login 
  </h1>
  <p>
      please login with google :
  </p>
  <button @click="login">
      google
  </button>
</template>

<script>
import firebase from 'firebase'
import router from '../router';
export default {
    name: 'name',
    methods:{
        login(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            this.$router.push('/');
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });


        }
    }
}
</script>

<style>

</style>