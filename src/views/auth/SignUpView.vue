<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
          <!------------- Sign Up Form----------------------->
					<div>   
            <!-- We use the method @submit.prevent to avoid the reloading of page after submitting
                and v-model for data binding -->
            <form class="form-style-1" @submit.prevent="signup">   
              	<h1> Sign Up </h1>   
                <div class="row">
                    <label>
                        Full Name
                        <input type="text" placeholder="Full Name..." v-model="fullname" required="required"/>
                    </label>
                </div>
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
				  </div>
          <!------------- END : Sign Up Form----------------------->
			  </div>
		  </div>
	  </div>
  </div>
</div>
<!------------- END : Title Block------------->
</template>

<script>
/* -------- SIGN UP with Firebase Code ---------- */
// The necessary imports of firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import UsersDisplayNames from "../../firestoreCRUD/UsersDisplayNames";
export default {
  data() {
    return {
      fullname:"",
      email: "",
      password: "",
    };
  },
  methods: {
    setUserDisplayName(user){
       if(user){
         UsersDisplayNames.createUser(user)
          .then(() => {
            alert("Display Name added successfully!");
           })
          .catch(e => {
            alert(e);
          });
       }
    },
    // The method signup() is used after the On Submit event in the form
    signup() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Add display name in the firestore database
          var userSignedUp = {
            userID:userCredential.user.uid,
            userDisplayName : this.fullname
          };
          this.setUserDisplayName(userSignedUp);
          // Redirection to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
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
  height: 440px;
  width: 934px;
  margin-top: 200px;
  margin-bottom: 50px;
}
.form-style-1 label{
  width: 700px;
  font-size: 18px;
}
.form-style-1 input{
  width: 700px;
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
