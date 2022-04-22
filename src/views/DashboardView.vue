<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
					<h1>{{userDisplayName}}'s Profile</h1>
				</div>
			</div>
		</div>
	</div>
</div>
<!------------- END : Title Block------------->
<!--------------- Dashboard Content Block -------------->
<div class="page-single">
	<div class="container">
		<div class="row ipad-width2">
			<!------------------- User Sidebar Menu ---------------->
			<div class="col-md-3 col-sm-12 col-xs-12">
				<div class="user-information">
					<div class="user-fav">
						<p>Account Details</p>
						<ul>
							<li><a @click="activeComponent = 'Profile'">Profile</a></li>
							<li><a @click="activeComponent = 'FavoriteMovies'">Favorite movies</a></li>
						</ul>
					</div>
					<div class="user-fav">
						<p>Others</p>
						<ul>
							<li><a>Change password</a></li>
							<li><a class="btn signupLink" @click="logout">Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
			<!------------------- END : User Sidebar Menu ---------------->
			<!------------------- Active Component Content ---------------->
			<div class="col-md-9 col-sm-12 col-xs-12">
				<component :is="activeComponent" />
			</div>
			<!------------------- END : Active Component Content ---------------->
		</div>
	</div>
</div>
<!--------------- END : Dashboard Content Block -------------->
</template>


<script>
// The content of the dashboard view is splitted into components 
import FavoriteMovies from "./FavoriteMovies.vue"
import UsersInfos from "@/firestoreCRUD/UsersInfos";
/*------- Get the current user crendentials ---------*/
import { getAuth } from "firebase/auth";
/*------- END : Get the current user crendentials ---------*/
// Each imported child component must be registred inside the parent component
export default {
  name: "dashboard",
  components: { // Each imported child component must be registred inside the parent component
   FavoriteMovies,
   Profile
  },
  data(){
	  return{
		  userDisplayName : "",
		  activeComponent : "FavoriteMovies",
		  userFavoriteMovies : new Array(),
	  };
  },
  methods:{
	  logout(){ // Logout Method
		signOut(auth).then(() => {
			alert('Successfully logged out');
			this.$router.push('/');
		}).catch((error) => {
			alert(error.message);
			this.$router.push('/');
		});
    },
  },
  created(){ // Once the dashboard page is loaded we get the display name of the current user
	
	if (user) {// User is signed in

		/*--------------Users Infos Block-------------------*/
		const docSnap = UsersInfos.getUserInfos(user.uid); 
		docSnap.then(docSnap => {
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				this.userDisplayName = docSnap.data().userDisplayName;
			} else {
				console.log("No such document!");
			}
		});
		/*--------------END : Users Infos Block-------------------*/
		
	} else {
		alert("No user is signed in !"); // No user is signed in.
	}
  },
  
};
</script>


 
