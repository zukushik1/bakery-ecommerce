<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import brownies from '../assets/images/brownies.jpg'
import strawberryCake from '../assets/images/strawberry-cake.jpg'
import matchaCupcake from '../assets/images/matcha-cupcake.jpg'
import oatmealCookies from '../assets/images/oatmeal-cookies.jpg'
import chocolateCake from '../assets/images/chocolate-cake.jpg'
import redVelvetCake from '../assets/images/red-velvet-cake.jpg'
import tiramisuCake from '../assets/images/tiramisu-cake.jpg'
import matchaCake from '../assets/images/matcha-cake.jpg'
import cheeseCake from '../assets/images/cheese-cake.jpg'
import blackForestCake from '../assets/images/black-forest-cake.jpg'
import caramelCake from '../assets/images/caramel-cake.jpg'
import fruitCake from '../assets/images/fruit-cake.jpg'
import bananaBread from '../assets/images/banana-bread.jpg'
import carrotCake from '../assets/images/carrot-cake.jpg'
import blueberryTart from '../assets/images/blueberry-tart.jpg'
import lemonCake from '../assets/images/lemon-cake.jpg'

const router = useRouter()

const showMenu = ref(false)
const showAddForm = ref(false)
const searchQuery = ref('')

// PAGINATION
const currentPage = ref(1)
const itemsPerPage = 5

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const startItem = computed(() => {
  if (filteredProducts.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage,
    filteredProducts.value.length
  )
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const logout = () => {
  router.push('/login')
}

/* =========================
   16 PRODUK
========================= */

const products = ref([
  {
    id: 1,
    name: 'Brownies',
    category: 'Brownies',
    price: 35000,
    stock: 18,
    sold: 42,
    image: brownies
  },
  {
    id: 2,
    name: 'Strawberry Cake',
    category: 'Cake',
    price: 80000,
    stock: 12,
    sold: 48,
    image: strawberryCake
  },
  {
    id: 3,
    name: 'Matcha Cupcake',
    category: 'Cupcake',
    price: 25000,
    stock: 15,
    sold: 36,
    image: matchaCupcake
  },
  {
    id: 4,
    name: 'Oatmeal Cookies',
    category: 'Cookies',
    price: 30000,
    stock: 25,
    sold: 31,
    image: oatmealCookies
  },
  {
    id: 5,
    name: 'Chocolate Cake',
    category: 'Cake',
    price: 70000,
    stock: 10,
    sold: 29,
    image: chocolateCake
  },
  {
    id: 6,
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 75000,
    stock: 8,
    sold: 27,
    image: redVelvetCake
  },
  {
    id: 7,
    name: 'Tiramisu Cake',
    category: 'Cake',
    price: 75000,
    stock: 20,
    sold: 25,
    image: tiramisuCake
  },
  {
    id: 8,
    name: 'Matcha Cake',
    category: 'Cake',
    price: 65000,
    stock: 17,
    sold: 23,
    image: matchaCake
  },
  {
    id: 9,
    name: 'Cheese Cake',
    category: 'Cake',
    price: 65000,
    stock: 22,
    sold: 21,
    image: cheeseCake
  },
  {
    id: 10,
    name: 'Black Forest Cake',
    category: 'Cake',
    price: 70000,
    stock: 14,
    sold: 19,
    image: blackForestCake
  },
  {
    id: 11,
    name: 'Caramel Cake',
    category: 'Cake',
    price: 65000,
    stock: 9,
    sold: 18,
    image: caramelCake
  },
  {
    id: 12,
    name: 'Fruit Cake',
    category: 'Cake',
    price: 60000,
    stock: 11,
    sold: 16,
    image: fruitCake
  },
  {
    id: 13,
    name: 'Banana Cake',
    category: 'Cake',
    price: 45000,
    stock: 13,
    sold: 15,
    image: bananaBread
  },
  {
    id: 14,
    name: 'Carrot Cake',
    category: 'Cake',
    price: 60000,
    stock: 7,
    sold: 13,
    image: carrotCake
  },
  {
    id: 15,
    name: 'Blueberry Tart',
    category: 'Tart',
    price: 55000,
    stock: 6,
    sold: 11,
    image: blueberryTart
  },
  {
    id: 16,
    name: 'Lemon Cake',
    category: 'Cake',
    price: 55000,
    stock: 10,
    sold: 9,
    image: lemonCake
  }
])

/* =========================
   SEARCH
========================= */

const filteredProducts = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim()

  if (!keyword) {
    return products.value
  }

  return products.value.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  )
})

