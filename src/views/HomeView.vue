<template>
<!------------- Title Block------------->
<div class="hero common-hero">
	
</div>

<!------------- END : Title Block------------->
<MovieList />
</template>

<script>
// The content of the home view is splitted into components 
//import GetGenres from "@/components/GetGenres.vue";
import MovieList from "@/components/MovieList.vue";
// Each imported child component must be registred inside the parent component
export default {
  name: "home",
  components: {
	  MovieList
  }
};
</script>