
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

// ================= ADMIN =================
import Dashboard from '../views/Dashboard.vue'
import Produk from '../views/Produk.vue'
import Pesanan from '../views/Pesanan.vue'
import HistoryPelanggan from '../views/HistoryPelanggan.vue'
import Pengaturan from '../views/Pengaturan.vue'

// ================= PETUGAS =================
import PetugasDashboard from '../views/PetugasDashboard.vue'
import PetugasPesanan from '../views/PetugasPesanan.vue'
import PetugasProduk from '../views/PetugasProduk.vue'

// ================= USER =================
import Checkout from '../views/Checkout.vue'

const routes = [

  // ================= USER =================

  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },

  // ================= LOGIN =================

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  // ================= ADMIN =================

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
    path: '/history-pelanggan',
    name: 'history-pelanggan',
    component: HistoryPelanggan
  },

  {
    path: '/pengaturan',
    name: 'pengaturan',
    component: Pengaturan
  },

  // ================= PETUGAS =================

  {
    path: '/petugas/dashboard',
    name: 'petugas-dashboard',
    component: PetugasDashboard
  },

  {
    path: '/petugas/pesanan',
    name: 'petugas-pesanan',
    component: PetugasPesanan
  },

  {
    path: '/petugas/produk',
    name: 'petugas-produk',
    component: PetugasProduk
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

// ================= ROUTE GUARD =================

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const role = (localStorage.getItem('role') || '')
    .trim()
    .toLowerCase()

  // ROUTE KHUSUS PETUGAS
  if (to.path.startsWith('/petugas')) {
    if (!token || role !== 'petugas') {
      return '/login'
    }

    return true
  }

  // ROUTE KHUSUS ADMIN
  const adminRoutes = [
    '/dashboard',
    '/produk',
    '/pesanan',
    '/history-pelanggan',
    '/pengaturan'
  ]

  if (adminRoutes.includes(to.path)) {
    if (!token || role !== 'admin') {
      return '/login'
    }

    return true
  }

  return true
})

export default router