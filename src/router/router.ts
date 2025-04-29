import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "@/views/HomePage.vue"; // Make sure the path matches your project structure.
import DetailsPage from "@/views/DetailsPage.vue";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/", // Root path
    name: "Home",
    component: HomePage, // This should render your BreweryList
  },
  {
    path: "/brewery/:id", // Details URL for a specific brewery
    name: "Details",
    component: DetailsPage,
    props: true, // Send route params as props
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for undefined pages
    redirect: "/", // Redirect to the home page
  },
];

const router = createRouter({
  history: createWebHistory(), // Configure history mode for clean URLs
  routes,
});

export default router;
