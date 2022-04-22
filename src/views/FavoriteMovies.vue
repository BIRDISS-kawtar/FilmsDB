<script>
export default {
  name: "favorite-movies", 
};
</script>

<template>
<!---------------- Topbar Filter -------------------->
<div class="topbar-filter user">
    <p>Found <span>1,608 movies</span> in total</p>
    <label>Sort by:</label>
    <select>
        <option value="range">-- Choose option --</option>
        <option value="saab">-- Choose option 2--</option>
    </select>
</div>
<!---------------- END : Topbar Filter -------------------->
<!---------------- List of the fetched movies : Trending -------------------->
<div class="flex-wrap-movielist grid-fav">
        <div class="movie-item-style-2 movie-item-style-1 style-3">
            <img src="images/uploads/mv1.jpg" alt="">
            <div class="hvr-inner">
                <a  href="moviesingle.html"> Read more <i class="ion-android-arrow-dropright"></i> </a>
            </div>
            <div class="mv-item-infor">
                <h6><a href="moviesingle.html">oblivion</a></h6>
                <p class="rate"><i class="ion-android-star"></i><span>8.1</span> /10</p>
            </div>
        </div>					
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
        <span>Page 1 of 2:</span>
        <a class="active" href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">...</a>
        <a href="#">78</a>
        <a href="#">79</a>
        <a href="#"><i class="ion-arrow-right-b"></i></a>
    </div>
</div>
<!---------------- END : Pagination and Navigation Bottom Bar -------------------->	
</template>
