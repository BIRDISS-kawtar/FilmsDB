<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="hero-ct">
					<h1> Films DB, All your favourite movies in one place ! </h1>
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
import TrendingMovies from "./TrendingMovies.vue"
import TopRatedMovies from "./TopRatedMovies.vue"

// Each imported child component must be registred inside the parent component
export default {
  name: "home",
  components: {
   TrendingMovies,
   TopRatedMovies
  }
};
</script>