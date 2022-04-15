<script>
import { RouterLink, RouterView } from "vue-router";
import createStore from '@/store/index.js'
/* --------- LOGOUT with firebase code ------------ */
import { getAuth, signOut } from "firebase/auth";
export default{
  methods: {
    logout(){
      const auth = getAuth();
      signOut(auth).then(() => {
        alert('Successfully logged out');
        this.$router.push('/');
      }).catch((error) => {
        alert(error.message);
        this.$router.push('/');
      });
    },
  },
};
/*-------- Track the chosen value of the on left items of the navbar---------- */
$(document).ready(function () {
	$("ul[id*=tracked_choices] li").click(function () {
		alert($(this).html()); // gets innerHTML of clicked li
		alert($(this).text()); // gets text contents of clicked li
		console.log('before commit');
		//this.$store.commit('updateChoice','Updateee');
		createStore.commit('updateChoice',$(this).text());
		console.log('after commit');
		console.log(createStore.getters.chosen_item_navbar);
		//console.log(this.$store.getters.chosen_item_navbar);
	});
});
</script>
<template>
<!-------------------Header------------------->
<header class="ht-header">
	<div class="container">
		<nav class="navbar navbar-default navbar-custom">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header logo">
				    <div class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					    <span class="sr-only">Toggle navigation</span>
					    <div id="nav-icon1">
							<span></span>
							<span></span>
							<span></span>
						</div>
				    </div>
				    <a href="index-2.html"><img class="logo" src="images/logo1.png" alt="" width="119" height="58"></a>
			    </div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
					<!--------------On Left Items--------------->
					<ul id="tracked_choices" class="nav navbar-nav flex-child-menu menu-left">
						<li class="hidden">
							<a href="#page-top"></a>
						</li>
						<!--Trending Section -->
						<li><a href="/">Trending</a></li>
						<!-----------Genres Section------------ -->
						<li class="dropdown first">
							<a class="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
							Genres<i class="fa fa-angle-down" aria-hidden="true"></i>
							</a>
							<ul class="dropdown-menu level1">
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" >Movie grid<i class="ion-ios-arrow-forward"></i></a>
									<ul class="dropdown-menu level2">
										<li><a href="moviegrid.html">Movie grid</a></li>
										<li><a href="moviegridfw.html">movie grid full width</a></li>
									</ul>
								</li>			
								<li><a href="movielist.html">Movie list</a></li>
								<li><a href="moviesingle.html">Movie single</a></li>
								<li class="it-last"><a href="seriessingle.html">Series single</a></li>
							</ul>
						</li>
						<!-----------END :Genres Section------------ -->
						<!-----------Top Rated Section------------ -->
						<li><a href="/">Top Rated</a></li>
					</ul>
					<!--------------END : On Left Items--------------->
					<!--------------On Right Items--------------->
					<ul class="nav navbar-nav flex-child-menu menu-right">
						<!-- TODO : search for loginLink and btn signupLink and rename them correctly--> 
						<li class="loginLink"><RouterLink to="/login">Login</RouterLink></li>
						<li class="loginLink"><RouterLink to="/signup">Sign Up</RouterLink></li>
						<button class="btn signupLink" @click="logout">Logout</button>
					</ul>
					<!--------------END :On Right Items--------------->
				</div>
			<!-- /.navbar-collapse -->
	    </nav>
	    
	    <!-- top search form -->
	    <div class="top-search">
	    	<select>
				<option value="united">TV show</option>
				<option value="saab">Others</option>
			</select>
			<input type="text" placeholder="Search for a movie, TV Show or celebrity that you are looking for">
	    </div>
	</div>
</header>
<!--------------- END : Header ---------------------->
</template>