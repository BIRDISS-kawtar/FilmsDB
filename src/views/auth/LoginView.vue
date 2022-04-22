<template>
<!------------- Title Block------------->
<div class="hero auth">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct-auth">
           <!------------- Login Form----------------------->
            <form class="form-auth" @submit.prevent="login">   
              	<h1> Login </h1>   
                <div class="row">
                    <label for="email">
                        Email
                        <input type="email" placeholder="Email address..." v-model="email" required="required"/>
                    </label>
                </div>  
                <div class="row">
                    <label for="password">
                        Password
                        <input type="password" placeholder="Password..." v-model="password" required="required"/>
                    </label>
                </div>   
                <button type="submit">Submit </button>   
            </form> 
          <!-------------END : Login Form----------------------->
				</div>
			</div>
		</div>
	</div>
</div>
<!------------- END : Title Block------------->
</template>

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

<style scoped>
.form-auth {
  height: 342px;
}
</style>
