<template>
<div v-if="movie" class="hero mv-single-hero" :style="'background: url(\'http://image.tmdb.org/t/p/w1280/' + movie.backdrop_path + '\') no-repeat;'">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
			</div>
		</div>
	</div>
</div>
<div v-else class="hero mv-single-hero" style="background: url('src/assets/images/uploads/hero-bg.jpg') no-repeat;">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
			</div>
		</div>
	</div>
</div>
<div v-if="movie" class="page-single movie-single movie_single">
	<div class="container">
		<div class="row ipad-width2">
			<div class="col-md-4 col-sm-12 col-xs-12">
				<div class="movie-img sticky-sb">
					<div v-if="movie"><img :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path" alt=""></div>
					<div v-else> <img src="" alt=""></div>
					<div class="movie-btn">	
						
					</div>
				</div>
			</div>
			<div class="col-md-8 col-sm-12 col-xs-12">
				<div class="movie-single-ct main-content">
					<h1 class="bd-hd">{{movie.title}}<span>&nbsp;&nbsp;{{movie.release_date.slice(0,4)}}</span></h1>
					<div class="movie-rate">
						<div class="rate">
							<i class="ion-android-star"></i>
							<p><span>{{movie.vote_average}}</span> /10<br>
								<span class="rv">{{movie.vote_count}} Ratings</span>
							</p>
						</div>
					</div>
					<div class="social-btn">
						<div class="hover-bnt">
							<a href="#" class="parent-btn"><i class="ion-heart"></i> Add to Favorits</a>
						</div>		
					</div>
					<div class="movie-tabs">
						<div class="tabs">
							<ul class="tab-links tabs-mv">
								<li :class="selection == '#overview' ? 'active' : ''"><a href="#overview" @click="tabsNavigation">Overview</a></li>
								<li :class="selection == '#reviews' ? 'active' : ''"><a href="#reviews" @click="tabsNavigation"> Reviews</a></li>
								<li :class="selection == '#cast' ? 'active' : ''"><a href="#cast" @click="tabsNavigation">  Cast & Crew </a></li>                       
							</ul>
						    <div class="tab-content">
						        <div id="overview" class="tab active">
						            <div class="row">
						            	<div class="col-md-8 col-sm-12 col-xs-12">
						            		<p>{{movie.overview}}</p>
						            		<!-- <div class="title-hd-sm">
												<h4>Videos & Photos</h4>
												<a href="#" class="time">All 5 Videos & 245 Photos <i class="ion-ios-arrow-right"></i></a>
											</div>
											<div class="mvsingle-item ov-item">
												<a class="img-lightbox"  data-fancybox-group="gallery" href="../assets/images/uploads/image11.jpg" ><img src="../assets/images/uploads/image1.jpg" alt=""></a>
												<a class="img-lightbox"  data-fancybox-group="gallery" href="../assets/images/uploads/image21.jpg" ><img src="../assets/images/uploads/image2.jpg" alt=""></a>
												<a class="img-lightbox"  data-fancybox-group="gallery" href="../assets/images/uploads/image31.jpg" ><img src="../assets/images/uploads/image3.jpg" alt=""></a>
												<div class="vd-it">
													<img class="vd-img" src="../assets/images/uploads/image4.jpg" alt="">
													<a class="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="../assets/images/uploads/play-vd.png" alt=""></a>
												</div>
											</div> -->
											<div class="title-hd-sm">
												<h4>cast</h4>
												<a href="#cast" @click="tabsNavigation" class="time">Full Cast & Crew  <i class="ion-ios-arrow-right"></i></a>
											</div>
											<!-- movie cast -->
											<div v-if="cast && cast.length > 6" class="mvcast-item">
												<template v-for="actor in cast.slice(0,6)" :key="actor.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w45' + actor.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{actor.name}}</a>
														</div>
														<p>{{actor.character}}</p>
													</div>
												</template>												
											</div>
											<div v-else-if="cast" class="mvcast-item">
												<template v-for="actor in cast" :key="actor.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w45' + actor.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{actor.name}}</a>
														</div>
														<p>{{actor.character}}</p>
													</div>
												</template>
											</div>
											<div class="title-hd-sm">
												<h4>User reviews</h4>
												<a href="#reviews" @click="tabsNavigation" class="time">See All {{total_reviews}} Reviews <i class="ion-ios-arrow-right"></i></a>
											</div>
											<!-- movie user review -->
											<!-- <template v-for="review in reviews" :key="review.id"> -->
												<div class="mv-user-review-item">
													<div v-if="total_reviews != 0">
														<p class="time">
															{{new Date(reviews[0].created_at).toDateString()}}&nbsp;&nbsp;by&nbsp;&nbsp;<a href="#"> {{reviews[0].author_details.username}}</a>
														</p>
														<p>{{reviews[0].content.split(' ').slice(0,51).join(' ').concat(" [...]")}}</p>
													</div>
													<div v-else>
													</div>
												</div>
											<!-- </template> -->
						            	</div>
						            	<div class="col-md-4 col-xs-12 col-sm-12">
						            		<div class="sb-it">
						            			<h6>Director: </h6>
												<p>
													<template v-for="director in directors" :key="director.id">
														<a href="#">{{director.name}}&nbsp;&nbsp;</a>
													</template>
												</p>
						            		</div>
						            		<div class="sb-it">
						            			<h6>Writer: </h6>
						            			<p>
													<template v-for="writer in writers" :key="writer.id">
														<a href="#">{{writer.name}}&nbsp;&nbsp;</a>
													</template>
												</p>
						            		</div>
						            		<div class="sb-it">
						            			<h6>Genres: </h6>
						            			<p>
													<template v-for="genre in movie.genres" :key="genre.id">
														<a href="#">{{genre.name}}&nbsp;</a>
													</template>
												</p>
						            		</div>
						            		<div class="sb-it">
						            			<h6>Release Date:</h6>
						            			<p>{{movie.release_date}}</p>
						            		</div>
						            		<div class="sb-it">
						            			<h6>Run Time:</h6>
						            			<p>{{movie.runtime}} min</p>
						            		</div>
						            	</div>
						            </div>
						        </div>
						        <div id="reviews" class="tab review">
						           <div class="row">
						            	<div class="rv-hd">
						            		<div class="div">
							            		<h3>Reviews of</h3>
						       	 				<h2>{{movie.title}}</h2>
							            	</div>
						            	</div>
						            	<div class="topbar-filter">
											<p>Found <span>{{total_reviews}} reviews</span> in total</p>
										</div>
										<div v-if="reviews && reviews.length != 0">
											<template v-for="review in reviews" :key="review.id">
												<div class="mv-user-review-item">
													<div class="user-infor">
														<div>
															<p class="time">
																{{new Date(review.created_at).toDateString()}} by <a href="#"> {{review.author}}</a>
															</p>
														</div>
													</div>
													<p>{{review.content}}</p>
												</div>
											</template>
										</div>
										<div class="topbar-filter">
											<div class="pagination2">
												<paginate
													:page-count="total_pages"
													:click-handler="fetchReviewsPage"
												>
												</paginate>
											</div>
										</div>
						            </div>
						        </div>
						        <div id="cast" class="tab">
						        	<div class="row">
						            	<h3>Cast & Crew of</h3>
					       	 			<h2>{{movie.title}}</h2>
										<div class="title-hd-sm">
											<h4>Cast</h4>
										</div>
										<div v-if="cast && cast.length > 10" class="mvcast-item">											
											<template v-for="actor in cast.slice(0,10)" :key="actor.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w45' + actor.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{actor.name}}</a>
														</div>
														<p>{{actor.character}}</p>
													</div>
											</template>
										</div>
										<div v-else-if="cast" class="mvcast-item">
											<template v-for="actor in cast" :key="actor.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w45' + actor.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{actor.name}}</a>
														</div>
														<p>{{actor.character}}</p>
													</div>
											</template>
										</div>
										<!-- //== -->
										<div class="title-hd-sm">
											<h4>Crew</h4>
										</div>
										<div class="mvcast-item">											
											<div v-if="crew && crew.length > 10" class="mvcast-item">											
											<template v-for="person in crew.slice(0,10)" :key="person.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="person.profile_path" :src="'https://image.tmdb.org/t/p/w45' + person.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{person.name}}</a>
														</div>
														<p>{{person.job}}</p>
													</div>
											</template>
										</div>
										<div v-else-if="crew" class="mvcast-item">
											<template v-for="person in cast" :key="person.id">											
													<div class="cast-it">
														<div class="cast-left">
															<img v-if="person.profile_path" :src="'https://image.tmdb.org/t/p/w45' + person.profile_path" alt="">
															<img v-else src="../assets/images/uploads/profile-unknown.jpg" alt="">
															<a href="#">{{person.name}}</a>
														</div>
														<p>{{person.job}}</p>
													</div>
											</template>
										</div>
										</div>
						            </div>
					       	 	</div>
					       	</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Paginate from 'vuejs-paginate-next'; // Pagination

