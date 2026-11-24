
<template>
  <div class="dashboard-page">

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar-open': menuOpen }">
      <div class="brand">
        <img src="../assets/images/logo.webp" alt="Jericho & Nesya" />
      </div>

      <nav class="menu">
        <p class="menu-title">MENU UTAMA</p>

        <router-link to="/petugas/dashboard" class="menu-item" @click="closeMenu">
          <span class="menu-icon">⌂</span>
          Dashboard
        </router-link>

        <router-link to="/petugas/pesanan" class="menu-item" @click="closeMenu">
          <span class="menu-icon">🛍</span>
          Pesanan
        </router-link>

        <router-link to="/petugas/produk" class="menu-item" @click="closeMenu">
          <span class="menu-icon">📦</span>
          Produk
        </router-link>
      </nav>

      <div class="sidebar-bottom">
        <div class="user-profile">
          <div class="profile-avatar">{{ initialNama }}</div>
          <div class="profile-info">
            <strong>{{ namaPetugas }}</strong>
            <span>Petugas</span>
          </div>
        </div>

        <button class="logout-button" @click="logout">
          <span>↪</span> Logout
        </button>
      </div>
    </aside>

    <!-- OVERLAY MOBILE -->
    <div v-if="menuOpen" class="sidebar-overlay" @click="closeMenu"></div>

    <!-- MAIN -->
    <main class="main-content">

      <!-- TOPBAR -->
      <header class="topbar">
        <button class="hamburger" @click="toggleMenu" aria-label="Buka menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="page-heading">
          <span class="small-title">JERICHO & NESYA</span>
          <h1>Data Produk</h1>
        </div>

        <div class="top-admin">
          <div class="top-avatar">{{ initialNama }}</div>
          <div class="top-admin-info">
            <strong>{{ namaPetugas }}</strong>
            <span>Petugas</span>
          </div>
        </div>
      </header>

      <!-- CONTENT -->
      <section class="content">

        <!-- INTRO -->
        <div class="page-intro">
          <div>
            <span class="intro-label">INFORMASI TOKO</span>
            <h2>Daftar Produk</h2>
            <p>
              Lihat informasi produk dan pantau ketersediaan stok
              Jericho & Nesya.
            </p>
          </div>

          <div class="intro-icon">📦</div>
        </div>

        <!-- STATISTIK -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon green">📦</div>
              <span class="stat-change">Produk</span>
            </div>
            <p class="stat-label">Total Produk</p>
            <h3>{{ totalProduk }}</h3>
            <span class="stat-footer">produk tersedia di toko</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon peach">▤</div>
              <span class="stat-change">Persediaan</span>
            </div>
            <p class="stat-label">Total Stok</p>
            <h3>{{ totalStok }}</h3>
            <span class="stat-footer">jumlah seluruh stok produk</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon pink">!</div>
              <span class="stat-change warning">Perhatian</span>
            </div>
            <p class="stat-label">Stok Menipis</p>
            <h3>{{ stokMenipis }}</h3>
            <span class="stat-footer">produk dengan stok 1–5</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon cream">✓</div>
              <span class="stat-change">Kategori</span>
            </div>
            <p class="stat-label">Total Kategori</p>
            <h3>{{ totalKategori }}</h3>
            <span class="stat-footer">kategori produk</span>
          </div>
        </div>

        <!-- DAFTAR PRODUK -->
        <div class="panel product-panel">

          <div class="panel-header">
            <div>
              <h2>Daftar Produk</h2>
              <p>Informasi produk dan ketersediaan stok</p>
            </div>

            <span class="readonly-badge">
              <span class="readonly-dot"></span>
              Mode Lihat
            </span>
          </div>

          <!-- SEARCH -->
          <div class="toolbar">
            <div class="search-box">
              <span>⌕</span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama atau kategori produk..."
              />
            </div>

            <button class="refresh-button" @click="getProduk" :disabled="loading">
              ↻ Refresh
            </button>
          </div>

          <!-- LOADING -->
          <div v-if="loading" class="empty-data">
            Memuat data produk...
          </div>

          <!-- ERROR -->
          <div v-else-if="errorMessage" class="empty-data">
            <span>{{ errorMessage }}</span>
            <button class="retry-button" @click="getProduk">
              Coba Lagi
            </button>
          </div>

          <!-- TABLE -->
          <div v-else class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>PRODUK</th>
                  <th>KATEGORI</th>
                  <th>HARGA</th>
                  <th>STOK</th>
                  <th>TERJUAL</th>
                  <th>KETERANGAN</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="product in filteredProduk" :key="product.id">
                  <td>
                    <div class="product-info">
                      <img
                        :src="product.image || fallbackImage"
                        :alt="product.name"
                        @error="handleImageError"
                      />
                      <div>
                        <strong>{{ product.name }}</strong>
                        <span>{{ product.description || 'Tidak ada deskripsi' }}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span class="category-badge">
                      {{ product.category }}
                    </span>
                  </td>

                  <td class="price">
                    {{ formatRupiah(product.price) }}
                  </td>

                  <td>
                    <strong class="stock-number">{{ product.stock }}</strong>
                  </td>

                  <td>{{ product.sold }}</td>

                  <td>
                    <span
                      class="stock-badge"
                      :class="getStockClass(product.stock)"
                    >
                      {{ getStockLabel(product.stock) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="filteredProduk.length === 0" class="empty-data">
              Produk tidak ditemukan.
            </div>
          </div>

          <!-- FOOTER TABLE -->
          <div class="table-footer" v-if="!loading && !errorMessage">
            <span>
              Menampilkan {{ filteredProduk.length }} dari {{ totalProduk }} produk
            </span>
            <span>Data produk toko Jericho & Nesya</span>
          </div>

        </div>

        <!-- FOOTER -->
        <footer class="dashboard-footer">
          <span>© 2026 Jericho & Nesya</span>
          <span>Good Ingredients, Brighter Days ♥</span>
        </footer>

      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import api from "../api/axios"

const router = useRouter()

const menuOpen = ref(false)
const produk = ref([])
const loading = ref(false)
const errorMessage = ref("")
const searchQuery = ref("")

const BACKEND_URL = "http://192.168.69.6:8081"
const fallbackImage = "https://placehold.co/100x100/f1f3df/718667?text=Produk"

// =========================
// PROFIL PETUGAS
// =========================

const namaPetugas = computed(() => {
  return localStorage.getItem("nama") || "Petugas"
})

const initialNama = computed(() => {
  return namaPetugas.value.charAt(0).toUpperCase()
})

// =========================
// MENU
// =========================

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// =========================
// LOGOUT
// =========================

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  localStorage.removeItem("nama")

  router.push("/login")
}

// =========================
// GAMBAR PRODUK
// =========================

function getImageUrl(image) {
  if (!image) return ""

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image
      .replace("localhost:8081", "192.168.69.6:8081")
      .replace("127.0.0.1:8081", "192.168.69.6:8081")
  }

  const cleanImage = image.replace(/^\/+/, "")

  if (cleanImage.startsWith("uploads/")) {
    return `${BACKEND_URL}/${cleanImage}`
  }

  return `${BACKEND_URL}/uploads/${cleanImage}`
}

