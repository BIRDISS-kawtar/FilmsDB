<template>
<!------------------------------ MOVIES ----------------------------->
<div class="page-single">
<div class="container">
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <!---------------- Topbar Filter -------------------->
            <div class="topbar-filter fw">
                <p>Found <span> {{total_results_movies}} movies</span> in total</p>
            </div>
            <!---------------- END : Topbar Filter -------------------->
            <!---------------- List of the fetched movies : Trending -------------------->
            <div class="flex-wrap-movielist mv-grid-fw">
                <!-- v-for directive for rendering based on an array --->
                    <template v-for="movie in this.movies" :key="movie.id">
                        <!-----------------Movie Card ---------------------->
                        <div class="movie-item-style-2 movie-item-style-1">
                            <img v-if="movie.poster_path" v-bind:src="`http://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
                            <img v-else v-bind:src="'src/assets/images/uploads/unfound_poster2.jpg'" alt="">
                            <div class="hvr-inner">
                                <div class="ion-android-arrow-dropright"><RouterLink :to="{ path:'/moviedetails', query: { movie_id: movie.id }}"> Read more </RouterLink></div>
                            </div>
                            <div class="mv-item-infor">
                                <h6 v-if="movie.title"><a>{{movie.title}}</a></h6>
                                <h6 v-else><a>{{movie.original_title}}</a></h6>
                                <p class="rate"><i class="ion-android-star"></i><span>{{movie.vote_average}}</span> /10</p>
                            </div>
                        </div>
                        <!-----------------END : Movie Card ---------------------->
                    </template>					                    
            </div>	
            <!---------------- END : List of the fetched movies : Trending -------------------->	
            <!---------------- Pagination and Navigation Bottom Bar -------------------->
            <div class="topbar-filter">
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
import { isProxy, toRaw } from '@vue/reactivity';
import Paginate from 'vuejs-paginate-next'; // Pagination

export default {
    name: "get-movies", // always put the name it's a good practice : https://forum.vuejs.org/t/why-we-need-to-name-vue-component/30909

    /*---------The data to use in the template and in other components---------*/
    data() {
        return {
            movie_criteria: {
                "type": "trending"
            },
            search_value: "",
            movies: [],
            total_pages_movies: 0,
            total_results_movies:0
        };
    },

    components: {
        paginate: Paginate,
    },

    //lifecycle
    mounted() {  
        this.fetchPage();
    },

    methods: {
        // Fetch from api depending on the selected movie movie_criteria and the page number
        fetchPage(pageNum) {
            
            let url = "";

            if (!pageNum) {
                pageNum = 1;
            }

            switch (this.movie_criteria.type) {
                case 'trending':
                    url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.$store.getters.getApiKey}&page=${pageNum}`;
                    break;
                case 'top_rated':
                    url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.$store.getters.getApiKey}&page=${pageNum}`;
                    break;
                case 'genre':
                    url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.$store.getters.getApiKey}&with_genres=${this.movie_criteria.genre_id}&page=${pageNum}`;
                    break;
                case 'searched':
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${this.$store.getters.getApiKey}&query=${this.movie_criteria.search_value}&page=${pageNum}`;
                    break;
            }
            
            fetch(url)
            .then(async response => {
                const data = await response.json();
                this.movies = data.results;
                this.total_pages_movies = data.total_pages;
                this.total_results_movies = data.total_results;
            })
            .catch(error => {
                console.error(error);
            });
        },
    },

    watch: {
		'$store.state': {
			handler(newValue) {
                if (isProxy(newValue)) {
                    
                    const message = toRaw(newValue).message;
                    
                    if ("movie_criteria" in message) {
                        
                        const movie_criteria_new_value = toRaw(newValue).message["movie_criteria"];
                        this.movie_criteria = movie_criteria_new_value;
                        this.$store.commit('deleteMessage', "movie_criteria"); //deleting the key from message will trigger again the watcher
                        this.fetchPage();
                    } 
                }
			},
			deep: true
		},
		
	}
    
};
</script>