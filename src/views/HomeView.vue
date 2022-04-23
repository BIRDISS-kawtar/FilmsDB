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
// The content of the home view is splitted into components 
//import GetGenres from "@/components/GetGenres.vue";
import MovieList from "@/components/MovieList.vue";
// Each imported child component must be registred inside the parent component

let page_title = "HomeView Page Title";

export default {
  name: "home",
  data() {
    return {
      title: page_title
    }
  },
  components: {
	  MovieList
  }
};
</script>