function handleImageError(event) {
  event.target.src = fallbackImage
}

// =========================
// AMBIL DATA PRODUK
// =========================

function getResponseData(response) {
  const data = response.data

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.produk)) return data.produk
  if (Array.isArray(data?.result)) return data.result

  return []
}

async function getProduk() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await api.get("/produk")
    const data = getResponseData(response)

    produk.value = data.map(product => ({
      id: product.id_produk,
      name: product.nama_produk || "-",
      description: product.deskripsi || "",
      category: product.kategori || "Tanpa Kategori",
      price: Number(product.harga) || 0,
      stock: Number(product.stok) || 0,
      sold: Number(product.terjual) || 0,
      image: getImageUrl(product.gambar)
    }))
  } catch (error) {
    console.error("Gagal mengambil produk:", error)
    errorMessage.value = "Gagal memuat data produk. Periksa koneksi server."
  } finally {
    loading.value = false
  }
}

// =========================
// PENCARIAN
// =========================

const filteredProduk = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim()

  if (!keyword) return produk.value

  return produk.value.filter(product => {
    return (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    )
  })
})

// =========================
// STATISTIK
// =========================

const totalProduk = computed(() => produk.value.length)

const totalStok = computed(() => {
  return produk.value.reduce((total, product) => {
    return total + product.stock
  }, 0)
})

const stokMenipis = computed(() => {
  return produk.value.filter(product => {
    return product.stock > 0 && product.stock <= 5
  }).length
})

const totalKategori = computed(() => {
  return new Set(
    produk.value.map(product => product.category)
  ).size
})

// =========================
// STATUS STOK
// =========================

function getStockClass(stock) {
  if (stock <= 0) return "out-stock"
  if (stock <= 5) return "low-stock"
  return "available-stock"
}

