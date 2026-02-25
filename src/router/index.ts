import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PosterWallPage from '../views/PosterWallPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/wall',
  },
  {
    path: '/wall',
    component: PosterWallPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
