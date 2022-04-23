<template>
    <h1 v-for="movie in this.$store.getters.getMessage" :key="movie">{{movie.original_title}}</h1>
</template>