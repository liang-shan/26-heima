import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import home from '@/views/home'
import login from '@/views/login'
import SecondHome from '@/views/home/second'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '',
        component: SecondHome
      },
      {
        path: '/home/comment',
        component: () => import('../views/comment')
      },
      {
        path: '/home/material',
        component: () => import('../views/material')
      }, {
        path: '/home/articles',
        component: () => import('../views/articles')
      }, {
        path: '/home/publish',
        component: () => import('../views/publish')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
