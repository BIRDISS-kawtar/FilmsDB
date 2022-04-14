<script>
import { RouterLink, RouterView } from "vue-router";
import appNavbar from "@/components/appNavbar.vue";
import appFooter from "@/components/appFooter.vue"
export default{
  components: {
     'appNavbar': appNavbar,
     'appFooter': appFooter
  },
};
</script>

<template>
  <!----------- Navbar ----------->
  <appNavbar></appNavbar>
  <!----------- Content ----------->
  <RouterView />
  <!-----------Footer----------->
  <appFooter></appFooter>
</template>

<style>
@import "/public/css/style.css";

</style>
