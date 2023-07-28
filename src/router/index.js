import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import HomePageUltraClean from '../views/HomePageUltraClean.vue';
import HomePageMap from '../views/HomePageMap.vue';
import HomePageBigMap from '../views/HomePageBigMap.vue';
import AboutPage from '../views/AboutPage.vue';
import ContactPage from '../views/ContactPage.vue';
import HouseExplorer from '../views/HouseExplorer.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/home_map',
        name: 'HomeMap',
        component: HomePageMap
    },
    {
        path: '/home_big_map',
        name: 'HomeBigMap',
        component: HomePageBigMap
    },
    {
        path: '/home_ultra_clean',
        name: 'HomeUltraClean',
        component: HomePageUltraClean
    },
    {
        path: '/about',
        name: 'Sobre',
        component: AboutPage
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage
    },
    {
            path: '/house_explorer/:id',
            name: 'HouseExplorer',
            component: HouseExplorer
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
