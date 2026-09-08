<template>
  <div class="dashboard-page">

    <!-- =========================
         SIDEBAR
    ========================== -->
    <aside
      class="sidebar"
      :class="{ 'sidebar-open': menuOpen }"
    >

      <!-- LOGO -->
      <div class="brand">
        <img
          src="../assets/images/logo.webp"
          alt="Jericho & Nesya"
        />
      </div>

      <!-- MENU -->
      <nav class="menu">

        <p class="menu-title">MENU UTAMA</p>

        <router-link
          to="/dashboard"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">⌂</span>
          <span>Dashboard</span>
        </router-link>

        <router-link
          to="/produk"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">🍰</span>
          <span>Produk</span>
        </router-link>

        <router-link
          to="/pesanan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">🛍</span>
          <span>Pesanan</span>
        </router-link>

        <!-- HISTORY PELANGGAN -->
        <router-link
          to="/history-pelanggan"
          class="menu-item"
          @click="closeMenu"
        >
          <span class="menu-icon">♙</span>
          <span>History Pelanggan</span>
        </router-link>

        <p class="menu-title second-title">LAINNYA</p>

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
            <strong>Admin</strong>
            <span>Administrator</span>
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


    <!-- OVERLAY HP -->
    <div
      v-if="menuOpen"
      class="sidebar-overlay"
      @click="closeMenu"
    ></div>


    <!-- =========================
         MAIN CONTENT
    ========================== -->
    <main class="main-content">

      <!-- TOPBAR -->
      <header class="topbar">

        <!-- HAMBURGER -->
        <button
          class="hamburger"
          @click="toggleMenu"
          aria-label="Buka menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- JUDUL -->
        <div class="page-heading">
          <span class="small-title">
            JERICHO & NESYA
          </span>

          <h1>
            Dashboard
          </h1>
        </div>


        <!-- TOP RIGHT -->
        <div class="topbar-right">

          <div class="top-admin">

            <div class="top-avatar">
              A
            </div>

            <div class="top-admin-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <span class="arrow">⌄</span>

          </div>

        </div>

      </header>


      <!-- =========================
           CONTENT
      ========================== -->
      <section class="content">

        <!-- WELCOME -->
        <div class="welcome-box">

          <div class="welcome-text">

            <span class="welcome-label">
              SELAMAT DATANG KEMBALI 👋
            </span>

            <h2>
              Halo, Admin!
            </h2>

            <p>
              Kelola toko Jericho & Nesya dengan mudah
              melalui dashboard ini.
            </p>

          </div>

          <div class="welcome-decoration">
            <img
              src="../assets/images/cake-hero.jpg"
              alt="Cake"
            />
          </div>

        </div>


        <!-- =========================
             STATISTICS
        ========================== -->

        <div class="stats-grid">

          <div class="stat-card">

            <div class="stat-top">
              <div class="stat-icon green">
                🍰
              </div>

              <span class="stat-change positive">
                +12%
              </span>
            </div>

            <p class="stat-label">
              Total Produk
            </p>

            <h3>
              24
            </h3>

            <span class="stat-footer">
              dibanding bulan lalu
            </span>

          </div>


          <div class="stat-card">

            <div class="stat-top">
              <div class="stat-icon pink">
                🛍
              </div>

              <span class="stat-change positive">
                +8%
              </span>
            </div>

            <p class="stat-label">
              Pesanan Hari Ini
            </p>

            <h3>
              18
            </h3>

            <span class="stat-footer">
              pesanan masuk
            </span>

          </div>


          <div class="stat-card">

            <div class="stat-top">
              <div class="stat-icon peach">
                ♙
              </div>

              <span class="stat-change positive">
                +15%
              </span>
            </div>

            <p class="stat-label">
              Total Pelanggan
            </p>

            <h3>
              156
            </h3>

            <span class="stat-footer">
              pelanggan terdaftar
            </span>

          </div>


          <div class="stat-card">

            <div class="stat-top">
              <div class="stat-icon cream">
                Rp
              </div>

              <span class="stat-change positive">
                +21%
              </span>
            </div>

            <p class="stat-label">
              Pendapatan
            </p>

            <h3>
              Rp 4,8jt
            </h3>

            <span class="stat-footer">
              bulan ini
            </span>

          </div>

        </div>


        <!-- =========================
             LOWER CONTENT
        ========================== -->

        <div class="dashboard-grid">

          <!-- PESANAN -->
          <div class="panel orders-panel">

            <div class="panel-header">

              <div>
                <h2>Pesanan Terbaru</h2>

                <p>
                  Daftar pesanan yang baru masuk
                </p>
              </div>

              <router-link to="/pesanan">
                Lihat semua →
              </router-link>

            </div>


            <div
              class="order-item"
              @click="goToPesanan"
            >

              <div class="order-avatar pink-avatar">
                R
              </div>

              <div class="order-info">
                <strong>Rina Amelia</strong>

                <span>
                  #ORD-00124 • 2 Produk
                </span>
              </div>

              <div class="order-price">
                <strong>
                  Rp 185.000
                </strong>

                <span class="status pending">
                  Diproses
                </span>
              </div>

            </div>


            <div
              class="order-item"
              @click="goToPesanan"
            >

              <div class="order-avatar green-avatar">
                D
              </div>

              <div class="order-info">
                <strong>Dimas Pratama</strong>

                <span>
                  #ORD-00123 • 1 Produk
                </span>
              </div>

              <div class="order-price">
                <strong>
                  Rp 95.000
                </strong>

                <span class="status success">
                  Selesai
                </span>
              </div>

            </div>


            <div
              class="order-item"
              @click="goToPesanan"
            >

              <div class="order-avatar peach-avatar">
                S
              </div>

              <div class="order-info">
                <strong>Siti Rahma</strong>

                <span>
                  #ORD-00122 • 3 Produk
                </span>
              </div>

              <div class="order-price">
                <strong>
                  Rp 275.000
                </strong>

                <span class="status pending">
                  Diproses
                </span>
              </div>

            </div>


            <div
              class="order-item"
              @click="goToPesanan"
            >

              <div class="order-avatar yellow-avatar">
                F
              </div>

              <div class="order-info">
                <strong>Fajar Nugraha</strong>

                <span>
                  #ORD-00121 • 2 Produk
                </span>
              </div>

              <div class="order-price">
                <strong>
                  Rp 210.000
                </strong>

                <span class="status success">
                  Selesai
                </span>
              </div>

            </div>

          </div>


          <!-- PRODUK TERLARIS -->
          <div class="panel products-panel">

            <div class="panel-header">

              <div>
                <h2>Produk Terlaris</h2>

                <p>
                  Produk dengan penjualan tertinggi
                </p>
              </div>

              <router-link to="/produk">
                Semua →
              </router-link>

            </div>


            <div class="product-item">

              <div class="product-image">
                <img
                  src="../assets/images/brownies.jpg"
                  alt="Brownies"
                />
              </div>

              <div class="product-info">
                <strong>Brownies</strong>

                <span>
                  48 terjual
                </span>
              </div>

              <strong class="product-price">
                Rp 35K
              </strong>

            </div>


            <div class="product-item">

              <div class="product-image second">
                <img
                  src="../assets/images/matcha-cupcake.jpg"
                  alt="Matcha Cupcake"
                />
              </div>

              <div class="product-info">
                <strong>
                  Matcha Cupcake
                </strong>

                <span>
                  42 terjual
                </span>
              </div>

              <strong class="product-price">
                Rp 25K
              </strong>

            </div>


            <div class="product-item">

              <div class="product-image third">
                <img
                  src="../assets/images/oatmeal-cookies.jpg"
                  alt="Oatmeal Cookies"
                />
              </div>

              <div class="product-info">
                <strong>
                  Oatmeal Cookies
                </strong>

                <span>
                  36 terjual
                </span>
              </div>

              <strong class="product-price">
                Rp 30K
              </strong>

            </div>


            <div class="product-item">

              <div class="product-image fourth">
                <img
                  src="../assets/images/strawberry-cake.jpg"
                  alt="Strawberry Cake"
                />
              </div>

              <div class="product-info">
                <strong>
                  Strawberry Cake
                </strong>

                <span>
                  31 terjual
                </span>
              </div>

              <strong class="product-price">
                Rp 80K
              </strong>

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


