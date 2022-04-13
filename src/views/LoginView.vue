<script>
/* -------- LOGIN with Firebase Code ---------- */
// The necessary imports of firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        // The method login() is used after the On Submit event in the form
        login() {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              // Logged in
              const user = userCredential.user;
              alert('Successfully logged in !');
              // Redirection to the login page
              this.$router.push('/dashboard');
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
  <form @submit.prevent="login">     
    <h2>Login</h2>     
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
       Login
    </button>   
  </form> 
</div>
</template>
