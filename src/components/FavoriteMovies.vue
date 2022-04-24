<template>
    <!---------------- Topbar Filter -------------------->
    <div class="topbar-filter user">
        <p>Found <span>{{total_results_favorite_movies}} movies</span> in total</p>
    </div>
    <!---------------- END : Topbar Filter -------------------->
    <!---------------- List of the fetched movies : Favorite Movies -------------------->
    <div class="flex-wrap-movielist grid-fav">		
        <template v-for="movie in favorite_movies" :key="movie.id">	
        <!-----------------Movie Card ---------------------->
        <div class="movie-item-style-2 movie-item-style-1 style-3">
            <img v-if="movie.poster_path" v-bind:src="`http://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
            <img v-else v-bind:src="'src/assets/images/uploads/unfound_poster.jpg'" alt="">
            <!-- <div class="hvr-inner">
                <a  href="moviesingle.html"> Read more <i class="ion-android-arrow-dropright"></i> </a>
            </div> -->
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
    <!---------------- END : List of the fetched movies : Favorite Movies -------------------->	
    <!---------------- Pagination and Navigation Bottom Bar -------------------->	
    <div class="topbar-filter">
        <div class="pagination2">
            <paginate
                :page-count="total_pages_favorite_movies"
                :click-handler="getPageResults"
            >
            </paginate>
        </div>
    </div>
    <!---------------- END : Pagination and Navigation Bottom Bar -------------------->
</template>

<script>
import Paginate from 'vuejs-paginate-next'; // Pagination
import { toRaw } from 'vue';
export default {
    name: "favorite-movies", // always put the name it's a good practice : https://forum.vuejs.org/t/why-we-need-to-name-vue-component/30909

    /*---------The data to use in the template and in other components---------*/
    data() {
        return {
            total_pages_favorite_movies: toRaw(this.$store.getters.getMessage.favoriteMoviesList).total_pages,
            total_results_favorite_movies: toRaw(this.$store.getters.getMessage.favoriteMoviesList).total_results,
            favorite_movies: null,
            errorMessage: null
        };
    },
    components: {
        paginate: Paginate,
    },
    methods: {
        // Fetch from the result of firestore the content of page by dividing by 20 movie per page
        getPageResults (pageNum){
            // slicing the list of favorite movies depending of the PageNum
            let numCurrentPage = 1;
            if((typeof pageNum) == 'number'){
                numCurrentPage = pageNum;
            }
            const start = (numCurrentPage-1)*20;// Included
            const end = (20*numCurrentPage);// Not Included
            if(end > this.total_results_favorite_movies){// if the results of a page a less than 20
                end = this.total_results_favorite_movies - 1; 
            }
            console.log("min = ",start," and max = ",end," and total_results = ",this.total_results_favorite_movies); 
            if(end != start){
                console.log("case not equal ");
                this.favorite_movies = (Object.values(toRaw(this.$store.getters.getMessage.favoriteMoviesList).list)).slice(start,end); 
            }
            else{
                this.favorite_movies = (Object.values(toRaw(this.$store.getters.getMessage.favoriteMoviesList).list)).slice(start); 
                console.log("case equal");
            }
              
        },
    },
    //lifecycle
    mounted(){
        this.getPageResults();
    }
};
</script>