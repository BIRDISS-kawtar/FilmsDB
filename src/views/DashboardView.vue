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
import Profile from "@/components/Profile.vue"
import { getAuth, signOut } from "firebase/auth";
import UsersInfos from "@/firestoreCRUD/UsersInfos";
import FavoriteMovies from "@/components/FavoriteMovies.vue";
import { isProxy, toRaw } from 'vue';
/*-------------- Get the current user ----------------*/ 
const auth = getAuth();
const user = auth.currentUser; 
/*-------------- END :Get the current user ----------------*/ 
export default {
  name: "dashboard",
  components: { // Each imported child component must be registred inside the parent component
  	Profile,
	FavoriteMovies
  },
  data(){
	return{
		userDisplayName : "",
		activeComponent : "Profile",
		userFavoriteMoviesList : new Array(),// To be sent to the component MovieList
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
	addToFavoriteMoviesList(movieID){

		let request_getAmovie = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.$store.getters.getApiKey}&language=en-US`;
		// GET request using fetch with error handling
		fetch(request_getAmovie)
		.then(async response => {
			const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
			// check for error response
			if (!response.ok) {
				const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
				return Promise.reject(error);
			}
			// continue if there is any error
			this.userFavoriteMoviesList.push(data);
			console.log("movie list "+typeof [] );
			console.log("each element "+typeof data);
			console.log(data);
		})
		.catch(error => {
			this.errorMessage = error;
			console.error("Error while fetching the details of the movie ID: "+movieID, error);
		}); 
	}
  },
  created(){ // Once the dashboard page is loaded we get the display name of the current user
	
	if (user) {// User is signed in

		/*--------------Users Infos Block-------------------*/
		const docSnap = UsersInfos.getUserInfos(user.uid); 
		docSnap.then(docSnap => {
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				this.userDisplayName = docSnap.data().userDisplayName; // Get user DisplayName 
				//console.log("test "+typeof this.userFavoriteMoviesList+"and"+"");
				/*--------------Get and send the list of the user Favorite Movies-----------*/
				for(let movieID of Object.values(docSnap.data().moviesID)){
					this.addToFavoriteMoviesList(movieID);
				}
				/*--------------END : Get and send the list of the user Favorite Movies-----*/
				console.log("movie list "+typeof this.userFavoriteMoviesList);
				if(isProxy(this.userFavoriteMoviesList)){ //this If() block is not really necessary
					var userFavoriteMoviesListConverted = toRaw(this.userFavoriteMoviesList);
				}	
				console.log(userFavoriteMoviesListConverted);
			
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


