import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetails from "../views/MovieDetails.vue";
import { getAuth } from "firebase/auth";

/*-------------ROUTER CONFIGURATION -------------*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Lazy loaded
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      // Lazy loaded
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      // Eager loaded
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      // Eager loaded
      path: "/moviedetails",
      name: "movie_details",
      component: MovieDetails
    },
    {
      // Lazy loaded
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
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
  // Returns the FirebaseAuth object for an App which is the gateway to the Firebase Authentication 
  const auth = getAuth();

  if (authRequired) { 
      if (auth.currentUser) { 
          next();
      } else {
          alert('You must be logged in to see this page');
          next({
              path: '/login',
          });
      }
  } else {
      next();
  }
});

export default router;
