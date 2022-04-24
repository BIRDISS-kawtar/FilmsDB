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
		
		if ("movie_criteria" in this.$store.getters.getMessage) {
			const movie_criteria = toRaw(this.$store.getters.getMessage["movie_criteria"]);
			const movie_criteria_type = movie_criteria.type;
			switch (movie_criteria_type) {
				case 'top_rated': 
					this.title = "Top Rated Movies";
					break;
				case 'trending': 
					this.title = "Trending Movies";
					break;
				case 'genre':
					this.title = movie_criteria_new_value.genre_name + " " + "Movies";
					break;
				case 'searched':
					this.title = "Your search results for" + " " + movie_criteria_new_value.search_value;
			}
		}
	},

	watch: {
		'$store.state': {
			handler(newValue) {

                if (isProxy(newValue)) {
					
					const message = toRaw(newValue).message;
					
					if ("movie_criteria" in message) {

                        const movie_criteria_new_value = toRaw(newValue).message["movie_criteria"];
						//don't delete the key here it will be deleted on MovieList Watcher !!!
                        
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
							case 'searched':
								this.title = "Your search results for" + " " + movie_criteria_new_value.search_value;
						}
                    }
                }
			},
			deep: true
		},
		
	}
};
</script>