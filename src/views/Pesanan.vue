<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const menuOpen = ref(false)
const searchQuery = ref('')

const orders = ref([])
const products = ref([])

const loading = ref(false)
const errorMessage = ref('')

const selectedOrder = ref(null)
const showDetailModal = ref(false)

/* =========================
   FETCH PRODUK
========================= */

const fetchProducts = async () => {
  try {
    const response = await api.get('/produk')

    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.data || []

    products.value = data.map((item) => ({
      id: Number(item.id_produk),
      name: item.nama_produk || `Produk #${item.id_produk}`,
      price: Number(item.harga) || 0
    }))

  } catch (error) {
    console.error('Gagal mengambil data produk:', error)
  }
}


/* =========================
   FETCH PESANAN
========================= */

const fetchOrders = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get('/pesanan')

    console.log('Data pesanan dari API:', response.data)

    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.data || []

    orders.value = data.map((item) => {

      const product = products.value.find(
        (product) =>
          product.id === Number(item.id_produk)
      )

      const qty = Number(item.qty) || 0

      const price = product?.price || 0

      const total = Number(item.total_pesanan) || 0

      return {
        id: item.id_pesanan,

        customer:
          item.nama_pelanggan ||
          item.customer_name ||
          `Pelanggan #${item.id_petugas}`,

        phone:
          item.nomor_hp ||
          item.phone ||
          '-',

        petugasId:
          item.id_petugas,

        date:
          formatDate(item.tanggal_pesanan),

        rawDate:
          item.tanggal_pesanan,

        productId:
          Number(item.id_produk),

        productName:
          product?.name ||
          item.nama_produk ||
          `Produk #${item.id_produk}`,

        qty,

        price,

        total,

        alamat:
          item.alamat ||
          '-'
      }
    })

  } catch (error) {
    console.error(
      'Gagal mengambil data pesanan:',
      error
    )

    errorMessage.value =
      error.response?.data?.message ||
      'Gagal mengambil data pesanan dari server.'

  } finally {
    loading.value = false
  }
}


/* =========================
   FORMAT TANGGAL
========================= */

const formatDate = (date) => {

  if (!date) {
    return '-'
  }

  const parsedDate = new Date(date)

  if (isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }
  ).format(parsedDate)
}


/* =========================
   FORMAT PRICE
========================= */

const formatPrice = (price) => {

  return new Intl.NumberFormat(
    'id-ID'
  ).format(price || 0)

}


/* =========================
   STATISTICS
========================= */

const totalOrders = computed(() => {

  return orders.value.length

})


const totalItems = computed(() => {

  return orders.value.reduce(
    (total, order) =>
      total + order.qty,
    0
  )

})


const totalRevenue = computed(() => {

  return orders.value.reduce(
    (total, order) =>
      total + order.total,
    0
  )

})


const uniqueProducts = computed(() => {

  return new Set(
    orders.value.map(
      order => order.productId
    )
  ).size

})


/* =========================
   FILTER
========================= */

const filteredOrders = computed(() => {

  const search =
    searchQuery.value
      .toLowerCase()
      .trim()

  if (!search) {
    return orders.value
  }

  return orders.value.filter(
    (order) => {

      return (
        String(order.id)
          .toLowerCase()
          .includes(search) ||

        String(order.customer)
          .toLowerCase()
          .includes(search) ||

        String(order.productName)
          .toLowerCase()
          .includes(search) ||

        String(order.alamat)
          .toLowerCase()
          .includes(search)
      )

    }
  )

})


/* =========================
   INITIAL
========================= */

const getInitial = (name) => {

  if (!name) {
    return '?'
  }

  return name
    .charAt(0)
    .toUpperCase()

}


/* =========================
   DETAIL MODAL
========================= */

const openDetail = (order) => {

  selectedOrder.value = order

  showDetailModal.value = true

}


const closeDetail = () => {

  showDetailModal.value = false

  selectedOrder.value = null

}


/* =========================
   MOBILE MENU
========================= */

const toggleMenu = () => {

  menuOpen.value =
    !menuOpen.value

}


const closeMenu = () => {

  menuOpen.value = false

}


/* =========================
   LOGOUT
========================= */

const logout = () => {

  router.push('/login')

}


/* =========================
   LOAD DATA
========================= */

onMounted(async () => {

  await fetchProducts()

  await fetchOrders()

})
</script>


