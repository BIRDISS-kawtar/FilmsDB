<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
           <!------------- Login Form----------------------->
            <form class="form-style-1" @submit.prevent="login">   
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
.common-hero {
    height: 770px;
    background: url(/public/images/uploads/user-hero-bg.jpg) repeat;
}
.form-style-1 {
  height: 342px;
  width: 934px;
  margin-top: 200px;
  margin-bottom: 50px;
}
.form-style-1 label{
  width: 700px;
  font-size: 18px;
}
.form-style-1 input{
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
}
.form-style-1 div{
  padding-bottom: 10px;
  padding-top: 10px;
}
.form-style-1 button{
  font-family: 'Dosis', sans-serif;
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  border: none;
  background-color: #dd003f;
  height: 42px;
  width: 25%;
  cursor: pointer;
}
.hero-ct {
  padding-top: 0px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
