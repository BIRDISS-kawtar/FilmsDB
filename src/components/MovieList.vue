<template>
<!------------------------------ MOVIES ----------------------------->
<div class="page-single">
<div class="container">
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <!---------------- Topbar Filter -------------------->
            <div class="topbar-filter fw">
                <p>Found <span> {{total_results_movies}} movies</span> in total</p>
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
                    <template v-for="movie in movies" :key="movie.id">
                        <!-----------------Movie Card ---------------------->
                        <div class="movie-item-style-2 movie-item-style-1">
                            <img v-bind:src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
                            <div class="hvr-inner">
                                <a  href="moviesingle.html"> Read more <i class="ion-android-arrow-dropright"></i> </a>
                            </div>
                            <div class="mv-item-infor">
                                <h6 v-if="movie.title"><a>{{movie.title}}</a></h6>
                                <h6 v-else-if="movie.original_title"><a>{{movie.original_title}}</a></h6>
                                <h6 v-else><a>{{movie.name}}</a></h6>
                                <p class="rate"><i class="ion-android-star"></i><span>{{movie.vote_average}}</span> /10</p>
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
                        :page-count="total_pages_movies"
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

let movie_criteria = {
    type: "genre",
    genre_id: 28
}


export default {
    name: "get-movies", // always put the name it's a good practice : https://forum.vuejs.org/t/why-we-need-to-name-vue-component/30909

    /*---------The data to use in the template and in other components---------*/
    data() {
        return {
            criteria: movie_criteria,
            total_pages_movies: 0,
            total_results_movies:0,
            movies: null,
            errorMessage: null
        };
    },
    components: {
        paginate: Paginate,
    },
    methods: {
        // Fetch from api depending on the selected movie criteria and the page number
        fetchPage (pageNum){
            // Creating the request depending on the selected page in pagination
            var numCurrentPage = 1;
            if((typeof pageNum) == 'number'){
                numCurrentPage = pageNum;
            }
            let movie_display_criteria = this.criteria;
            if(movie_display_criteria == null){
                movie_display_criteria = {
                    type: "trending",
                    genre_id: null
                }
            }
            let numCurrentPage_toString = numCurrentPage.toString() ;
            let url = "";
            switch (movie_display_criteria.type){
                case 'top_rated':
                    this.choice = "Top Rated Movies";
                    console.log("displaying top rated movies");
                    url = "https://api.themoviedb.org/3/movie/top_rated?api_key="+this.$store.getters.getApiKey+"&page="+numCurrentPage_toString;
                    break;
                case 'genre':
                    this.choice = "";
                    console.log(`displaying movies with genre id ${movie_display_criteria.genre_id}`);
                    url = "https://api.themoviedb.org/3/discover/movie?api_key="+this.$store.getters.getApiKey+"&with_genres="+movie_display_criteria.genre_id+"&page="+numCurrentPage_toString;
                    break;
                case 'trending':
                    this.choice = "Trending Movies";
                    console.log("displaying trending movies");
                    url = "https://api.themoviedb.org/3/trending/movie/day?api_key="+this.$store.getters.getApiKey+"&page="+numCurrentPage_toString;
            }
            // trending url : "https://api.themoviedb.org/3/trending/movie/day?api_key="+this.$store.getters.getApiKey+"&page="+numCurrentPage_toString;
            // genre url : https://api.themoviedb.org/3/discover/movie?api_key=18f0e56333fe7988fb15f351af41f492&with_genres=28&page=500
            // top rated url : https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
            
            // GET request using fetch with error handling
            fetch(url)
            .then(async response => {
                const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
                console.log(data)

                // check for error response
                if (!response.ok) {
                const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
                return Promise.reject(error);
                }
                // continue if there are no errors
                //this.criteria = movie_display_criteria;
                this.movies = data.results;// stock values of fetched movies in a list of objects
                this.total_pages_movies = data.total_pages;
                this.total_results_movies = data.total_results;
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("Error while retrieving movies", error);
            });
        },
    },
    //lifecycle
    mounted(){
        this.fetchPage();
    }
};
</script>