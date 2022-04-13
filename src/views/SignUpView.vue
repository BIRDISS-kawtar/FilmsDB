<script>
/* -------- SIGN UP with Firebase Code ---------- */
// The necessary imports of firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        // The method signup() is used after the On Submit event in the form
        signup() {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              alert('Successfully registered! Please login.');
              // Redirection to the login page
              this.$router.push('/login');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            });
        },
    },
};
</script>
<template>
<div>   
  <!-- We use the method @submit.prevent to avoid the reloading of page after submitting
      and v-model for data binding -->
  <form @submit.prevent="signup">     
    <h2>Sign Up</h2>     
    <input       
      type="email"       
      placeholder="Email address..."       
      v-model="email"     
    />     
    <input       
      type="password"       
      placeholder="password..."       
      v-model="password"     
    />    
    <button type="submit">
       Sign Up
    </button>   
  </form> 
</div>
</template>

<style>

</style>