watch(filteredProducts, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1
  }
})

/* =========================
   STATISTIK
========================= */

const totalStock = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.stock,
    0
  )
})

const totalSold = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.sold,
    0
  )
})

const totalCategories = computed(() => {
  return new Set(
    products.value.map(product => product.category)
  ).size
})

/* =========================
   FORMAT HARGA
========================= */

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

/* =========================
   DELETE
========================= */

const deleteProduct = (id) => {
  products.value = products.value.filter(
    product => product.id !== id
  )
}

/* =========================
   MENU
========================= */
 
const closeMenu = () => {
  showMenu.value = false
}
</script>


<template>
  <div class="dashboard-page">

    <!-- =========================
         MOBILE OVERLAY
    ========================== -->

    <div
      v-if="showMenu"
      class="menu-overlay"
      @click="closeMenu"
    ></div>


    <!-- =========================
         SIDEBAR
    ========================== -->

    <aside
      class="sidebar"
      :class="{ 'sidebar-open': showMenu }"
    >

      <!-- LOGO -->

      <div class="brand">

        <img
          src="../assets/images/logo.webp"
          alt="Jericho & Nesya"
        />

        <button
          class="close-menu"
          @click="closeMenu"
        >
          ×
        </button>

      </div>


      <!-- MENU -->

      <nav class="menu">

        <p class="menu-title">
          MENU UTAMA
        </p>


        <!-- DASHBOARD -->

        <router-link
          to="/dashboard"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">⌂</span>
          <span>Dashboard</span>
        </router-link>


        <!-- PRODUK -->

        <router-link
          to="/produk"
          class="menu-item active"
          @click="closeMenu"
        >
          <span class="menu-icon">🍰</span>
          <span>Produk</span>
        </router-link>


        <!-- PESANAN -->

        <router-link
          to="/pesanan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">🛍</span>
          <span>Pesanan</span>
        </router-link>


        <!-- PELANGGAN -->

        <router-link
          to="/pelanggan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">♙</span>
          <span>Pelanggan</span>
        </router-link>


        <p class="menu-title second-title">
          LAINNYA
        </p>


        <!-- PENGATURAN -->

        <router-link
          to="/pengaturan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">⚙</span>
          <span>Pengaturan</span>
        </router-link>

      </nav>


      <!-- SIDEBAR BOTTOM -->

      <div class="sidebar-bottom">

        <div class="admin-profile">

          <div class="profile-avatar">
            A
          </div>

          <div class="profile-info">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        <button
          class="logout-button"
          @click="logout"
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>


    <!-- =========================
         MAIN
    ========================== -->

    <main class="main-content">


      <!-- =========================
           TOPBAR
      ========================== -->

      <header class="topbar">

        <!-- HAMBURGER -->

        <button
          class="hamburger"
          @click="showMenu = true"
          aria-label="Buka menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        <div class="page-heading">

          <span class="small-title">
            MANAGEMENT
          </span>

          <h1>
            Produk
          </h1>

        </div>


        <div class="topbar-right">

          <div class="top-admin">

            <div class="top-avatar">
              A
            </div>

            <div class="top-admin-info">

              <strong>
                Admin
              </strong>

              <span>
                Administrator
              </span>

            </div>

            <span class="arrow">
              ⌄
            </span>

          </div>

        </div>

      </header>


      <!-- =========================
           CONTENT
      ========================== -->

      <section class="content">


        <!-- PAGE INTRO -->

        <div class="page-intro">

          <div>

            <span class="intro-label">
              TOKO JERICHO & NESYA
            </span>

            <h2>
              Kelola Produk
            </h2>

            <p>
              Tambahkan dan kelola produk kue yang tersedia di toko.
            </p>

          </div>


          <button
            class="add-button"
            @click="showAddForm = !showAddForm"
          >
            <span>＋</span>
            Tambah Produk
          </button>

        </div>


        <!-- =========================
             QUICK STATS
        ========================== -->

        <div class="stats-grid">


          <!-- TOTAL PRODUK -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon green">
                🍰
              </div>

              <span class="stat-badge">
                Produk
              </span>

            </div>

            <p class="stat-label">
              Total Produk
            </p>

            <h3>
              {{ products.length }}
            </h3>

            <span class="stat-footer">
              produk tersedia
            </span>

          </div>


          <!-- TOTAL STOK -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon pink">
                📦
              </div>

              <span class="stat-badge">
                Stok
              </span>

            </div>

            <p class="stat-label">
              Total Stok
            </p>

            <h3>
              {{ totalStock }}
            </h3>

            <span class="stat-footer">
              item tersedia
            </span>

          </div>


          <!-- TOTAL TERJUAL -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon peach">
                🛍
              </div>

              <span class="stat-badge">
                Terjual
              </span>

            </div>

            <p class="stat-label">
              Total Terjual
            </p>

            <h3>
              {{ totalSold }}
            </h3>

            <span class="stat-footer">
              semua produk
            </span>

          </div>


          <!-- KATEGORI -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon cream">
                ✦
              </div>

              <span class="stat-badge">
                Kategori
              </span>

            </div>

            <p class="stat-label">
              Kategori Produk
            </p>

            <h3>
              {{ totalCategories }}
            </h3>

            <span class="stat-footer">
              jenis produk
            </span>

          </div>

        </div>


        <!-- =========================
             ADD PRODUCT FORM
        ========================== -->

        <div
          v-if="showAddForm"
          class="add-product-panel"
        >

          <div class="form-title">

            <div>

              <span>
                PRODUK BARU
              </span>

              <h2>
                Tambah Produk
              </h2>

            </div>

            <button
              class="close-button"
              @click="showAddForm = false"
            >
              ×
            </button>

          </div>


          <div class="form-grid">

            <div class="form-group">

              <label>
                Nama Produk
              </label>

              <input
                type="text"
                placeholder="Contoh: Strawberry Cake"
              />

            </div>


            <div class="form-group">

              <label>
                Kategori
              </label>

              <select>

                <option>
                  Pilih kategori
                </option>

                <option>
                  Cake
                </option>

                <option>
                  Brownies
                </option>

                <option>
                  Cupcake
                </option>

                <option>
                  Cookies
                </option>

              </select>

            </div>


            <div class="form-group">

              <label>
                Harga
              </label>

              <input
                type="number"
                placeholder="125000"
              />

            </div>


            <div class="form-group">

              <label>
                Stok
              </label>

              <input
                type="number"
                placeholder="10"
              />

            </div>

          </div>


          <div class="form-actions">

            <button
              class="cancel-button"
              @click="showAddForm = false"
            >
              Batal
            </button>

            <button
              class="save-button"
              @click="showAddForm = false"
            >
              Simpan Produk
            </button>

          </div>

        </div>


        <!-- =========================
             PRODUCT PANEL
        ========================== -->

        <div class="product-panel">


          <!-- PANEL HEADER -->

          <div class="panel-header">

            <div>

              <h2>
                Semua Produk
              </h2>

              <p>
                Daftar produk yang tersedia di toko
              </p>

            </div>


            <div class="product-tools">

              <div class="search-box">

                <span>
                  ⌕
                </span>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari produk..."
                />

              </div>

            </div>

          </div>


          <!-- =========================
               PRODUCT TABLE
          ========================== -->

          <div class="product-table">


            <!-- TABLE HEAD -->

            <div class="table-head">

              <span>PRODUK</span>
              <span>KATEGORI</span>
              <span>HARGA</span>
              <span>STOK</span>
              <span>TERJUAL</span>
              <span>AKSI</span>

            </div>


            <!-- PRODUCT ROW -->

            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="product-row"
            >


              <!-- PRODUCT -->

              <div class="product-cell product-main">

                <div class="product-photo">

                  <img
                    :src="product.image"
                    :alt="product.name"
                  />

                </div>


                <div class="product-name">

                  <strong>
                    {{ product.name }}
                  </strong>

                  <span>
                    ID #PROD-{{ String(product.id).padStart(3, '0') }}
                  </span>

                </div>

              </div>


              <!-- CATEGORY -->

              <div class="product-cell">

                <span class="category">
                  {{ product.category }}
                </span>

              </div>


              <!-- PRICE -->

              <div class="product-cell">

                <strong class="price">
                  Rp {{ formatPrice(product.price) }}
                </strong>

              </div>


              <!-- STOCK -->

              <div class="product-cell">

                <span
                  class="stock"
                  :class="{
                    'low-stock': product.stock <= 10,
                    'good-stock': product.stock > 10
                  }"
                >
                  {{ product.stock }} pcs
                </span>

              </div>


              <!-- SOLD -->

              <div class="product-cell">

                <span class="sold">
                  {{ product.sold }} terjual
                </span>

              </div>


              <!-- ACTION -->

              <div class="product-cell action-cell">

                <button
                  class="edit-button"
                  title="Edit produk"
                >
                  ✎
                </button>

                <button
                  class="delete-button"
                  title="Hapus produk"
                  @click="deleteProduct(product.id)"
                >
                  ×
                </button>

              </div>

            </div>


            <!-- EMPTY -->

            <div
              v-if="filteredProducts.length === 0"
              class="empty-product"
            >

              <div>
                🍰
              </div>

              <h3>
                Belum ada produk
              </h3>

              <p>
                Tambahkan produk pertama untuk toko lu.
              </p>

            </div>

          </div>

          <!-- PAGINATION -->
          <div
            v-if="filteredProducts.length > 0"
            class="pagination-wrapper"
          >
            <div class="pagination-info">
              Menampilkan {{ startItem }}–{{ endItem }} dari {{ filteredProducts.length }} produk
            </div>

            <div class="pagination">
              <button
                class="pagination-button"
                :disabled="currentPage === 1"
                @click="prevPage"
                aria-label="Halaman sebelumnya"
              >
                ‹
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                class="pagination-button"
                :class="{ active: currentPage === page }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>

              <button
                class="pagination-button"
                :disabled="currentPage === totalPages"
                @click="nextPage"
                aria-label="Halaman berikutnya"
              >
                ›
              </button>
            </div>
          </div>

        </div>


        <!-- FOOTER -->

        <footer class="dashboard-footer">

          <span>
            © 2026 Jericho & Nesya
          </span>

          <span>
            Good Ingredients, Brighter Days ♥
          </span>

        </footer>

      </section>

    </main>

  </div>