<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function goToPesanan() {
  menuOpen.value = false
  router.push("/pesanan")
}

function logout() {
  menuOpen.value = false
  router.push("/login")
}
</script>


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

.menu-item.router-link-active {
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


/* =========================
   HAMBURGER
========================= */

.hamburger {
  display: none;

  width: 42px;
  height: 42px;

  padding: 9px;

  border: 1px solid #e4e4e0;

  border-radius: 11px;

  background: white;

  cursor: pointer;
}

.hamburger span {
  display: block;

  width: 100%;
  height: 2px;

  margin: 5px 0;

  background: #617558;

  border-radius: 5px;
}


/* =========================
   TOP RIGHT
========================= */

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
   OVERLAY
========================= */

.sidebar-overlay {
  display: none;
}


/* =========================
   CONTENT
========================= */

.content {
  padding: 40px 50px 30px;

  max-width: 1600px;
}


/* =========================
   WELCOME
========================= */

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

.welcome-box::after {
  content: "";

  position: absolute;

  width: 230px;
  height: 230px;

  right: 40px;
  top: -90px;

  border-radius: 50%;

  background: rgba(255,255,255,0.35);
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

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 34px;

  color: #617657;
}

.welcome-text p {
  margin: 0;

  font-size: 14px;

  color: #827b79;
}

.welcome-decoration {
  position: relative;

  z-index: 3;

  margin-right: 50px;

  transform: rotate(-5deg);
}

.welcome-decoration img {
  width: 285px;
  height: 150px;

  object-fit: cover;

  border-radius: 20px;

  transform: rotate(5deg);
}


/* =========================
   STATISTICS
========================= */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-top: 25px;
}

