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

export default {
	name: "home",
	data() {
		return {
			title: "HomeView Page Title"
		}
	},
	
	components: {
		MovieList
	},	

	mounted() {
		console.log("HomeView is mounted");
	}
};
</script>