</template>


<style scoped>

/* =========================
   RESET
========================= */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

.dashboard-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  display: flex;

  background: #faf9f5;

  color: #333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================
   SIDEBAR
========================= */

.sidebar {
  width: 270px;
  min-height: 100vh;

  position: fixed;

  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  background: #f1f3df;

  border-right: 1px solid #e3e6d5;

  z-index: 100;
}


/* =========================
   BRAND
========================= */

.brand {
  width: 100%;
  height: 125px;

  display: flex;

  align-items: center;

  padding-left: 30px;

  border-bottom: 1px solid #e3e6d5;
}

.brand img {
  width: 185px;

  height: auto;

  object-fit: contain;
}

.close-menu {
  display: none;
}


/* =========================
   MENU
========================= */

.menu {
  padding: 30px 18px;

  flex: 1;
}

.menu-title {
  margin: 0 0 14px 15px;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 2px;

  color: #98a18e;
}

.second-title {
  margin-top: 35px;
}

.menu-item {
  width: 100%;
  height: 52px;

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 0 16px;

  margin-bottom: 7px;

  border-radius: 13px;

  color: #68725f;

  text-decoration: none;

  font-size: 15px;

  transition: 0.2s;
}

.menu-item:hover {
  background: rgba(255,255,255,0.65);

  color: #52664c;
}

