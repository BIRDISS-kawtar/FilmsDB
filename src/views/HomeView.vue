<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
					<h1> Films DB, All your favourite movies in one place ! </h1>
          			<GetGenres /> <!-- GetGenres doesn't display anything but it's called here to get the list of genres-->
				</div>
			</div>
		</div>
	</div>
</div>

<!------------- END : Title Block------------->
<TrendingMovies />
</template>

<script>
// The content of the home view is splitted into components 
import GetGenres from "@/components/GetGenres.vue";
import TrendingMovies from "@/components/TrendingMovies.vue"
import TopRatedMovies from "@/components/TopRatedMovies.vue"
import GenreMovies from "@/components/GenreMovies.vue";
// Each imported child component must be registred inside the parent component
export default {
  name: "home",
  components: {
   GetGenres,
   TrendingMovies,
   TopRatedMovies,
   GenreMovies
  }
};
</script>