export default {
	name: "movie_details",
	data() {
		return {
			movie: null,
			movie_id: this.$route.query.movie_id,
			reviews: null,
			total_reviews: 0,
			total_pages: 0,
			cast: null,
			crew: null,
			directors: [],
			writers: [],
			errorMessage: "",
			selection: "#overview"
		}
	},
	created(){
		this.fetchMovieDetails();
	},

	components: {
        paginate: Paginate,
    },
	methods: {
		fetchMovieDetails(){
			console.log("fetching ...");
			let movie_overview_url = `https://api.themoviedb.org/3/movie/${this.movie_id}?api_key=${this.$store.getters.getApiKey}`;
			let movie_reviews_url = `https://api.themoviedb.org/3/movie/${this.movie_id}/reviews?api_key=${this.$store.getters.getApiKey}`;
			let movie_credits_url =  `https://api.themoviedb.org/3/movie/${this.movie_id}/credits?api_key=${this.$store.getters.getApiKey}`; //crew and cast
			let directors = [];
			let writers = [];

			fetch(movie_overview_url)
			.then(async response => {
				const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
				console.log(data)
				// check for error response
				if (!response.ok) {
					const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
					return Promise.reject(error);
				}
				// continue if there are no errors
				this.movie = data;
			})
			.catch(error => {
                this.errorMessage = error;
                console.error("Error while retrieving movie details", error);
            });

			fetch(movie_reviews_url)
			.then(async response => {
				const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
				console.log(data)
				// check for error response
				if (!response.ok) {
					const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
					return Promise.reject(error);
				}
				// continue if there are no errors
				this.reviews = data.results;
				this.total_reviews = data.total_results;
				this.total_pages = data.total_pages;
			})
			.catch(error => {
                this.errorMessage = error;
                console.error("Error while retrieving movie reviews", error);
            });

			fetch(movie_credits_url)
			.then(async response => {
				const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
				console.log(data)
				// check for error response
				if (!response.ok) {
					const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
					return Promise.reject(error);
				}

				data.crew.forEach(function(entry){
					if (entry.job === 'Director') {
						directors.push(entry);
					}
					else if (entry.job === 'Writer') {
						writers.push(entry);
					}
				})
				this.cast = data.cast;
				this.crew = data.crew;
				this.directors = directors;
				this.writers = writers;
			})
			.catch(error => {
                this.errorMessage = error;
                console.error("Error while retrieving movie credits", error);
            });

		},

		fetchReviewsPage(pageNum){
			let movie_reviews_url = `https://api.themoviedb.org/3/movie/${this.movie_id}/reviews?api_key=${this.$store.getters.getApiKey}&page=${pageNum}`;

			fetch(movie_reviews_url)
			.then(async response => {
				const data = await response.json(); // NB : response.json() parse the response as a json file but return a javascript object instead
				console.log(data)
				// check for error response
				if (!response.ok) {
					const error = (data && data.message) || response.statusText;// get error message from body or default to response statusText
					return Promise.reject(error);
				}
				// continue if there are no errors
				this.reviews = data.results;
				this.total_reviews = data.total_results;
			})
			.catch(error => {
                this.errorMessage = error;
                console.error("Error while retrieving movie reviews", error);
            });
		},

		tabsNavigation(event) {
			
			//let multiItem = $('.slick-multiItem');
			//let multiItem2 = $('.slick-multiItem2');
			//let currentAttrValue = $(this).attr('href');
			let currentAttrValue = event.target.getAttribute('href');
			this.selection = currentAttrValue;
			console.log(currentAttrValue);
			let tabsCurrent = $('.tabs ' + currentAttrValue);
			// Show/Hide Tabs
			tabsCurrent.show().siblings().hide();
			// Change/remove current tab to active
			//event.target.parentElement.addClass('active').siblings().removeClass('active');
			event.preventDefault();
			//reset position for tabs
			//multiItem.slick('setPosition');
			//multiItem2.slick('setPosition');
		}
	}
};
</script>
