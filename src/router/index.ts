import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { path: '/', name: 'Home', component: () => import('@/views/index.vue') },
    { path: '/fetch', name: 'Fetch', component: () => import('@/views/fetch/index.vue') },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router