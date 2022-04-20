<script>
import { RouterLink, RouterView } from "vue-router";
import appNavbar from "@/components/appNavbar.vue";
import appFooter from "@/components/appFooter.vue"
import createStore from '@/store/index.js'
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
@import "./assets/css/style.css";
</style>
