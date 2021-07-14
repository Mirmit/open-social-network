import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../components/Home.vue'
import MyBeats from "../pages/MyBeats";
import MyWall from "../pages/MyWall";
import Discover from "../pages/Discover";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/myBeats',
    name: 'MyBeats',
    component: MyBeats
  },
  {
    path: '/myWall',
    name: 'MyWall',
    component: MyWall
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
