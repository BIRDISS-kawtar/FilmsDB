<script>
// The content of the dashboard view is splitted into components 
import FavoriteMovies from "@/components/FavoriteMovies.vue"
import UsersDisplayNames from "../firestoreCRUD/UsersDisplayNames";
/*------- Get the current user crendentials ---------*/
import { getAuth } from "firebase/auth";
/*------- END : Get the current user crendentials ---------*/
// Each imported child component must be registred inside the parent component
export default {
  name: "home",
  components: {
   FavoriteMovies
  },
  data(){
	  return{
		  userID : new Array(),
	  };
  },
  created(){
	this.getUserDisplayName;
  },
  methods:{
	  async getUserDisplayName(){
		  	const auth = getAuth();
			const user = auth.currentUser;
			if (user) {
				// User is signed in
				var user_ID = user.uid;
				
				

			} else {
			// No user is signed in.
			alert("No user is signed in !");
			}
	  }
  }
};
</script>

<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
                    <h1>This is your Dashboard! </h1><!--TODO : this dashboard must contain the lists of favorite and searched movies-->
                    <p>This page is only visible to users that are currently logged in</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!------------- END : Title Block------------->

</template>
