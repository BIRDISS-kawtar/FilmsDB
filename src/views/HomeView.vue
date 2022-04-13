<script>
// The content of the home view is splitted into components 
import GetGenres from "@/components/GetGenres.vue";
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
    <GetGenres/>
</div>
</template>
