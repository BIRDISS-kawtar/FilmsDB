<script>
// The content of the home view is splitted into components 
import genres from "@/components/GetGenres.vue";
// Each imported child component must be registred inside the parent component
export default {
  name: "home",
  components: {
   GetGenres
  }
};
</script>

<template>
<div>
    <h1>Welcome to the home page!</h1>
    <p>genres</p>
</div>
</template>