.menu-item.active {
  background: #718667;

  color: white;

  box-shadow:
    0 8px 18px rgba(113,134,103,0.18);
}

.menu-icon {
  width: 25px;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 18px;
}


/* =========================
   SIDEBAR BOTTOM
========================= */

.sidebar-bottom {
  padding: 20px;

  border-top: 1px solid #e3e6d5;
}

.admin-profile {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 18px;
}

.profile-avatar {
  width: 42px;
  height: 42px;

  display: flex;

  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: #ef9999;

  color: white;

  font-weight: bold;
}

.profile-info {
  display: flex;

  flex-direction: column;

  gap: 3px;
}

.profile-info strong {
  font-size: 14px;

  color: #52624d;
}

.profile-info span {
  font-size: 11px;

  color: #92988d;
}

.logout-button {
  width: 100%;
  height: 44px;

  border: 1px solid #ddd;

  border-radius: 12px;

  background: rgba(255,255,255,0.65);

  color: #7c8279;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  font-size: 13px;
}


/* =========================
   MAIN
========================= */

.main-content {
  width: calc(100% - 270px);

  min-height: 100vh;

  margin-left: 270px;

  overflow-x: hidden;
}


/* =========================
   TOPBAR
========================= */

.topbar {
  height: 125px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 50px;

  background: #fffdfb;

  border-bottom: 1px solid #eeeeea;
}

