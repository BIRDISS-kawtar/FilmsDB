<template>
  <!----------- Navbar ----------->
  <appNavbar></appNavbar>
  <!----------- Content ----------->
  <RouterView />
  <!-----------Footer----------->
  <appFooter></appFooter>
</template>

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

<style>
@import "./assets/css/style.css";
</style>
