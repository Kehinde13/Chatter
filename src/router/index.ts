import { createRouter, createWebHistory } from "vue-router";
import LandingPageVue from "../Layouts/LandingPage.vue";
import ErrorPageVue from "../Pages/ErrorPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/",
            name: "LandingPageVue",
            component: LandingPageVue,
        },
        {
           path: "/:pathMatch(.*)*", 
           name: "not-found", 
           component: ErrorPageVue ,
        }
    ]
})

export default router;