
<template>
  <div class="dashboard-page">

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar-open': menuOpen }">

      <div class="brand">
        <img src="../assets/images/logo.webp" alt="Jericho & Nesya" />
      </div>

      <nav class="menu">
        <p class="menu-title">MENU UTAMA</p>

        <router-link
          to="/petugas/dashboard"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">⌂</span>
          Dashboard
        </router-link>

        <router-link
          to="/petugas/pesanan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">🛍</span>
          Pesanan
        </router-link>

        <router-link
  to="/petugas/produk"
  class="menu-item"
  @click="closeMenu"
>
  <span class="menu-icon">📦</span>
  Produk
</router-link>

      </nav>

      <div class="sidebar-bottom">
        <div class="user-profile">
          <div class="profile-avatar">
            {{ initialNama }}
          </div>

          <div class="profile-info">
            <strong>{{ namaPetugas }}</strong>
            <span>Petugas</span>
          </div>
        </div>

        <button class="logout-button" @click="logout">
          <span>↪</span>
          Logout
        </button>
      </div>

    </aside>

    <!-- OVERLAY HP -->
    <div
      v-if="menuOpen"
      class="sidebar-overlay"
      @click="closeMenu"
    ></div>

    <!-- MAIN CONTENT -->
    <main class="main-content">

      <!-- TOPBAR -->
      <header class="topbar">

        <button
          class="hamburger"
          @click="toggleMenu"
          aria-label="Buka menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="page-heading">
          <span class="small-title">JERICHO & NESYA</span>
          <h1>Dashboard Petugas</h1>
        </div>

        <div class="top-admin">
          <div class="top-avatar">
            {{ initialNama }}
          </div>

          <div class="top-admin-info">
            <strong>{{ namaPetugas }}</strong>
            <span>Petugas</span>
          </div>
        </div>

      </header>

      <!-- CONTENT -->
      <section class="content">

        <!-- WELCOME -->
        <div class="welcome-box">

          <div class="welcome-text">
            <span class="welcome-label">
              SELAMAT DATANG 👋
            </span>

            <h2>Halo, Petugas!</h2>

            <p>
              Kelola pesanan pelanggan dan pantau proses
              penjualan toko Jericho & Nesya.
            </p>
          </div>

          <div class="welcome-decoration">
            <img
              src="../assets/images/cake-hero.jpg"
              alt="Cake"
            />
          </div>

        </div>

        <!-- STATISTIK -->
        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon green">🛍</div>
              <span class="stat-change">Semua</span>
            </div>

            <p class="stat-label">Total Pesanan</p>
            <h3>{{ totalPesanan }}</h3>
            <span class="stat-footer">seluruh pesanan</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon peach">◷</div>
              <span class="stat-change">Pending</span>
            </div>

            <p class="stat-label">Menunggu</p>
            <h3>{{ pesananMenunggu }}</h3>
            <span class="stat-footer">menunggu penanganan</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon pink">⚙</div>
              <span class="stat-change">Proses</span>
            </div>

            <p class="stat-label">Diproses</p>
            <h3>{{ pesananDiproses }}</h3>
            <span class="stat-footer">sedang dikerjakan</span>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <div class="stat-icon cream">✓</div>
              <span class="stat-change">Selesai</span>
            </div>

            <p class="stat-label">Pesanan Selesai</p>
            <h3>{{ pesananSelesai }}</h3>
            <span class="stat-footer">pesanan terselesaikan</span>
          </div>

        </div>

        <!-- KONTEN BAWAH -->
        <div class="dashboard-grid">

          <div class="panel orders-panel">

            <div class="panel-header">
              <div>
                <h2>Pesanan Terbaru</h2>
                <p>Pantau pesanan yang masuk</p>
              </div>

              <router-link to="/petugas/pesanan">
                Lihat semua →
              </router-link>
            </div>

            <div v-if="loading" class="empty-data">
              Memuat data pesanan...
            </div>

            <div v-else-if="errorPesanan" class="empty-data">
              Gagal memuat data pesanan.

              <button class="retry-button" @click="getPesanan">
                Coba lagi
              </button>
            </div>

            <template v-else>

              <div
                v-for="(order, index) in pesananTerbaru"
                :key="order.id_pesanan || index"
                class="order-item"
                @click="goToPesanan"
              >

                <div
                  class="order-avatar"
                  :class="getAvatarClass(index)"
                >
                  {{ getInitial(order) }}
                </div>

                <div class="order-info">
                  <strong>{{ getCustomerName(order) }}</strong>

                  <span>
                    #ORD-{{ formatOrderId(order.id_pesanan) }}
                  </span>
                </div>

                <div class="order-price">
                  <strong>
                    {{ formatRupiah(order.total_pesanan) }}
                  </strong>

                  <span
                    class="status"
                    :class="getStatusClass(order)"
                  >
                    {{ getStatus(order) }}
                  </span>
                </div>

              </div>

              <div
                v-if="pesananTerbaru.length === 0"
                class="empty-data"
              >
                Belum ada pesanan.
              </div>

            </template>

          </div>

          <!-- RINGKASAN STATUS -->
          <div class="panel status-panel">

            <div class="panel-header">
              <div>
                <h2>Ringkasan Pesanan</h2>
                <p>Status seluruh pesanan</p>
              </div>
            </div>

            <div class="summary-item">
              <div class="summary-label">
                <span class="dot waiting"></span>
                Menunggu
              </div>
              <strong>{{ pesananMenunggu }}</strong>
            </div>

            <div class="progress-track">
              <div
                class="progress waiting-progress"
                :style="{ width: persentase(pesananMenunggu) + '%' }"
              ></div>
            </div>

            <div class="summary-item">
              <div class="summary-label">
                <span class="dot processing"></span>
                Diproses
              </div>
              <strong>{{ pesananDiproses }}</strong>
            </div>

            <div class="progress-track">
              <div
                class="progress processing-progress"
                :style="{ width: persentase(pesananDiproses) + '%' }"
              ></div>
            </div>

            <div class="summary-item">
              <div class="summary-label">
                <span class="dot completed"></span>
                Selesai
              </div>
              <strong>{{ pesananSelesai }}</strong>
            </div>

            <div class="progress-track">
              <div
                class="progress completed-progress"
                :style="{ width: persentase(pesananSelesai) + '%' }"
              ></div>
            </div>

            <div class="summary-total">
              <span>Total Pesanan</span>
              <strong>{{ totalPesanan }}</strong>
            </div>

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
const pesanan = ref([])
const loading = ref(true)
const errorPesanan = ref(false)

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
// NAVIGASI PESANAN PETUGAS
// =========================