.stat-card {
  padding: 23px;

  min-height: 180px;

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

  font-size: 20px;
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

  font-size: 14px;

  font-weight: bold;
}

.stat-change {
  padding: 5px 8px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: bold;
}

.stat-change.positive {
  background: #eaf2e5;

  color: #708966;
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
   DASHBOARD GRID
========================= */

.dashboard-grid {
  display: grid;

  grid-template-columns:
    1.35fr 1fr;

  gap: 25px;

  margin-top: 25px;
}

.panel {
  min-width: 0;

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

  margin-bottom: 12px;

  gap: 15px;
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

.panel-header a {
  color: #6c8063;

  text-decoration: none;

  font-size: 11px;

  font-weight: bold;

  white-space: nowrap;
}


/* =========================
   ORDERS
========================= */

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

.order-item:last-child {
  border-bottom: none;
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

.status.pending {
  background: #fff1df;

  color: #b17d4c;
}

.status.success {
  background: #e7f1e3;

  color: #66805d;
}


/* =========================
   PRODUCTS
========================= */

.product-item {
  min-height: 75px;

  display: flex;

  align-items: center;

  gap: 13px;

  border-bottom: 1px solid #f0f0ed;
}

.product-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 13px;

  background: #f8eeee;
}

.product-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.product-info {
  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 5px;
}

.product-info strong {
  font-size: 12px;

  color: #515c4d;
}

.product-info span {
  font-size: 10px;

  color: #aaa;
}

.product-price {
  flex-shrink: 0;

  font-size: 11px;

  color: #65765c;
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

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}


/* =========================
   TABLET / HP
========================= */

@media (max-width: 800px) {

  .dashboard-page {
    display: block;

    width: 100%;

    overflow-x: hidden;
  }


  /* SIDEBAR JADI HAMBURGER */

  .sidebar {
    width: 270px;

    height: 100vh;
    min-height: 100vh;

    position: fixed;

    top: 0;
    left: 0;

    transform: translateX(-100%);

    transition:
      transform 0.25s ease;

    box-shadow:
      8px 0 25px rgba(0,0,0,0.08);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }


  /* OVERLAY */

  .sidebar-overlay {
    display: block;

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

    padding: 0 16px;

    gap: 12px;
  }

  .hamburger {
    display: block;

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
    font-size: 23px;
  }

  .topbar-right {
    gap: 8px;

    flex-shrink: 0;
  }

  .top-avatar {
    width: 36px;
    height: 36px;
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


  /* WELCOME */

  .welcome-box {
    width: 100%;

    min-height: 145px;

    padding: 22px;

    border-radius: 20px;
  }

  .welcome-text {
    min-width: 0;
  }

  .welcome-label {
    font-size: 8px;

    letter-spacing: 1.5px;
  }

  .welcome-text h2 {
    font-size: 27px;
  }

  .welcome-text p {
    font-size: 12px;

    line-height: 1.5;

    max-width: 250px;
  }

  .welcome-decoration {
    margin-right: 0;
  }

  .welcome-decoration img {
    width: 180px;
    height: 110px;
  }


  /* STAT */

  .stats-grid {
    width: 100%;

    grid-template-columns: 1fr;

    gap: 15px;

    margin-top: 18px;
  }

  .stat-card {
    min-height: 150px;

    padding: 20px;
  }


  /* LOWER */

  .dashboard-grid {
    width: 100%;

    grid-template-columns: 1fr;

    gap: 18px;

    margin-top: 18px;
  }

  .panel {
    width: 100%;

    padding: 18px;

    border-radius: 18px;
  }


  /* FOOTER */

  .dashboard-footer {
    flex-direction: column;

    gap: 8px;

    padding-top: 25px;
  }
}


/* =========================
   HP KECIL
========================= */

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

  .hamburger span {
    margin: 4px 0;
  }

  .page-heading h1 {
    font-size: 20px;
  }

  .small-title {
    font-size: 7px;
  }

  .top-avatar {
    width: 34px;
    height: 34px;

    font-size: 13px;
  }


  .content {
    padding: 14px 12px 20px;
  }


  .welcome-box {
    min-height: 135px;

    padding: 20px;

    border-radius: 18px;
  }

  .welcome-decoration {
    display: none;
  }

  .welcome-text h2 {
    font-size: 24px;

    margin: 7px 0;
  }

  .welcome-text p {
    font-size: 11px;

    max-width: 100%;
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

  .panel-header p {
    font-size: 10px;
  }


  .order-item {
    gap: 8px;

    min-width: 0;
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


  .product-price {
    display: none;
  }


  .dashboard-footer {
    font-size: 9px;
  }
}

</style>