<template>

  <div class="dashboard-page">

    <!-- =========================
         SIDEBAR
    ========================== -->

    <aside
      class="sidebar"
      :class="{ 'mobile-open': menuOpen }"
    >

      <div class="brand">

        <img
          src="../assets/images/logo.webp"
          alt="Jericho & Nesya"
        />

      </div>


      <nav class="menu">

        <p class="menu-title">
          MENU UTAMA
        </p>


        <router-link
          to="/dashboard"
          class="menu-item"
          @click="closeMenu"
        >

          <span class="menu-icon">
            ⌂
          </span>

          <span>
            Dashboard
          </span>

        </router-link>


        <router-link
          to="/produk"
          class="menu-item"
          @click="closeMenu"
        >

          <span class="menu-icon">
            🍰
          </span>

          <span>
            Produk
          </span>

        </router-link>


        <router-link
          to="/pesanan"
          class="menu-item active"
          @click="closeMenu"
        >

          <span class="menu-icon">
            🛍
          </span>

          <span>
            Pesanan
          </span>

        </router-link>


        <router-link
          to="/history-pelanggan"
          class="menu-item"
          @click="closeMenu"
        >

          <span class="menu-icon">
            ♙
          </span>

          <span>
            History Pelanggan
          </span>

        </router-link>


        <p class="menu-title second-title">
          LAINNYA
        </p>


        <router-link
          to="/pengaturan"
          class="menu-item"
          @click="closeMenu"
        >

          <span class="menu-icon">
            ⚙
          </span>

          <span>
            Pengaturan
          </span>

        </router-link>

      </nav>


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

          <span>
            ↪
          </span>

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

        <button
          class="hamburger-button"
          @click="toggleMenu"
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
            Pesanan
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


      <!-- OVERLAY MOBILE -->

      <div
        v-if="menuOpen"
        class="mobile-overlay"
        @click="closeMenu"
      ></div>


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
              Kelola Pesanan
            </h2>

            <p>
              Pantau dan kelola semua pesanan yang masuk ke toko.
            </p>

          </div>

        </div>


        <!-- =========================
             STATISTICS
        ========================== -->

        <div class="stats-grid">


          <!-- TOTAL PESANAN -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon green">
                🛍
              </div>

              <span class="stat-badge">
                Pesanan
              </span>

            </div>

            <p class="stat-label">
              Total Pesanan
            </p>

            <h3>
              {{ totalOrders }}
            </h3>

            <span class="stat-footer">
              semua pesanan
            </span>

          </div>


          <!-- TOTAL ITEM -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon pink">
                📦
              </div>

              <span class="stat-badge">
                Item
              </span>

            </div>

            <p class="stat-label">
              Total Item
            </p>

            <h3>
              {{ totalItems }}
            </h3>

            <span class="stat-footer">
              produk dipesan
            </span>

          </div>


          <!-- TOTAL NILAI -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon peach">
                Rp
              </div>

              <span class="stat-badge">
                Nilai
              </span>

            </div>

            <p class="stat-label">
              Total Nilai Pesanan
            </p>

            <h3 class="price-stat">
              Rp {{ formatPrice(totalRevenue) }}
            </h3>

            <span class="stat-footer">
              dari semua pesanan
            </span>

          </div>


          <!-- PRODUK -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon cream">
                🍰
              </div>

              <span class="stat-badge">
                Produk
              </span>

            </div>

            <p class="stat-label">
              Jenis Produk
            </p>

            <h3>
              {{ uniqueProducts }}
            </h3>

            <span class="stat-footer">
              produk dipesan
            </span>

          </div>

        </div>


        <!-- =========================
             ORDER PANEL
        ========================== -->

        <div class="order-panel">


          <!-- PANEL HEADER -->

          <div class="panel-header">

            <div>

              <h2>
                Semua Pesanan
              </h2>

              <p>
                Daftar pesanan yang masuk ke toko
              </p>

            </div>


            <!-- SEARCH -->

            <div class="order-tools">

              <div class="search-box">

                <span>
                  ⌕
                </span>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari pesanan..."
                />

              </div>

            </div>

          </div>


          <!-- ERROR -->

          <div
            v-if="errorMessage"
            class="error-message"
          >

            {{ errorMessage }}

          </div>


          <!-- LOADING -->

          <div
            v-if="loading"
            class="loading-order"
          >

            Memuat data pesanan...

          </div>


          <!-- =========================
               DESKTOP TABLE
          ========================== -->

          <div
            v-else
            class="orders-table"
          >


            <!-- TABLE HEAD -->

            <div class="table-head">

              <span>
                PESANAN
              </span>

              <span>
                PELANGGAN
              </span>

              <span>
                PRODUK
              </span>

              <span>
                TOTAL
              </span>

              <span>
                AKSI
              </span>

            </div>


            <!-- ROW -->

            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="order-row"
            >


              <!-- ORDER -->

              <div class="order-cell order-main">

                <div class="order-icon">
                  🛍
                </div>

                <div class="order-name">

                  <strong>
                    #{{ order.id }}
                  </strong>

                  <span>
                    {{ order.date }}
                  </span>

                </div>

              </div>


              <!-- CUSTOMER -->

              <div class="order-cell customer-cell">

                <div class="customer-avatar">
                  {{ getInitial(order.customer) }}
                </div>

                <div class="customer-info">

                  <strong>
                    {{ order.customer }}
                  </strong>

                  <span>
                    {{ order.phone }}
                  </span>

                </div>

              </div>


              <!-- PRODUCT -->

              <div class="order-cell product-cell">

                <div class="product-info">

                  <strong>
                    {{ order.productName }}
                  </strong>

                  <span>
                    {{ order.qty }} × Rp {{ formatPrice(order.price) }}
                  </span>

                </div>

              </div>


              <!-- TOTAL -->

              <div class="order-cell">

                <strong class="order-total">
                  Rp {{ formatPrice(order.total) }}
                </strong>

              </div>


              <!-- ACTION -->

              <div class="order-cell action-cell">

                <button
                  class="detail-button"
                  @click="openDetail(order)"
                >

                  <span>
                    ⌕
                  </span>

                  Lihat Detail

                </button>

              </div>

            </div>


            <!-- EMPTY -->

            <div
              v-if="filteredOrders.length === 0"
              class="empty-order"
            >

              <div>
                🛍
              </div>

              <h3>
                Pesanan tidak ditemukan
              </h3>

              <p>
                Coba cari dengan nama pelanggan, produk, atau nomor pesanan.
              </p>

            </div>

          </div>


          <!-- =========================
               MOBILE ORDER CARDS
          ========================== -->

          <div
            v-if="!loading"
            class="mobile-orders"
          >

            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="mobile-order-card"
            >


              <!-- CARD TOP -->

              <div class="mobile-order-top">

                <div class="mobile-order-id">

                  <div class="mobile-order-icon">
                    🛍
                  </div>

                  <div>

                    <strong>
                      #{{ order.id }}
                    </strong>

                    <span>
                      {{ order.date }}
                    </span>

                  </div>

                </div>

              </div>


              <!-- CUSTOMER -->

              <div class="mobile-customer">

                <div class="customer-avatar">
                  {{ getInitial(order.customer) }}
                </div>

                <div class="customer-info">

                  <strong>
                    {{ order.customer }}
                  </strong>

                  <span>
                    {{ order.phone }}
                  </span>

                </div>

              </div>


              <!-- ITEMS -->

              <div class="mobile-items">

                <div class="mobile-item">

                  <div class="mobile-product-name">

                    <strong>
                      {{ order.productName }}
                    </strong>

                    <span>
                      {{ order.qty }} × Rp {{ formatPrice(order.price) }}
                    </span>

                  </div>

                  <strong>
                    Rp {{ formatPrice(order.total) }}
                  </strong>

                </div>

              </div>


              <!-- ADDRESS -->

              <div class="mobile-address">

                <span>
                  Alamat
                </span>

                <strong>
                  {{ order.alamat }}
                </strong>

              </div>


              <!-- BOTTOM -->

              <div class="mobile-order-bottom">

                <div class="mobile-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    Rp {{ formatPrice(order.total) }}
                  </strong>

                </div>


                <button
                  class="detail-button mobile-detail-button"
                  @click="openDetail(order)"
                >

                  <span>
                    ⌕
                  </span>

                  Lihat Detail

                </button>

              </div>

            </div>


            <!-- MOBILE EMPTY -->

            <div
              v-if="filteredOrders.length === 0"
              class="empty-order"
            >

              <div>
                🛍
              </div>

              <h3>
                Pesanan tidak ditemukan
              </h3>

              <p>
                Coba cari dengan nama pelanggan, produk, atau nomor pesanan.
              </p>

            </div>

          </div>

        </div>


        <!-- =========================
             FOOTER
        ========================== -->

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


    <!-- =========================
         DETAIL MODAL
    ========================== -->

    <div
      v-if="showDetailModal && selectedOrder"
      class="modal-overlay"
      @click.self="closeDetail"
    >

      <div class="detail-modal">


        <!-- MODAL HEADER -->

        <div class="modal-header">

          <div>

            <span class="modal-label">
              DETAIL PESANAN
            </span>

            <h2>
              #{{ selectedOrder.id }}
            </h2>

          </div>


          <button
            class="modal-close"
            @click="closeDetail"
            aria-label="Tutup"
          >
            ×
          </button>

        </div>


        <!-- CUSTOMER -->

        <div class="detail-customer">

          <div class="detail-avatar">
            {{ getInitial(selectedOrder.customer) }}
          </div>

          <div>

            <span>
              Pelanggan
            </span>

            <strong>
              {{ selectedOrder.customer }}
            </strong>

            <small>
              {{ selectedOrder.phone }}
            </small>

          </div>

        </div>


        <!-- DETAIL GRID -->

        <div class="detail-grid">


          <div class="detail-item">

            <span>
              ID Pesanan
            </span>

            <strong>
              #{{ selectedOrder.id }}
            </strong>

          </div>


          <div class="detail-item">

            <span>
              Tanggal
            </span>

            <strong>
              {{ selectedOrder.date }}
            </strong>

          </div>


          <div class="detail-item">

            <span>
              ID Petugas
            </span>

            <strong>
              {{
                selectedOrder.petugasId
                  ? `Petugas #${selectedOrder.petugasId}`
                  : '-'
              }}
            </strong>

          </div>


          <div class="detail-item">

            <span>
              ID Produk
            </span>

            <strong>
              #{{ selectedOrder.productId }}
            </strong>

          </div>

        </div>


        <!-- PRODUCT DETAIL -->

        <div class="detail-section">

          <span class="section-title">
            PRODUK
          </span>

          <div class="detail-product">

            <div class="detail-product-icon">
              🍰
            </div>

            <div class="detail-product-info">

              <strong>
                {{ selectedOrder.productName }}
              </strong>

              <span>
                {{ selectedOrder.qty }} ×
                Rp {{ formatPrice(selectedOrder.price) }}
              </span>

            </div>

            <strong class="detail-product-total">
              Rp {{ formatPrice(selectedOrder.total) }}
            </strong>

          </div>

        </div>


        <!-- ADDRESS -->

        <div class="detail-section">

          <span class="section-title">
            ALAMAT PENGIRIMAN
          </span>

          <div class="address-box">

            {{ selectedOrder.alamat }}

          </div>

        </div>


        <!-- TOTAL -->

        <div class="detail-total">

          <span>
            Total Pesanan
          </span>

          <strong>
            Rp {{ formatPrice(selectedOrder.total) }}
          </strong>

        </div>


        <!-- MODAL FOOTER -->

        <div class="modal-footer">

          <button
            class="close-detail-button"
            @click="closeDetail"
          >
            Tutup
          </button>

        </div>

      </div>

    </div>

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

  display: flex;

  overflow-x: hidden;

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