.hamburger {
  display: none;
}

.page-heading {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.small-title {
  font-size: 10px;

  font-weight: bold;

  letter-spacing: 2px;

  color: #a0a99a;
}

.page-heading h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 34px;

  color: #526b45;
}

.topbar-right {
  display: flex;

  align-items: center;

  gap: 25px;
}

.top-admin {
  display: flex;

  align-items: center;

  gap: 14px;
}

.top-avatar {
  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #718667;

  color: white;

  font-weight: bold;

  transform: translateX(3px);
}

.top-admin-info {
  display: flex;

  flex-direction: column;

  gap: 3px;
}

.top-admin-info strong {
  font-size: 13px;

  color: #505a4d;
}

.top-admin-info span {
  font-size: 10px;

  color: #999;
}

.arrow {
  color: #999;
}


/* =========================
   CONTENT
========================= */

.content {
  padding: 40px 50px 30px;

  max-width: 100%;
}


/* =========================
   PAGE INTRO
========================= */

.page-intro {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;

  gap: 20px;
}

.intro-label {
  font-size: 10px;

  font-weight: bold;

  letter-spacing: 2px;

  color: #a0a99a;
}

.page-intro h2 {
  margin: 7px 0 5px;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 32px;

  color: #526b45;
}

.page-intro p {
  margin: 0;

  font-size: 13px;

  color: #999;
}

.add-button {
  height: 50px;

  padding: 0 23px;

  flex-shrink: 0;

  border: none;

  border-radius: 15px;

  background: #718667;

  color: white;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 9px;
}

.add-button span {
  font-size: 20px;
}


/* =========================
   STATS
========================= */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-bottom: 25px;
}

.stat-card {
  padding: 23px;

  min-height: 170px;

  background: white;

  border: 1px solid #eeeeea;

  border-radius: 20px;

  box-shadow:
    0 8px 25px rgba(80,80,60,0.035);
}

.stat-top {
  display: flex;

  align-items: center;

  justify-content: space-between;
}

.stat-icon {
  width: 45px;
  height: 45px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 13px;

  font-size: 19px;
}

.stat-icon.green {
  background: #e8efdf;
}

.stat-icon.pink {
  background: #fce7e5;
}

.stat-icon.peach {
  background: #f9eadc;
}

.stat-icon.cream {
  background: #f5f0d8;
}

.stat-badge {
  padding: 5px 9px;

  border-radius: 20px;

  background: #f5f5f1;

  color: #9a9d96;

  font-size: 9px;
}