function getStockLabel(stock) {
  if (stock <= 0) return "Habis"
  if (stock <= 5) return "Stok Menipis"
  return "Tersedia"
}

// =========================
// FORMAT RUPIAH
// =========================

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(value) || 0)
}

// =========================
// LOAD
// =========================

onMounted(() => {
  getProduk()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  overflow-x: hidden;
  background: #faf9f5;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}

/* SIDEBAR */

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

.brand {
  height: 125px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid #e3e6d5;
}

.brand img {
  width: 185px;
  object-fit: contain;
}

/* MENU */

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

.menu-item.router-link-active {
  background: #718667;
  color: white;
  box-shadow: 0 8px 18px rgba(113,134,103,0.18);
}

.menu-icon {
  width: 25px;
  display: flex;
  justify-content: center;
  font-size: 18px;
}

/* PROFILE */

.sidebar-bottom {
  padding: 20px;
  border-top: 1px solid #e3e6d5;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.profile-avatar,
.top-avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #718667;
  color: white;
  font-weight: bold;
}

.profile-info,
.top-admin-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-info strong,
.top-admin-info strong {
  font-size: 13px;
  color: #52624d;
}

.profile-info span,
.top-admin-info span {
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
}

/* MAIN */

.main-content {
  width: calc(100% - 270px);
  min-height: 100vh;
  margin-left: 270px;
  overflow-x: hidden;
}

/* TOPBAR */

.topbar {
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: #fffdfb;
  border-bottom: 1px solid #eeeeea;
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
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  color: #526b45;
}

.top-admin {
  display: flex;
  align-items: center;
  gap: 11px;
}

.top-avatar {
  width: 40px;
  height: 40px;
}

.hamburger {
  display: none;
}

/* CONTENT */

.content {
  padding: 40px 50px 30px;
  max-width: 1600px;
}

/* INTRO */

.page-intro {
  min-height: 155px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;
  border-radius: 23px;
  background: #fce6e4;
  border: 1px solid #f5d8d5;
}

.intro-label {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #bd8c88;
}

.page-intro h2 {
  margin: 9px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  color: #617657;
}

.page-intro p {
  margin: 0;
  color: #827b79;
  font-size: 13px;
}

.intro-icon {
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: rgba(255,255,255,0.6);
  font-size: 38px;
}

/* STATISTICS */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 25px;
}

.stat-card {
  padding: 23px;
  min-height: 175px;
  background: white;
  border: 1px solid #eeeeea;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(80,80,60,0.035);
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

.green { background: #e8efdf; }
.pink { background: #fce7e5; }
.peach { background: #f9eadc; }
.cream { background: #f5f0d8; }

.stat-change {
  padding: 5px 9px;
  border-radius: 20px;
  background: #eaf2e5;
  color: #708966;
  font-size: 10px;
  font-weight: bold;
}

.stat-change.warning {
  background: #fff1df;
  color: #b17d4c;
}

.stat-label {
  margin: 17px 0 4px;
  font-size: 12px;
  color: #8d9189;
}

.stat-card h3 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  color: #52634b;
}

.stat-footer {
  display: block;
  margin-top: 6px;
  font-size: 10px;
  color: #b0b1ac;
}

/* PRODUCT PANEL */

.product-panel {
  margin-top: 25px;
  padding: 27px;
  background: white;
  border: 1px solid #eeeeea;
  border-radius: 22px;
  box-shadow: 0 8px 25px rgba(80,80,60,0.035);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 23px;
}

.panel-header h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  color: #52634b;
}

.panel-header p {
  margin: 6px 0 0;
  font-size: 11px;
  color: #a0a29d;
}

.readonly-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 20px;
  background: #eaf2e5;
  color: #718667;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap;
}

.readonly-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #718667;
}

/* TOOLBAR */

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.search-box {
  width: 100%;
  max-width: 430px;
  height: 43px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border: 1px solid #e9eae4;
  border-radius: 11px;
  background: #fcfcf9;
  color: #83917a;
}

.search-box span {
  font-size: 22px;
}

.search-box input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #52634b;
  font-size: 12px;
}

.search-box input::placeholder {
  color: #b4b8af;
}

.refresh-button {
  height: 43px;
  padding: 0 17px;
  border: 1px solid #dfe6d8;
  border-radius: 11px;
  background: #f1f5eb;
  color: #64795b;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* TABLE */

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
}

thead {
  background: #f7f8f2;
}

th {
  padding: 15px 13px;
  color: #899381;
  font-size: 9px;
  letter-spacing: 1px;
  text-align: left;
  white-space: nowrap;
}

td {
  padding: 15px 13px;
  border-bottom: 1px solid #f0f0ed;
  color: #73796e;
  font-size: 11px;
}

tbody tr:hover {
  background: #fcfcf9;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 190px;
}

.product-info img {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 11px;
  background: #f1f3df;
}

.product-info div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.product-info strong {
  color: #52634b;
  font-size: 12px;
}

.product-info span {
  max-width: 180px;
  overflow: hidden;
  color: #a5a89f;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  background: #f2f3e9;
  color: #78856d;
  font-size: 10px;
}

.price {
  color: #64795b;
  font-weight: bold;
  white-space: nowrap;
}

.stock-number {
  color: #52634b;
  font-size: 13px;
}

.stock-badge {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 20px;
  font-size: 9px;
  font-weight: bold;
  white-space: nowrap;
}

.available-stock {
  background: #e7f1e3;
  color: #66805d;
}

.low-stock {
  background: #fff1df;
  color: #b17d4c;
}

.out-stock {
  background: #fce7e5;
  color: #bd7772;
}

/* EMPTY */

.empty-data {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #aaa;
  font-size: 12px;
  text-align: center;
}

.retry-button {
  border: none;
  background: #718667;
  color: white;
  padding: 9px 17px;
  border-radius: 9px;
  cursor: pointer;
}

/* TABLE FOOTER */

.table-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 18px;
  color: #a4a69f;
  font-size: 10px;
}

