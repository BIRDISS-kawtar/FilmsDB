<script>
import Paginate from 'vuejs-paginate-next'; // Pagination
export default {

  name: "get-top-rated-movies", // always put the name it's a good practice : https://forum.vuejs.org/t/why-we-need-to-name-vue-component/30909
  
  /*---------The data to use in the template and in other components---------*/
  data() {
    return {
        total_pages_topRated_movies: 0,
        total_results_topRated_movies:0,
        topRated_movies: null,
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
        let request_topRated = "https://api.themoviedb.org/3/movie/top_rated?api_key="+this.$store.getters.getApiKey+"&language=en-US&page="+numCurrentPage_toString;
        
        // GET request using fetch with error handling
        fetch(request_topRated)
        .then(async response => {
            const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead

            // check for error response
            if (!response.ok) {
            const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
            return Promise.reject(error);
            }
            // continue if there is any error
            this.topRated_movies = data.results;// stock values of fetched movies in a list of objects
            this.total_pages_topRated_movies = data.total_pages;
            this.total_results_topRated_movies = data.total_results;
            
            console.log(data);

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
<template>
<!------------------------------ TOP RATED MOVIES ----------------------------->
<div class="page-single">
<div class="container">
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <!---------------- Topbar Filter -------------------->
            <div class="topbar-filter fw">
                <p>Found <span> {{total_results_topRated_movies}} movies</span> in total</p>
                <label>Sort by:</label>
                <select>
                    <option value="popularity">Popularity Descending</option>
                    <option value="popularity">Popularity Ascending</option>
                    <option value="rating">Rating Descending</option>
                    <option value="rating">Rating Ascending</option>
                    <option value="date">Release date Descending</option>
                    <option value="date">Release date Ascending</option>
                </select>
                <a href="movielist.html" class="list"><i class="ion-ios-list-outline "></i></a>
                <a  href="moviegridfw.html" class="grid"><i class="ion-grid active"></i></a>
            </div>
            <!---------------- END : Topbar Filter -------------------->
            <!---------------- List of the fetched movies : Top Rated -------------------->
            <div class="flex-wrap-movielist mv-grid-fw">
                <!-- v-for directive for rendering based on an array --->
                    <template v-for="movie_topRated in topRated_movies" :key="movie_topRated.id">
                        <!-----------------Movie Card ---------------------->
                        <div class="movie-item-style-2 movie-item-style-1">
                            <img v-bind:src="'http://image.tmdb.org/t/p/w500' + movie_topRated.poster_path" alt="">
                            <div class="hvr-inner">
                                <a  href="moviesingle.html"> Read more <i class="ion-android-arrow-dropright"></i> </a>
                            </div>
                            <div class="mv-item-infor">
                                <h6><a>{{movie_topRated.original_title}}</a></h6>
                                <p class="rate"><i class="ion-android-star"></i><span>{{movie_topRated.vote_average}}</span> /10</p>
                            </div>
                        </div>
                        <!-----------------END : Movie Card ---------------------->
                    </template>					                    
            </div>	
            <!---------------- END : List of the fetched movies : Top Rated -------------------->	
            <!---------------- Pagination and Navigation Bottom Bar -------------------->
            <div class="topbar-filter">
                <label>Movies per page:</label>
                <select>
                    <option value="range">20 Movies</option>
                    <option value="saab">10 Movies</option>
                </select>

                <div class="pagination2">
                    <paginate
                        :page-count="total_pages_topRated_movies"
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