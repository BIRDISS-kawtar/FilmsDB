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
						
						<!--Trending Section -->
						<li @click="setMovieCriteria('trending')"><RouterLink to="/">Trending</RouterLink></li>
						<!-----------Top Rated Section------------ -->
						<li  @click="setMovieCriteria('top_rated')"><RouterLink to="/">Top Rated</RouterLink></li>
						
						<!-----------Genres Section------------ -->
						<li>
							<select class="select-drop-down" @change="setMovieCriteria('genre', $event)" v-model="selected">
								<option v-bind:value="selected" hidden disabled><RouterLink to="/">Genre</RouterLink></option>
								<option 
									v-for="genre in JSON.parse(JSON.stringify(this.genres)).genres" :key="genre" 
									:value="JSON.stringify({ genre_id: genre.id, genre_name: genre.name })"
									>
									{{ genre.name }}
									
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
				<input @change="setMovieCriteria('searched', $event)" type="text" placeholder="Search for a movie that you are looking for">
			</div>
		</div>
	</header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { toRaw } from "vue";

export default {

	data() {
		return {
			genres: [],
			selected: "Genre"
		};
	},

	created() {
		
		const default_movie_criteria = {
			type: "trending", 
		}

		this.getGenres();	
		this.$store.commit('setMessage', ["movie_criteria", default_movie_criteria]);
		//this.$router.push("/");
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
			})
			.catch(error => {
				console.log(error);
			})
		},

		setMovieCriteria(movieType, event = null) {
			
			
			let movie_criteria = {
				type: movieType
			};

			if (event) {
				switch(movieType) {		
					case "genre":
						Object.assign(movie_criteria, JSON.parse(event.target.value));
						break;
					case "searched":
						movie_criteria['search_value'] = event.target.value;
						break;
				}
			}

			

			this.$store.commit('setMessage', ["movie_criteria", movie_criteria]);
		},

		logout() {
			const auth = getAuth();
			
			signOut(auth)
			.then(() => {
				this.$router.push('/');
			})
			.catch((error) => {
				
				this.$router.push('/');
			});
		},

		
	}
};
</script>

<style scoped>

.select-drop-down {
	background-color: transparent; 
	border: none;
	appearance: none;
	font-family: 'Dosis', sans-serif;
    font-size: 14px;
    color: #abb7c4;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
}

select:hover {
	color: #dcf836;
}

select:focus {
	color: #dd003f;
}

option:not(:checked) { 
	background-color: black;  
	color: #abb7c4;
}
</style>
