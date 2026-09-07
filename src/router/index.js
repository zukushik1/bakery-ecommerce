import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Dashboard from '../views/Dashboard.vue'
import Produk from '../views/Produk.vue'
import Pesanan from '../views/Pesanan.vue'
import Pelanggan from '../views/Pelanggan.vue'
import Pengaturan from '../views/Pengaturan.vue'

const routes = [

  // ================= USER =================

  {
    path: '/',
    name: 'home',
    component: Home
  },

  // ================= ADMIN / PETUGAS =================

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },

  {
    path: '/produk',
    name: 'produk',
    component: Produk
  },

  {
    path: '/pesanan',
    name: 'pesanan',
    component: Pesanan
  },

  {
    path: '/pelanggan',
    name: 'pelanggan',
    component: Pelanggan
  },

  {
    path: '/pengaturan',
    name: 'pengaturan',
    component: Pengaturan
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router