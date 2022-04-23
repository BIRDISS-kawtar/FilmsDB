<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
					<h1>{{title}}</h1>
				</div>
			</div>
		</div>
	</div>
</div> 
<!------------- END : Title Block------------->
<MovieList />
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { isProxy, toRaw } from 'vue';

export default {
	name: "home",
	data() {
		return {
			title: ""
		}
	},
	
	components: {
		MovieList
	},	

	mounted() {
		console.log("HomeView is mounted");
		
		const movie_criteria_type = toRaw(this.$store.getters.getMessage["movie_criteria"].type);
	
		switch(movie_criteria_type) {
			case 'top_rated': 
				this.title = "Top Rated Movies";
				break;
			case 'trending': 
				this.title = "Trending Movies";
				break;
			case 'genre':
				this.title = movie_criteria_new_value.genre_name + " " + "Movies";
				break;
		}

	},

	watch: {
		'$store.state': {
			handler(newValue) {
                
                if (isProxy(newValue)) {
                    const movie_criteria_new_value = toRaw(newValue).message["movie_criteria"];

					switch(movie_criteria_new_value.type) {
						case 'top_rated': 
							this.title = "Top Rated Movies";
							break;
						case 'trending': 
							this.title = "Trending Movies";
							break;
						case 'genre':
							this.title = movie_criteria_new_value.genre_name + " " + "Movies";
							break;
					}
                }
			},
			deep: true
		},
		
	}



};
</script>