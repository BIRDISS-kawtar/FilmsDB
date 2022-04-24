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

  //lifecycle hooks
  mounted(){
    this.addExternalScripts();
  },
  components: {
     'appNavbar': appNavbar,
     'appFooter': appFooter
  },
  methods: {
    addExternalScripts(){
      let jQuery = document.createElement('script');
      jQuery.setAttribute('src', 'src/assets/js/jquery.js');
      document.head.appendChild(jQuery);

      let plugins = document.createElement('script');
      plugins.setAttribute('src', 'src/assets/js/plugins.js');
      document.head.appendChild(plugins);

      let plugins2 = document.createElement('script');
      plugins2.setAttribute('src', 'src/assets/js/plugins2.js');
      document.head.appendChild(plugins2);

      let custom = document.createElement('script');
      custom.setAttribute('src', 'src/assets/js/custom.js');
      document.head.appendChild(custom);
    },
  }
};
</script>

<style>
@import "./assets/css/plugins.css";
@import "./assets/css/style.css";
</style>