.logout-button:hover {
  background: white;
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

  position: relative;

  z-index: 30;
}

.hamburger-button {
  display: none;

  width: 40px;
  height: 40px;

  border: 1px solid #e4e4e0;

  border-radius: 11px;

  background: white;

  cursor: pointer;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 5px;
}

.hamburger-button span {
  display: block;

  width: 19px;
  height: 2px;

  border-radius: 5px;

  background: #68725f;
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

  gap: 11px;
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
  margin-left: 3px;

  color: #999;
}


/* =========================
   CONTENT
========================= */

.content {
  padding: 40px 50px 30px;

  max-width: 1600px;

  margin: 0 auto;
}


/* =========================
   PAGE INTRO
========================= */

.page-intro {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;
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

  color: #6d8560;
}

.stat-icon.pink {
  background: #fce7e5;

  color: #d98f8c;
}

.stat-icon.peach {
  background: #f9eadc;

  color: #c78c62;
}

.stat-icon.cream {
  background: #f5f0d8;

  color: #a39256;
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

.price-stat {
  font-size: 22px !important;

  white-space: nowrap;
}

.stat-footer {
  display: block;

  margin-top: 6px;

  font-size: 10px;

  color: #b0b1ac;
}


/* =========================
   ORDER PANEL
========================= */

.order-panel {
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


/* =========================
   TOOLS
========================= */

.order-tools {
  display: flex;

  gap: 10px;
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

  background: white;
}

.search-box span {
  color: #999;

  font-size: 19px;
}

.search-box input {
  width: 100%;

  min-width: 0;

  border: none;

  outline: none;

  font-size: 12px;

  color: #555;
}

.search-box input::placeholder {
  color: #aaa;
}


/* =========================
   TABLE
========================= */

.orders-table {
  width: 100%;

  overflow: hidden;
}

.table-head,
.order-row {
  display: grid;

  grid-template-columns:
    1.25fr
    1.45fr
    1.55fr
    1fr
    1.15fr;

  align-items: center;

  column-gap: 15px;
}

.table-head {
  min-height: 45px;

  padding: 0 15px;

  border-radius: 10px;

  background: #f7f7f3;

  color: #a0a49c;

  font-size: 9px;

  font-weight: bold;

  letter-spacing: 1px;
}

.order-row {
  min-height: 82px;

  padding: 0 15px;

  border-bottom: 1px solid #f0f0ed;
}

.order-row:last-child {
  border-bottom: none;
}

.order-cell {
  min-width: 0;

  display: flex;

  align-items: center;
}

.order-main {
  gap: 12px;
}

.order-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: #fce7e5;

  font-size: 17px;
}

.order-name {
  display: flex;

  flex-direction: column;

  gap: 4px;

  min-width: 0;
}

.order-name strong {
  font-size: 12px;

  color: #515c4d;
}

.order-name span {
  font-size: 9px;

  color: #aaa;
}

.customer-cell {
  gap: 10px;
}

.customer-avatar {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e8efdf;

  color: #6d8560;

  font-size: 12px;

  font-weight: bold;
}

.customer-info {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 4px;
}

.customer-info strong {
  font-size: 12px;

  color: #515c4d;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.customer-info span {
  font-size: 9px;

  color: #aaa;
}


/* =========================
   PRODUCT
========================= */

.product-info {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 4px;
}

.product-info strong {
  font-size: 11px;

  color: #596653;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.product-info span {
  font-size: 9px;

  color: #aaa;
}


/* =========================
   TOTAL
========================= */

.order-total {
  font-size: 11px;

  color: #5e6f55;

  white-space: nowrap;
}


/* =========================
   DETAIL BUTTON
========================= */

.action-cell {
  justify-content: flex-start;
}

.detail-button {
  height: 34px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  padding: 0 12px;

  border: 1px solid #dfe5d7;

  border-radius: 10px;

  background: #f4f7ef;

  color: #627457;

  font-size: 10px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.detail-button:hover {
  background: #718667;

  border-color: #718667;

  color: white;

  transform: translateY(-1px);
}


/* =========================
   MOBILE ORDERS
========================= */

.mobile-orders {
  display: none;
}

.mobile-order-card {
  background: #fffdfb;

  border: 1px solid #eeeeea;

  border-radius: 17px;

  padding: 15px;

  margin-bottom: 12px;
}

.mobile-order-top {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 10px;

  padding-bottom: 13px;

  border-bottom: 1px solid #f0f0ed;
}

.mobile-order-id {
  display: flex;

  align-items: center;

  gap: 10px;

  min-width: 0;
}

.mobile-order-icon {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: #fce7e5;
}

.mobile-order-id > div:last-child {
  display: flex;

  flex-direction: column;

  gap: 4px;

  min-width: 0;
}

.mobile-order-id strong {
  font-size: 12px;

  color: #515c4d;
}

.mobile-order-id span {
  font-size: 9px;

  color: #aaa;
}

.mobile-customer {
  display: flex;

  align-items: center;

  gap: 10px;

  padding: 13px 0;

  border-bottom: 1px solid #f0f0ed;
}

.mobile-items {
  padding: 10px 0;

  border-bottom: 1px solid #f0f0ed;
}

.mobile-item {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 10px;

  padding: 5px 0;

  font-size: 10px;

  color: #777;
}

.mobile-product-name {
  display: flex;

  flex-direction: column;

  gap: 4px;

  min-width: 0;
}

.mobile-product-name strong {
  color: #596653;

  font-size: 10px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.mobile-product-name span {
  color: #aaa;

  font-size: 9px;
}

.mobile-item > strong {
  color: #65765c;

  font-size: 10px;

  white-space: nowrap;
}


/* =========================
   ADDRESS
========================= */

.mobile-address {
  display: flex;

  flex-direction: column;

  gap: 5px;

  padding: 12px 0;

  border-bottom: 1px solid #f0f0ed;
}

.mobile-address span {
  font-size: 9px;

  color: #aaa;
}

.mobile-address strong {
  font-size: 10px;

  line-height: 1.5;

  color: #68725f;

  font-weight: 500;
}


/* =========================
   MOBILE BOTTOM
========================= */

.mobile-order-bottom {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 15px;

  padding-top: 12px;
}

.mobile-total {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 4px;
}

.mobile-total span {
  font-size: 9px;

  color: #aaa;
}

.mobile-total strong {
  font-size: 13px;

  color: #52634b;
}

.mobile-detail-button {
  height: 35px;

  flex-shrink: 0;
}


/* =========================
   EMPTY
========================= */

.empty-order {
  padding: 60px 20px;

  text-align: center;

  color: #aaa;
}

.empty-order div {
  font-size: 40px;

  margin-bottom: 10px;
}

.empty-order h3 {
  margin: 0 0 5px;

  color: #697362;

  font-family: Georgia, serif;
}

.empty-order p {
  margin: 0;

  font-size: 12px;
}


/* =========================
   LOADING / ERROR
========================= */

.loading-order {
  padding: 60px 20px;

  text-align: center;

  color: #8b9384;

  font-size: 12px;
}

.error-message {
  margin-bottom: 15px;

  padding: 12px 15px;

  border: 1px solid #f0d8d5;

  border-radius: 10px;

  background: #fff5f3;

  color: #b06f69;

  font-size: 11px;
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
   DETAIL MODAL
========================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background: rgba(45, 52, 39, 0.42);

  backdrop-filter: blur(3px);
}

.detail-modal {
  width: 100%;

  max-width: 560px;

  max-height: 90vh;

  overflow-y: auto;

  padding: 27px;

  border: 1px solid #eeeeea;

  border-radius: 22px;

  background: #fffdfb;

  box-shadow:
    0 25px 70px rgba(50,50,40,0.18);
}

.modal-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  padding-bottom: 20px;

  border-bottom: 1px solid #eeeeea;
}

.modal-label {
  font-size: 9px;

  font-weight: bold;

  letter-spacing: 2px;

  color: #a0a99a;
}

.modal-header h2 {
  margin: 6px 0 0;

  font-family: Georgia, serif;

  font-size: 25px;

  color: #526b45;
}

.modal-close {
  width: 35px;
  height: 35px;

  border: 1px solid #e5e5e0;

  border-radius: 10px;

  background: white;

  color: #777;

  font-size: 22px;

  line-height: 1;

  cursor: pointer;

  transition: 0.2s;
}

.modal-close:hover {
  background: #f5f5f0;

  color: #526b45;
}


/* =========================
   DETAIL CUSTOMER
========================= */

.detail-customer {
  display: flex;

  align-items: center;

  gap: 13px;

  padding: 20px 0;

  border-bottom: 1px solid #eeeeea;
}

.detail-avatar {
  width: 47px;
  height: 47px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e8efdf;

  color: #6d8560;

  font-size: 15px;

  font-weight: bold;
}

.detail-customer > div:last-child {
  display: flex;

  flex-direction: column;

  gap: 3px;
}

.detail-customer span {
  font-size: 9px;

  color: #aaa;
}

.detail-customer strong {
  font-size: 13px;

  color: #515c4d;
}

.detail-customer small {
  font-size: 9px;

  color: #999;
}


/* =========================
   DETAIL GRID
========================= */

.detail-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 1px;

  margin-top: 20px;

  overflow: hidden;

  border: 1px solid #eeeeea;

  border-radius: 13px;

  background: #eeeeea;
}

.detail-item {
  display: flex;

  flex-direction: column;

  gap: 5px;

  min-height: 72px;

  padding: 14px;

  background: #fff;
}

.detail-item span {
  font-size: 9px;

  color: #aaa;
}

.detail-item strong {
  font-size: 11px;

  color: #596653;
}


/* =========================
   DETAIL SECTION
========================= */

.detail-section {
  margin-top: 20px;
}

.section-title {
  display: block;

  margin-bottom: 9px;

  font-size: 9px;

  font-weight: bold;

  letter-spacing: 1.5px;

  color: #9ca397;
}

.detail-product {
  display: flex;

  align-items: center;

  gap: 12px;

  padding: 13px;

  border: 1px solid #eeeeea;

  border-radius: 13px;

  background: white;
}

.detail-product-icon {
  width: 43px;
  height: 43px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 11px;

  background: #fce7e5;

  font-size: 18px;
}

.detail-product-info {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 4px;

  flex: 1;
}

.detail-product-info strong {
  font-size: 12px;

  color: #515c4d;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.detail-product-info span {
  font-size: 9px;

  color: #aaa;
}

.detail-product-total {
  font-size: 11px;

  color: #5e6f55;

  white-space: nowrap;
}


/* =========================
   ADDRESS
========================= */

.address-box {
  padding: 13px;

  border: 1px solid #eeeeea;

  border-radius: 13px;

  background: white;

  color: #68725f;

  font-size: 11px;

  line-height: 1.6;
}


/* =========================
   DETAIL TOTAL
========================= */

.detail-total {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  margin-top: 20px;

  padding: 17px;

  border-radius: 13px;

  background: #f1f3e8;
}

.detail-total span {
  font-size: 11px;

  color: #7d8776;
}

.detail-total strong {
  font-family: Georgia, serif;

  font-size: 17px;

  color: #526b45;

  white-space: nowrap;
}


/* =========================
   MODAL FOOTER
========================= */

.modal-footer {
  display: flex;

  justify-content: flex-end;

  margin-top: 18px;
}

.close-detail-button {
  height: 38px;

  padding: 0 20px;

  border: 1px solid #dfe3d9;

  border-radius: 10px;

  background: white;

  color: #68725f;

  font-size: 11px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.close-detail-button:hover {
  background: #718667;

  border-color: #718667;

  color: white;
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

  .table-head,
  .order-row {
    grid-template-columns:
      1.15fr
      1.25fr
      1.35fr
      0.9fr
      1.05fr;

    column-gap: 10px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {

  .dashboard-page {
    display: block;

    width: 100%;

    max-width: 100%;

    overflow-x: hidden;
  }


  /* SIDEBAR */

  .sidebar {
    width: 270px;

    min-height: 100vh;

    height: 100vh;

    position: fixed;

    top: 0;
    left: 0;

    transform: translateX(-100%);

    transition: transform 0.25s ease;

    border-right: 1px solid #e3e6d5;

    border-bottom: none;

    box-shadow:
      10px 0 30px rgba(50,50,40,0.08);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }


  /* BRAND */

  .brand {
    height: 90px;

    justify-content: center;

    padding-left: 0;
  }

  .brand img {
    width: 155px;
  }


  /* MENU */

  .menu {
    padding: 25px 18px;

    display: block;

    overflow: visible;
  }

  .menu-title {
    display: block;
  }

  .second-title {
    display: block;
  }

  .menu-item {
    width: 100%;

    height: 48px;

    padding: 0 16px;

    margin-bottom: 7px;
  }


  /* SIDEBAR BOTTOM */

  .sidebar-bottom {
    display: block;
  }


  /* MAIN */

  .main-content {
    width: 100%;

    max-width: 100%;

    margin-left: 0;

    overflow-x: hidden;
  }


  /* TOPBAR */

  .topbar {
    width: 100%;

    height: 78px;

    padding: 0 15px;

    gap: 12px;

    position: relative;

    z-index: 50;
  }

  .hamburger-button {
    display: flex;

    flex-shrink: 0;
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
    font-size: 25px;

    white-space: nowrap;
  }

  .topbar-right {
    gap: 8px;

    flex-shrink: 0;
  }

  .top-avatar {
    width: 36px;
    height: 36px;

    font-size: 12px;
  }

  .top-admin-info,
  .arrow {
    display: none;
  }


  /* OVERLAY */

  .mobile-overlay {
    position: fixed;

    inset: 0;

    z-index: 90;

    background: rgba(30,35,25,0.22);
  }


  /* CONTENT */

  .content {
    width: 100%;

    max-width: 100%;

    padding: 20px 15px 25px;

    overflow-x: hidden;
  }


  /* INTRO */

  .page-intro {
    display: block;

    margin-bottom: 20px;
  }

  .intro-label {
    font-size: 8px;

    letter-spacing: 1.5px;
  }

  .page-intro h2 {
    font-size: 27px;

    margin: 6px 0 5px;
  }

  .page-intro p {
    font-size: 11px;

    line-height: 1.5;
  }


  /* STATS */

  .stats-grid {
    grid-template-columns: 1fr 1fr;

    gap: 10px;

    margin-bottom: 15px;
  }

  .stat-card {
    min-height: 135px;

    padding: 15px;

    border-radius: 16px;
  }

  .stat-icon {
    width: 37px;
    height: 37px;

    border-radius: 10px;

    font-size: 16px;
  }

  .stat-badge {
    padding: 4px 7px;

    font-size: 7px;
  }

  .stat-label {
    margin: 12px 0 4px;

    font-size: 10px;
  }

  .stat-card h3 {
    font-size: 22px;
  }

  .price-stat {
    font-size: 15px !important;
  }

  .stat-footer {
    font-size: 8px;

    margin-top: 4px;
  }


  /* ORDER PANEL */

  .order-panel {
    width: 100%;

    padding: 15px;

    border-radius: 17px;
  }

  .panel-header {
    display: block;

    margin-bottom: 15px;
  }

  .panel-header h2 {
    font-size: 19px;
  }

  .panel-header p {
    font-size: 9px;
  }

  .order-tools {
    width: 100%;

    display: flex;

    margin-top: 13px;

    gap: 7px;
  }

  .search-box {
    width: 100%;

    flex: 1;

    min-width: 0;

    height: 38px;
  }


  /* HIDE DESKTOP TABLE */

  .orders-table {
    display: none;
  }


  /* SHOW MOBILE */

  .mobile-orders {
    display: block;
  }


  /* FOOTER */

  .dashboard-footer {
    flex-direction: column;

    gap: 8px;

    padding-top: 22px;

    font-size: 9px;
  }


  /* MODAL */

  .modal-overlay {
    align-items: flex-end;

    padding: 0;
  }

  .detail-modal {
    max-width: 100%;

    max-height: 92vh;

    padding: 22px 17px;

    border-radius: 22px 22px 0 0;
  }

}


/* =========================
   SMALL PHONE
========================= */

@media (max-width: 500px) {

  .topbar {
    height: 70px;

    padding: 0 12px;
  }

  .hamburger-button {
    width: 36px;
    height: 36px;
  }

  .hamburger-button span {
    width: 17px;
  }

  .page-heading h1 {
    font-size: 22px;
  }

  .small-title {
    font-size: 7px;
  }

  .top-avatar {
    width: 34px;
    height: 34px;
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


  /* STATS */

  .stats-grid {
    grid-template-columns: 1fr 1fr;

    gap: 8px;
  }

  .stat-card {
    min-height: 125px;

    padding: 12px;
  }

  .stat-icon {
    width: 34px;
    height: 34px;

    font-size: 14px;
  }

  .stat-badge {
    display: none;
  }

  .stat-label {
    font-size: 9px;

    margin-top: 10px;
  }

  .stat-card h3 {
    font-size: 20px;
  }

  .price-stat {
    font-size: 13px !important;
  }

  .stat-footer {
    font-size: 7px;
  }


  /* TOOLS */

  .order-tools {
    flex-direction: column;
  }

  .search-box {
    width: 100%;

    flex: none;
  }


  /* ORDER CARD */

  .mobile-order-card {
    padding: 13px;

    border-radius: 15px;
  }

  .mobile-order-top {
    align-items: center;
  }

  .mobile-order-icon {
    width: 35px;
    height: 35px;
  }

  .mobile-order-id strong {
    font-size: 11px;
  }

  .mobile-order-id span {
    font-size: 8px;
  }

  .customer-avatar {
    width: 35px;
    height: 35px;
  }

  .customer-info strong {
    font-size: 11px;
  }

  .customer-info span {
    font-size: 8px;
  }

  .mobile-item {
    font-size: 9px;
  }

  .mobile-item > strong {
    font-size: 9px;
  }

  .mobile-product-name strong {
    font-size: 9px;
  }

  .mobile-product-name span {
    font-size: 8px;
  }

  .mobile-address span {
    font-size: 8px;
  }

  .mobile-address strong {
    font-size: 9px;
  }

  .mobile-total span {
    font-size: 8px;
  }

  .mobile-total strong {
    font-size: 12px;
  }

  .mobile-detail-button {
    height: 33px;

    padding: 0 10px;

    font-size: 9px;
  }


  /* MODAL */

  .detail-modal {
    padding: 19px 14px;
  }

  .modal-header h2 {
    font-size: 22px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    min-height: 60px;
  }

  .detail-product {
    padding: 11px;
  }

  .detail-product-icon {
    width: 38px;
    height: 38px;
  }

  .detail-product-info strong {
    font-size: 10px;
  }

  .detail-product-info span {
    font-size: 8px;
  }

  .detail-product-total {
    font-size: 9px;
  }

  .detail-total {
    padding: 14px;
  }

  .detail-total span {
    font-size: 9px;
  }

  .detail-total strong {
    font-size: 14px;
  }

}


/* =========================
   VERY SMALL PHONE
========================= */

@media (max-width: 360px) {

  .page-heading h1 {
    font-size: 20px;
  }

  .topbar-right {
    gap: 5px;
  }

  .top-avatar {
    width: 32px;
    height: 32px;
  }

  .stats-grid {
    gap: 7px;
  }

  .stat-card {
    padding: 10px;
  }

  .stat-card h3 {
    font-size: 18px;
  }

  .order-panel {
    padding: 12px;
  }

  .detail-button {
    padding: 0 9px;

    font-size: 8px;
  }

}

</style>