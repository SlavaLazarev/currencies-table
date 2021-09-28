import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/List.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/converter',
      name:'Converter',
      component: () => import('../views/Converter.vue')
    }
  ]
})
  export default router