function goToPesanan() {
  menuOpen.value = false
  router.push("/petugas/pesanan")
}

// =========================
// AMBIL DATA PESANAN
// =========================

function getResponseData(response) {
  if (Array.isArray(response.data)) {
    return response.data
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data
  }

  if (Array.isArray(response.data?.pesanan)) {
    return response.data.pesanan
  }

  if (Array.isArray(response.data?.result)) {
    return response.data.result
  }

  return []
}

async function getPesanan() {
  loading.value = true
  errorPesanan.value = false

  try {
    const response = await api.get("/pesanan")
    pesanan.value = getResponseData(response)
  } catch (error) {
    console.error("Gagal mengambil pesanan:", error)
    errorPesanan.value = true
  } finally {
    loading.value = false
  }
}

// =========================
// NORMALISASI STATUS
// =========================

function getStatus(order) {
  return String(
    order.status_pesanan ||
    order.status ||
    "Menunggu"
  ).trim()
}

function normalisasiStatus(order) {
  return getStatus(order)
    .toLowerCase()
    .replace(/[\s_-]+/g, "")
}

// =========================
// HITUNG STATISTIK
// =========================

const totalPesanan = computed(() => {
  return pesanan.value.length
})

const pesananMenunggu = computed(() => {
  return pesanan.value.filter(order => {
    return normalisasiStatus(order).includes("menunggu")
  }).length
})