.stat-label {
  margin: 17px 0 4px;

  font-size: 12px;

  color: #8d9189;
}

.stat-card h3 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 28px;

  color: #52634b;
}

.stat-footer {
  display: block;

  margin-top: 6px;

  font-size: 10px;

  color: #b0b1ac;
}


/* =========================
   ADD PRODUCT
========================= */

.add-product-panel {
  margin-bottom: 25px;

  padding: 28px;

  background: #fffdfb;

  border: 1px solid #eeeeea;

  border-radius: 22px;

  box-shadow:
    0 8px 25px rgba(80,80,60,0.035);
}

.form-title {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  margin-bottom: 25px;
}

.form-title span {
  font-size: 9px;

  font-weight: bold;

  letter-spacing: 2px;

  color: #a0a99a;
}

.form-title h2 {
  margin: 7px 0 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 23px;

  color: #52634b;
}

.close-button {
  width: 35px;
  height: 35px;

  border: none;

  border-radius: 50%;

  background: #fce6e4;

  color: #a87b77;

  font-size: 22px;

  cursor: pointer;
}

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;
}

.form-group {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

.form-group label {
  font-size: 12px;

  font-weight: 600;

  color: #5e6659;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 48px;

  padding: 0 15px;

  border: 1px solid #deded9;

  border-radius: 12px;

  outline: none;

  background: white;

  color: #555;

  font-size: 13px;
}

.form-actions {
  display: flex;

  justify-content: flex-end;

  gap: 12px;

  margin-top: 25px;
}

.cancel-button,
.save-button {
  height: 45px;

  padding: 0 20px;

  border-radius: 12px;

  cursor: pointer;

  font-size: 13px;
}

.cancel-button {
  border: 1px solid #ddd;

  background: white;

  color: #777;
}

.save-button {
  border: none;

  background: #718667;

  color: white;
}


/* =========================
   PRODUCT PANEL
========================= */

.product-panel {
  width: 100%;

  background: white;

  border: 1px solid #eeeeea;

  border-radius: 22px;

  padding: 25px;

  box-shadow:
    0 8px 25px rgba(80,80,60,0.035);
}

.panel-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 21px;

  color: #52634b;
}

.panel-header p {
  margin: 5px 0 0;

  font-size: 11px;

  color: #a0a29d;
}

.product-tools {
  display: flex;

  gap: 10px;

  flex-shrink: 0;
}

.search-box {
  width: 220px;
  height: 40px;

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 0 12px;

  border: 1px solid #e2e2dd;

  border-radius: 11px;

  background: #fff;
}

.search-box span {
  color: #999;

  font-size: 19px;
}

.search-box input {
  width: 100%;

  border: none;

  outline: none;

  font-size: 12px;
}


/* =========================
   TABLE
========================= */

.product-table {
  width: 100%;

  overflow-x: auto;

  scrollbar-width: thin;
}

.table-head,
.product-row {
  min-width: 900px;

  display: grid;

  grid-template-columns:
    2.2fr
    1.1fr
    1.1fr
    0.9fr
    0.9fr
    0.8fr;

  align-items: center;
}

.table-head {
  min-height: 42px;

  padding: 0 15px;

  border-radius: 10px;

  background: #f7f7f3;

  color: #a0a49c;

  font-size: 9px;

  font-weight: bold;

  letter-spacing: 1px;
}

.product-row {
  min-height: 85px;

  padding: 0 15px;

  border-bottom: 1px solid #f0f0ed;
}

.product-cell {
  min-width: 0;

  display: flex;

  align-items: center;
}

.product-main {
  gap: 13px;
}

.product-photo {
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 15px;

  background: #f8eeee;
}

.product-photo img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}

.product-name {
  display: flex;

  flex-direction: column;

  gap: 5px;

  min-width: 0;
}

.product-name strong {
  font-size: 13px;

  color: #515c4d;
}

.product-name span {
  font-size: 9px;

  color: #aaa;
}

.category {
  padding: 6px 10px;

  border-radius: 20px;

  background: #f1f3e8;

  color: #718064;

  font-size: 9px;

  font-weight: 600;
}

