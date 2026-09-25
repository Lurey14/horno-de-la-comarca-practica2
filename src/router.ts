import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from './pages/DashboardPage.vue'
import AtlasPage from './pages/AtlasPage.vue'
import LibraryPage from './pages/LibraryPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: DashboardPage, meta: { title: 'La panadería' } },
    { path: '/menu', name: 'menu', component: AtlasPage, meta: { title: 'El menú' } },
    { path: '/encargos', name: 'encargos', component: LibraryPage, meta: { title: 'Mi cesta' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

export default router
