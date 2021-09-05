// router/index.ts

import { createRouter, createWebHistory} from 'vue-router'
import Library from '../views/Library.vue'
import BookCase from '../views/BookCase.vue'

const routes = [
  { path: '/', name: 'BookCase', component: BookCase },
  { path: '/add', name: 'Library', component: Library },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router