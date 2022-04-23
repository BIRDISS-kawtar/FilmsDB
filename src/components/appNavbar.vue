<template>
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
					<img class="logo" src="/src/assets/images/logo1.png" alt="" width="119" height="58">
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
					<!--------------On Left Items--------------->
					<ul id="tracked_choices" class="nav navbar-nav flex-child-menu menu-left">
						<li class="hidden">
							<a href="#page-top"></a>
						</li>
						<!--Trending Section -->
						<li @click="setMovieCriteria('Trending')"><a href="#">Trending</a></li>
						<!-----------Top Rated Section------------ -->
						<li @click="setMovieCriteria('TopRated')"><a href="#">Top Rated</a></li>
						
						<!-----------Genres Section------------ -->
						<li>
							<select @change="setMovieCriteria('genre', $event)">
								<option>Genre</option>
								<option 
									v-for="genre in JSON.parse(JSON.stringify(this.genres)).genres" :key="genre" 
									:value="JSON.stringify({ genre_id: genre.id, genre_name: genre.name })"
									>{{ genre.name }}
								</option>
							</select>
						</li>
						<!-----------END :Genres Section------------ -->
					</ul>
					<!--------------END : On Left Items--------------->
					
					<!--------------On Right Items--------------->
					<ul class="nav navbar-nav flex-child-menu menu-right">
						<!-- TODO : search for loginLink and btn signupLink and rename them correctly--> 
						<li class="loginLink"><RouterLink to="/login">Login</RouterLink></li>
						<li class="loginLink"><RouterLink to="/signup">Sign Up</RouterLink></li>
					</ul>
					<!--------------END :On Right Items--------------->
				</div>
				<!-- /.navbar-collapse -->
			</nav>
			
			<!-- top search form -->
			<div class="top-search">
				<input type="text" placeholder="Search for a movie that you are looking for">
			</div>
		</div>
	</header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {

	data() {
		return {
			genres: []
		};
	},

	created() {
		console.log("AppNavBar is created");

		this.getGenres();
		
	},

	methods: {
		getGenres() {
			const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.$store.getters.getApiKey}&language=en-US`;
			
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.genres = data; 
				console.log(this.genres);
			})
			.catch(error => {
				console.log(error);
			})
		},

		setMovieCriteria(movieType, event = null) {
			
			const genreSelected = (event) ? JSON.parse(event.target.value) : null;

			const movie_criteria = {
				type: movieType
			};

			if (genreSelected) {
				Object.assign(movie_criteria, genreSelected);
			}


			console.log(movie_criteria);
			this.$store.commit('setMessage', movie_criteria);

			//AYMANE : to retrieve the value use this.$store.getters.getMessage;
		},

		logout() {
			const auth = getAuth();
			signOut(auth)
			.then(() => {
				this.$router.push('/');
			})
			.catch((error) => {
				console.log(error.message);
				this.$router.push('/');
			});
		},
	},

	watch: {
		
	},

};
</script>

<style scoped>

.nav button{
	font-family: 'Dosis', sans-serif;
	color: #ffffff;
	font-weight: bold;
	text-transform: uppercase;
	border-radius: 5px;
	border: none;
	background-color: #dd003f;
	cursor: pointer;
}





</style>
