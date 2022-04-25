<template>
<!------------- Title Block------------->
<div class="hero auth">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct-auth">
          <!------------- Sign Up Form----------------------->
					<div>   
            <!-- We use the method @submit.prevent to avoid the reloading of page after submitting
                and v-model for data binding -->
            <form class="form-auth" @submit.prevent="signup">   
              	<h1> Sign Up </h1>   
                <div class="row">
                    <label>
                        First Name
                        <input type="text" placeholder="First Name..." v-model="firstname" required="required"/>
                    </label>
                </div>
                <div class="row">
                    <label>
                        Last Name
                        <input type="text" placeholder="Last Name..." v-model="lastname" required="required"/>
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
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from '@/main';
import UsersInfos from "@/firestoreCRUD/UsersInfos";
export default {
  data() {
    return {
      firstname:"",
      lastname:"",
      email: "",
      password: "",
    };
  },
  methods: {
    setUserDisplayName(user,userID){
       if(user && userID){
         UsersInfos.createUser(user,userID)
          .then(() => {
            console.log("Display Name added successfully!");
           })
          .catch(e => {
            alert("Add DisplayName Error :"+e);
          });
       }
    },
    // The method signup() is used after the On Submit event in the form
    signup() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Add display name in the firestore database
          var userSignedUp = {
            userDisplayName : this.firstname+" "+this.lastname,
            userFirstName : this.firstname,
            userLastName : this.lastname
          };
          var user_ID = userCredential.user.uid;
          this.setUserDisplayName(userSignedUp,user_ID);
          // Redirection to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error "+errorCode+" : "+errorMessage);
        });
    },
  },
};
</script>

<style scoped>
.form-auth {
  height: 520px;
}
</style>
