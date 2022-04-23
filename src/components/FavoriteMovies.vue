<template>
    <h1>Hi</h1>
    <h1 v-for="movie in this.$store.getters.getMessage.favoriteMoviesList" :key="movie">{{movie.original_title}}</h1>
    <h1>Bye</h1>
</template>