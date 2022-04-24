import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import {auth} from '@/main';

/*-------------ROUTER CONFIGURATION -------------*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Lazy loaded
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
      meta: {
        authRequired: false,
      },
    },
    {
      // Lazy loaded
      path: "/signup",
      name: "signup",
      component: () => import("@/views/auth/SignUpView.vue"),
      meta: {
        authRequired: false,
      },
    },
    {
      // Eager loaded
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        authRequired: false,
      },
    },
    {
      // Lazy loaded
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
      meta: {
        authRequired: true,
      },
    },
  ],
});

// We add the beforeEach function  to check the authentication for some pages
router.beforeEach((to, from, next) => {
  
  // authRequired is the condition = if the current visited page (record) requires authentication 
  const authRequired = to.matched.some((record) => record.meta.authRequired);
  if (authRequired) { 
    auth.onAuthStateChanged(function(user) { // To prevent the problem currentuser == null
      if (user) { 
        next();
      } else {
        //alert('You must be logged in to see this page');
        next({
            path: '/login',
        });
      }
    });
      
  } else {
    next();
  }
});

export default router;
