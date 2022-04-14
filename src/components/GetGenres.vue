<script>
export default {
  name: "get-genres-of-movies",
  data() {
    return {
      genres: new Array(),
      errorMessage: null
    };
  },
  created() {
    // GET request using fetch with error handling
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=18f0e56333fe7988fb15f351af41f492&language=en-US")
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        // continue if there is any error
        // stock values of genres in an array to be used later
        for(const genre of data.genres){
            this.genres.push(genre.name);
        }

      })
      .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
  }
};
</script>
<template>
  <div class="card text-center m-3">
    <h5 class="card-header">GET Request for genres with Error Handling</h5>
    <div class="card-body">Genres are: {{genres}}</div>
    <div class="card-body">Error message: {{errorMessage}}</div>
  </div>
</template>
<style scoped>
.card-body,.card-header{
  color :  #eeeeee;
}
</style>