/* FOOTER */

.dashboard-footer {
  display: flex;
  justify-content: space-between;
  padding: 30px 5px 5px;
  color: #aaa;
  font-size: 10px;
}

/* TABLET */

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
    grid-template-columns: repeat(2, 1fr);
  }
}

/* MOBILE */

@media (max-width: 800px) {
  .dashboard-page {
    display: block;
  }

  .sidebar {
    width: 270px;
    height: 100vh;
    min-height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 8px 0 25px rgba(0,0,0,0.08);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.25);
    z-index: 90;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
  }

  .topbar {
    height: 72px;
    padding: 0 16px;
    gap: 12px;
  }

  .hamburger {
    display: block;
    width: 42px;
    height: 42px;
    padding: 9px;
    flex-shrink: 0;
    border: 1px solid #e4e4e0;
    border-radius: 11px;
    background: white;
    cursor: pointer;
  }

  .hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    margin: 5px 0;
    background: #617558;
  }

  .page-heading {
    flex: 1;
    min-width: 0;
  }

  .small-title {
    font-size: 8px;
  }

  .page-heading h1 {
    font-size: 21px;
  }

  .top-admin-info {
    display: none;
  }

  .content {
    padding: 18px 15px 25px;
  }

  .page-intro {
    min-height: 135px;
    padding: 22px;
  }

  .page-intro h2 {
    font-size: 25px;
  }

  .page-intro p {
    max-width: 230px;
    line-height: 1.5;
    font-size: 11px;
  }

  .intro-icon {
    width: 55px;
    height: 55px;
    font-size: 25px;
    border-radius: 17px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 18px;
  }

  .stat-card {
    min-height: 150px;
    padding: 16px;
  }

  .stat-card h3 {
    font-size: 24px;
  }

  .product-panel {
    margin-top: 18px;
    padding: 18px;
  }

  .toolbar {
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .refresh-button {
    flex-shrink: 0;
  }

  .table-footer {
    flex-direction: column;
  }

  .dashboard-footer {
    flex-direction: column;
    gap: 8px;
  }
}

/* HP KECIL */

@media (max-width: 500px) {
  .topbar {
    height: 64px;
    padding: 0 12px;
  }

  .hamburger {
    width: 38px;
    height: 38px;
    padding: 8px;
  }

  .page-heading h1 {
    font-size: 17px;
  }

  .content {
    padding: 14px 12px 20px;
  }

  .page-intro {
    padding: 18px;
  }

  .page-intro h2 {
    font-size: 22px;
  }

  .intro-icon {
    display: none;
  }

  .stats-grid {
    gap: 10px;
  }

  .stat-card {
    min-height: 140px;
    padding: 14px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .stat-change {
    font-size: 8px;
  }

  .stat-label {
    font-size: 10px;
  }

  .stat-card h3 {
    font-size: 22px;
  }

  .stat-footer {
    font-size: 9px;
  }

  .product-panel {
    padding: 14px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 18px;
  }

  .readonly-badge {
    padding: 7px 9px;
    font-size: 9px;
  }

  .toolbar {
    flex-direction: column;
  }

  .refresh-button {
    width: 100%;
  }
}
</style>