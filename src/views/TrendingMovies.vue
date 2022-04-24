<template>
<!------------------------------ TRENDING MOVIES ----------------------------->
<div class="page-single">
<div class="container">
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <!---------------- Topbar Filter -------------------->
            <div class="topbar-filter fw">
                <p>Found <span> {{total_results_trending_movies}} movies</span> in total</p>
                <label>Sort by:</label>
                <select>
                    <option value="popularity">Popularity Descending</option>
                    <option value="popularity">Popularity Ascending</option>
                    <option value="rating">Rating Descending</option>
                    <option value="rating">Rating Ascending</option>
                    <option value="date">Release date Descending</option>
                    <option value="date">Release date Ascending</option>
                </select>
            </div>
            <!---------------- END : Topbar Filter -------------------->
            <!---------------- List of the fetched movies : Trending -------------------->
            <div class="flex-wrap-movielist mv-grid-fw">
                <!-- v-for directive for rendering based on an array --->
                    <template v-for="movie_trending in trending_movies" :key="movie_trending.id">
                        <!-----------------Movie Card ---------------------->
                        <div v-if="movie_trending.media_type == 'movie'" class="movie-item-style-2 movie-item-style-1">
                            <img v-bind:src="'http://image.tmdb.org/t/p/w500' + movie_trending.poster_path" alt="">
                            <div class="hvr-inner">
                                <a  href="moviesingle.html"> Read more <i class="ion-android-arrow-dropright"></i> </a>
                            </div>
                            <div class="mv-item-infor">
                                <h6 v-if="movie_trending.original_title"><a>{{movie_trending.original_title}}</a></h6>
                                <h6 v-else><a>{{movie.name}}</a></h6>
                                <p class="rate"><i class="ion-android-star"></i><span>{{movie_trending.vote_average}}</span> /10</p>
                            </div>
                        </div>
                        <!-----------------END : Movie Card ---------------------->
                    </template>					                    
            </div>	
            <!---------------- END : List of the fetched movies : Trending -------------------->	
            <!---------------- Pagination and Navigation Bottom Bar -------------------->
            <div class="topbar-filter">
                <label>Movies per page:</label>
                <select>
                    <option value="range">20 Movies</option>
                    <option value="saab">10 Movies</option>
                </select>

                <div class="pagination2">
                    <paginate
                        :page-count="total_pages_trending_movies"
                        :click-handler="fetchPage"
                    >
                    </paginate>
                </div>
            </div>
            <!---------------- END : Pagination and Navigation Bottom Bar -------------------->
        </div>
    </div>
</div>
</div>
</template>

<script>
import Paginate from 'vuejs-paginate-next'; // Pagination
export default {

  name: "get-trending-movies", // always put the name it's a good practice : https://forum.vuejs.org/t/why-we-need-to-name-vue-component/30909
  
  /*---------The data to use in the template and in other components---------*/
  data() {
    return {
        total_pages_trending_movies: 0,
        total_results_trending_movies:0,
        trending_movies: null,
        errorMessage: null
    };
    },
  components: {
        paginate: Paginate,
    },
  methods: {
      // Fetch from api in function of the PageNum in
      fetchPage (pageNum){

        // Creating the request in function o the selected page in pagination
        var numCurrentPage = 1;
        if((typeof pageNum) == 'number'){
            numCurrentPage = pageNum;
        }
        let numCurrentPage_toString = numCurrentPage.toString() ;
        let request_trending = "https://api.themoviedb.org/3/trending/all/day?api_key="+this.$store.getters.getApiKey+"&page="+numCurrentPage_toString;
        
        // GET request using fetch with error handling
        fetch(request_trending)
        .then(async response => {
            const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead

            // check for error response
            if (!response.ok) {
            const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
            return Promise.reject(error);
            }
            // continue if there is any error
            this.trending_movies = data.results;// stock values of fetched movies in a list of objects
            this.total_pages_trending_movies = data.total_pages;
            this.total_results_trending_movies = data.total_results;
            
            

        })
        .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
        });
      },
  },
  mounted(){
      this.fetchPage();
  }
};
</script>