.price {
  font-size: 12px;

  color: #5e6f55;
}

.stock {
  padding: 6px 9px;

  border-radius: 20px;

  font-size: 9px;

  font-weight: 600;
}

.good-stock {
  background: #e8f0e3;

  color: #6b835f;
}

.low-stock {
  background: #fff0df;

  color: #ad7c4b;
}

.sold {
  font-size: 10px;

  color: #888;
}

.action-cell {
  gap: 7px;
}

.edit-button,
.delete-button {
  width: 32px;
  height: 32px;

  border-radius: 9px;

  cursor: pointer;

  font-size: 14px;
}

.edit-button {
  border: 1px solid #dfe5d9;

  background: #f1f4eb;

  color: #718365;
}

.delete-button {
  border: 1px solid #f0d7d4;

  background: #fff1ef;

  color: #c7847f;
}


/* =========================
   PAGINATION
========================= */

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 20px 5px 5px;
  border-top: 1px solid #f0f0ed;
}

.pagination-info {
  font-size: 11px;
  color: #999;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-button {
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid #e2e2dd;
  border-radius: 9px;
  background: white;
  color: #718064;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background: #f1f3e8;
  border-color: #dfe5d9;
}

.pagination-button.active {
  background: #718667;
  border-color: #718667;
  color: white;
}

.pagination-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* =========================
   EMPTY
========================= */

.empty-product {
  padding: 60px 20px;

  text-align: center;

  color: #aaa;
}

.empty-product div {
  font-size: 40px;

  margin-bottom: 10px;
}

.empty-product h3 {
  margin: 0 0 5px;

  color: #697362;

  font-family: Georgia, serif;
}

.empty-product p {
  margin: 0;

  font-size: 12px;
}


/* =========================
   FOOTER
========================= */

.dashboard-footer {
  display: flex;

  justify-content: space-between;

  padding: 30px 5px 5px;

  color: #aaa;

  font-size: 10px;

  letter-spacing: 0.3px;
}


/* =========================
   TABLET
========================= */

