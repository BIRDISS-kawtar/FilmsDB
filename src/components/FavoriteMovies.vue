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
            <div class="hvr-inner">
                <div class="ion-android-arrow-dropright"><RouterLink :to="{ path:'/moviedetails', query: { movie_id: movie.id }}"> Read more </RouterLink></div>
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
            total_pages_favorite_movies: 0,
            total_results_favorite_movies: 0,
            favorite_movies: null,
            errorMessage: null,
            start_slice : 0,
            end_slice : 0,
        };
        
    },
    components: {
        paginate: Paginate,
    },
    methods: {
        // Fetch from the result of firestore the content of page by dividing by 20 movie per page
        getPageResults (pageNum){
            if(toRaw(this.$store.getters.getMessage.favoriteMoviesList)){
                 // slicing the list of favorite movies depending of the PageNum
                let numCurrentPage = 1;
                if((typeof pageNum) == 'number'){
                    numCurrentPage = pageNum;
                }
                this.start_slice = (numCurrentPage-1)*20;// Included
                this.end_slice = (20*numCurrentPage);// Not Included
                if(this.end_slice > this.total_results_favorite_movies){// if the results of a page a less than 20
                    this.end_slice = this.total_results_favorite_movies; 
                }
                console.log("min = ",this.start_slice," and max = ",this.end_slice," and total_results = ",this.total_results_favorite_movies); 
                if(this.end_slice != this.start_slice){
                    console.log("case not equal ");
                    this.favorite_movies = (Object.values(toRaw(this.$store.getters.getMessage.favoriteMoviesList).list)).slice(this.start_slice,this.end_slice); 
                }
                else{
                    this.favorite_movies = (Object.values(toRaw(this.$store.getters.getMessage.favoriteMoviesList).list)).slice(this.start_slice); 
                    console.log("case equal");
                }
            }else{
                console.log("No Favorite Movies !");
            } 
        },
    },
    //lifecycle
    mounted(){
        if(toRaw(this.$store.getters.getMessage.favoriteMoviesList)){
            this.total_pages_favorite_movies = toRaw(this.$store.getters.getMessage.favoriteMoviesList).total_pages;
            this.total_results_favorite_movies = toRaw(this.$store.getters.getMessage.favoriteMoviesList).total_results
        }
        this.getPageResults();
        
    }
};
</script>