const pesananDiproses = computed(() => {
  return pesanan.value.filter(order => {
    const status = normalisasiStatus(order)

    return (
      status.includes("proses") ||
      status.includes("dikirim")
    )
  }).length
})

const pesananSelesai = computed(() => {
  return pesanan.value.filter(order => {
    const status = normalisasiStatus(order)

    return (
      status.includes("selesai") ||
      status.includes("diterima")
    )
  }).length
})

// =========================
// PERSENTASE STATUS
// =========================

function persentase(jumlah) {
  if (!totalPesanan.value) return 0

  return Math.round(
    (jumlah / totalPesanan.value) * 100
  )
}

// =========================
// PESANAN TERBARU
// =========================

const pesananTerbaru = computed(() => {
  return [...pesanan.value]
    .sort((a, b) => {
      const tanggalA = new Date(
        a.tanggal_pesanan || 0
      ).getTime()

      const tanggalB = new Date(
        b.tanggal_pesanan || 0
      ).getTime()

      return tanggalB - tanggalA
    })
    .slice(0, 5)
})

// =========================
// NAMA PELANGGAN
// =========================

function getCustomerName(order) {
  if (order.nama_pelanggan) {
    return order.nama_pelanggan
  }

  if (
    typeof order.pelanggan === "object" &&
    order.pelanggan?.nama_pelanggan
  ) {
    return order.pelanggan.nama_pelanggan
  }

  if (typeof order.pelanggan === "string") {
    return order.pelanggan
  }

  if (order.nama) {
    return order.nama
  }

  return `Pelanggan #${order.id_pelanggan || "-"}`
}

// =========================
// AVATAR
// =========================

function getInitial(order) {
  return getCustomerName(order)
    .charAt(0)
    .toUpperCase()
}

function getAvatarClass(index) {
  const classes = [
    "pink-avatar",
    "green-avatar",
    "peach-avatar",
    "yellow-avatar"
  ]

  return classes[index % classes.length]
}

// =========================
// STATUS CLASS
// =========================

function getStatusClass(order) {
  const status = normalisasiStatus(order)

  if (
    status.includes("selesai") ||
    status.includes("diterima")
  ) {
    return "success"
  }

  if (
    status.includes("proses") ||
    status.includes("dikirim")
  ) {
    return "processing-status"
  }

  return "pending"
}

// =========================
// FORMAT ID
// =========================