@media (max-width: 1200px) {

  .sidebar {
    width: 230px;
  }

  .main-content {
    width: calc(100% - 230px);

    margin-left: 230px;
  }

  .content {
    padding: 30px;
  }

  .topbar {
    padding: 0 30px;
  }

  .stats-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


/* =========================
   HAMBURGER / MOBILE
========================= */

@media (max-width: 800px) {

  .dashboard-page {
    display: block;

    width: 100%;

    overflow-x: hidden;
  }


  /* SIDEBAR */

  .sidebar {
    width: 280px;

    height: 100vh;

    min-height: 100vh;

    position: fixed;

    left: 0;
    top: 0;

    transform: translateX(-100%);

    transition: transform 0.25s ease;

    box-shadow:
      8px 0 30px rgba(60,70,50,0.12);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }


  .brand {
    height: 85px;

    padding: 0 20px;

    justify-content: space-between;
  }

  .brand img {
    width: 145px;
  }

  .close-menu {
    display: flex;

    width: 35px;
    height: 35px;

    align-items: center;
    justify-content: center;

    border: none;

    border-radius: 50%;

    background: white;

    color: #718667;

    font-size: 25px;

    cursor: pointer;
  }


  .menu {
    padding: 25px 15px;

    overflow-y: auto;
  }

  .menu-title {
    display: block;

    margin-left: 10px;
  }

  .second-title {
    margin-top: 30px;
  }

  .menu-item {
    width: 100%;

    height: 50px;

    margin-bottom: 6px;

    padding: 0 15px;
  }

  .sidebar-bottom {
    display: block;

    padding: 15px;
  }


  /* OVERLAY */

  .menu-overlay {
    position: fixed;

    inset: 0;

    background: rgba(0,0,0,0.25);

    z-index: 90;
  }


  /* MAIN */

  .main-content {
    width: 100%;

    margin-left: 0;

    overflow-x: hidden;
  }


  /* HEADER */

  .topbar {
    width: 100%;

    height: 72px;

    padding: 0 18px;

    gap: 12px;
  }

  .hamburger {
    width: 40px;
    height: 40px;

    flex-shrink: 0;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 5px;

    border: 1px solid #e5e5df;

    border-radius: 11px;

    background: white;

    cursor: pointer;
  }

  .hamburger span {
    width: 19px;
    height: 2px;

    display: block;

    border-radius: 5px;

    background: #718667;
  }

  .page-heading {
    flex: 1;

    min-width: 0;
  }

  .small-title {
    font-size: 8px;

    letter-spacing: 1.5px;
  }

  .page-heading h1 {
    font-size: 23px;
  }

  .topbar-right {
    gap: 8px;
  }

  .top-avatar {
    width: 35px;
    height: 35px;

    font-size: 13px;
  }

  .top-admin-info,
  .arrow {
    display: none;
  }


  /* CONTENT */

  .content {
    width: 100%;

    padding: 18px 15px 25px;

    overflow-x: hidden;
  }


  /* INTRO */

  .page-intro {
    flex-direction: column;

    align-items: stretch;

    gap: 15px;

    margin-bottom: 20px;
  }

  .intro-label {
    font-size: 8px;

    letter-spacing: 1.5px;
  }

  .page-intro h2 {
    font-size: 27px;

    margin: 5px 0;
  }

  .page-intro p {
    font-size: 11px;

    line-height: 1.5;
  }

  .add-button {
    width: 100%;

    height: 45px;

    justify-content: center;

    font-size: 13px;
  }


  /* STATS */

  .stats-grid {
    grid-template-columns: 1fr;

    gap: 12px;

    margin-bottom: 18px;
  }

  .stat-card {
    min-height: 135px;

    padding: 18px;

    border-radius: 17px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-label {
    margin-top: 12px;
  }

  .stat-card h3 {
    font-size: 25px;
  }


  /* FORM */

  .add-product-panel {
    padding: 18px;

    border-radius: 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .form-actions {
    flex-direction: column;

    gap: 8px;
  }

  .cancel-button,
  .save-button {
    width: 100%;
  }


  /* PRODUCT PANEL */

  .product-panel {
    width: 100%;

    padding: 17px;

    border-radius: 18px;

    overflow: hidden;
  }

  .panel-header {
    flex-direction: column;

    gap: 14px;
  }

  .panel-header h2 {
    font-size: 20px;
  }

  .panel-header p {
    font-size: 10px;
  }

  .product-tools {
    width: 100%;

    display: flex;
  }

  .search-box {
    flex: 1;

    width: auto;

    min-width: 0;
  }


  /* TABLE */

  .product-table {
    width: 100%;

    max-width: 100%;

    overflow-x: auto;

    -webkit-overflow-scrolling: touch;
  }

  .table-head,
  .product-row {
    min-width: 760px;
  }


  /* FOOTER */

  .dashboard-footer {
    flex-direction: column;

    gap: 7px;

    padding-top: 22px;

    text-align: center;
  }

}


/* =========================
   SMALL HP
========================= */

@media (max-width: 500px) {

  .topbar {
    height: 64px;

    padding: 0 12px;

    gap: 9px;
  }

  .hamburger {
    width: 36px;
    height: 36px;
  }

  .hamburger span {
    width: 17px;
  }

  .page-heading h1 {
    font-size: 20px;
  }

  .small-title {
    font-size: 7px;
  }

  .top-avatar {
    width: 32px;
    height: 32px;
  }


  .content {
    padding: 15px 12px 20px;
  }


  .page-intro h2 {
    font-size: 24px;
  }

  .page-intro p {
    font-size: 10px;
  }


  .stat-card {
    min-height: 125px;

    padding: 16px;
  }

  .stat-card h3 {
    font-size: 23px;
  }


  .product-panel {
    padding: 14px;

    border-radius: 16px;
  }

  .product-tools {
    gap: 7px;
  }

  .search-box {
    height: 37px;
  }


  .dashboard-footer {
    font-size: 9px;
  }

}

</style>