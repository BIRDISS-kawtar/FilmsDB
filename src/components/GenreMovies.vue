<script>
// Each imported child component must be registred inside the parent component
export default {
  name: "movies-by-genre",
};
</script>
<template>
<div class="page-single movie_list">
	<div class="container">
		<div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <!---------------- Topbar Filter -------------------->
				<div class="topbar-filter">
					<p>Found <span>1,608 movies</span> in total</p>
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
                <!---------------- List of the fetched movies : By Genre -------------------->
				<div class="movie-item-style-2">
					<img src="images/uploads/mv1.jpg" alt="">
					<div class="mv-item-infor">
						<h6><a href="moviesingle.html">oblivion <span>(2012)</span></a></h6>
						<p class="rate"><i class="ion-android-star"></i><span>8.1</span> /10</p>
						<p class="describe">Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity...</p>
						<p class="run-time"> Run Time: 2h21’    .     <span>MMPA: PG-13 </span>    .     <span>Release: 1 May 2015</span></p>
						<p>Director: <a href="#">Joss Whedon</a></p>
						<p>Stars: <a href="#">Robert Downey Jr.,</a> <a href="#">Chris Evans,</a> <a href="#">  Chris Hemsworth</a></p>
					</div>
				</div>
				<!---------------- END : List of the fetched movies : By Genre -------------------->
                <!---------------- Pagination and Navigation Bottom Bar -------------------->
				<div class="topbar-filter">
					<label>Movies per page:</label>
					<select>
						<option value="range">5 Movies</option>
						<option value="saab">10 Movies</option>
					</select>
					<div class="pagination2">
						<span>Page 1 of 2:</span>
						<a class="active" href="#">1</a>
						<a href="#">2</a>
						<a href="#"><i class="ion-arrow-right-b"></i></a>
					</div>
				</div>
                <!---------------- END : Pagination and Navigation Bottom Bar -------------------->
			</div>
		</div>
	</div>
</div>
</template>