function formatOrderId(id) {
  if (id === undefined || id === null) {
    return "00000"
  }

  return String(id).padStart(5, "0")
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
  getPesanan()
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

/* WELCOME */

.welcome-box {
  min-height: 165px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 45px;
  overflow: hidden;
  border-radius: 25px;
  background: #fce6e4;
  border: 1px solid #f5d8d5;
}

.welcome-text {
  position: relative;
  z-index: 2;
}

.welcome-label {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #bd8c88;
}

.welcome-text h2 {
  margin: 8px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  color: #617657;
}

.welcome-text p {
  margin: 0;
  font-size: 14px;
  color: #827b79;
}

.welcome-decoration img {
  width: 285px;
  height: 150px;
  object-fit: cover;
  border-radius: 20px;
  transform: rotate(-5deg);
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
  min-height: 180px;
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
  font-size: 20px;
}

.green { background: #e8efdf; }
.pink { background: #fce7e5; }
.peach { background: #f9eadc; }
.cream { background: #f5f0d8; }

.stat-change {
  padding: 5px 8px;
  border-radius: 20px;
  background: #eaf2e5;
  color: #708966;
  font-size: 10px;
  font-weight: bold;
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

/* PANELS */

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 25px;
  margin-top: 25px;
}

.panel {
  min-width: 0;
  background: white;
  border: 1px solid #eeeeea;
  border-radius: 22px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(80,80,60,0.035);
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 15px;
}

.panel-header h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  color: #52634b;
}

.panel-header p {
  margin: 5px 0 0;
  font-size: 11px;
  color: #a0a29d;
}

.panel-header a {
  color: #6c8063;
  text-decoration: none;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
}

/* ORDERS */

.order-item {
  min-height: 75px;
  display: flex;
  align-items: center;
  gap: 13px;
  border-bottom: 1px solid #f0f0ed;
  cursor: pointer;
  transition: 0.2s;
}

.order-item:hover {
  background: #fafbf7;
}

.order-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: bold;
}

.pink-avatar {
  background: #f9dedd;
  color: #b87976;
}

.green-avatar {
  background: #e5eedf;
  color: #69815e;
}

.peach-avatar {
  background: #f5e5d7;
  color: #a87b58;
}

.yellow-avatar {
  background: #f1edd5;
  color: #95874e;
}

.order-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.order-info strong {
  font-size: 13px;
  color: #4e574a;
}

.order-info span {
  font-size: 10px;
  color: #aaa;
}

.order-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  flex-shrink: 0;
}

.order-price strong {
  font-size: 12px;
  color: #59664f;
}

.status {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 9px;
  font-weight: bold;
}

.pending {
  background: #fff1df;
  color: #b17d4c;
}

.success {
  background: #e7f1e3;
  color: #66805d;
}

.processing-status {
  background: #e5edf9;
  color: #6481a5;
}

/* SUMMARY */

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  font-size: 12px;
  color: #697263;
}

.summary-label {
  display: flex;
  align-items: center;
  gap: 9px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.waiting { background: #e5ad70; }
.processing { background: #8aa2c3; }
.completed { background: #83a47a; }

.progress-track {
  height: 7px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 20px;
  background: #f0f0eb;
}

.progress {
  height: 100%;
  border-radius: 20px;
  transition: width 0.3s;
}

.waiting-progress { background: #e5ad70; }
.processing-progress { background: #8aa2c3; }
.completed-progress { background: #83a47a; }

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 18px;
  border-top: 1px solid #eeeeea;
  color: #52634b;
  font-size: 13px;
  font-weight: bold;
}

/* EMPTY */

.empty-data {
  min-height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #aaa;
  font-size: 11px;
  text-align: center;
}

.retry-button {
  border: none;
  background: #718667;
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
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
  .sidebar { width: 230px; }

  .main-content {
    width: calc(100% - 230px);
    margin-left: 230px;
  }

  .content { padding: 30px; }

  .topbar { padding: 0 30px; }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/* HP */

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
    display: block;
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

  .welcome-box {
    min-height: 145px;
    padding: 22px;
    border-radius: 20px;
  }

  .welcome-text h2 {
    font-size: 27px;
  }

  .welcome-text p {
    font-size: 12px;
    line-height: 1.5;
    max-width: 250px;
  }

  .welcome-decoration img {
    width: 180px;
    height: 110px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 18px;
  }

  .stat-card {
    min-height: 150px;
    padding: 20px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 18px;
  }

  .panel {
    padding: 18px;
    border-radius: 18px;
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

  .small-title {
    font-size: 7px;
  }

  .content {
    padding: 14px 12px 20px;
  }

  .welcome-box {
    min-height: 135px;
    padding: 20px;
  }

  .welcome-decoration {
    display: none;
  }

  .welcome-text h2 {
    font-size: 24px;
  }

  .welcome-text p {
    font-size: 11px;
  }

  .stat-card {
    min-height: 140px;
    padding: 18px;
  }

  .stat-card h3 {
    font-size: 25px;
  }

  .panel {
    padding: 15px;
  }

  .panel-header h2 {
    font-size: 18px;
  }

  .order-item {
    gap: 8px;
  }

  .order-avatar {
    width: 36px;
    height: 36px;
  }

  .order-info strong {
    font-size: 11px;
  }

  .order-info span {
    font-size: 8px;
  }

  .order-price strong {
    font-size: 9px;
  }

  .status {
    font-size: 7px;
    padding: 3px 6px;
  }
}
</style>