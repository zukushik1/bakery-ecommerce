<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* =========================
   LOGOUT
========================= */

const logout = () => {
  router.push('/login')
}


/* =========================
   STATE
========================= */

const searchQuery = ref('')
const showMenu = ref(false)

/* MODAL DETAIL */
const showDetail = ref(false)
const selectedCustomer = ref(null)


/* =========================
   DATA HISTORY PELANGGAN
========================= */

const customerHistory = ref([
  {
    id: 1,
    name: 'Rina Amelia',
    phone: '081234567890',
    address: 'Jl. Soekarno Hatta No. 12',
    totalTransaction: 3,
    totalSpent: 1250000,
    lastPurchase: '05 Sep 2026'
  },
  {
    id: 2,
    name: 'Dimas Pratama',
    phone: '082345678901',
    address: 'Jl. Sudirman No. 25',
    totalTransaction: 2,
    totalSpent: 675000,
    lastPurchase: '03 Sep 2026'
  },
  {
    id: 3,
    name: 'Siti Rahma',
    phone: '083456789012',
    address: 'Jl. Ahmad Yani No. 18',
    totalTransaction: 5,
    totalSpent: 1985000,
    lastPurchase: '02 Sep 2026'
  },
  {
    id: 4,
    name: 'Fajar Nugraha',
    phone: '084567890123',
    address: 'Jl. Imam Bonjol No. 7',
    totalTransaction: 1,
    totalSpent: 520000,
    lastPurchase: '30 Agu 2026'
  },
  {
    id: 5,
    name: 'Nadia Putri',
    phone: '085678901234',
    address: 'Jl. Veteran No. 31',
    totalTransaction: 3,
    totalSpent: 945000,
    lastPurchase: '28 Agu 2026'
  },
  {
    id: 6,
    name: 'Rizky Maulana',
    phone: '086789012345',
    address: 'Jl. Khatib Sulaiman No. 9',
    totalTransaction: 1,
    totalSpent: 210000,
    lastPurchase: '25 Agu 2026'
  }
])


/* =========================
   SEARCH
========================= */

const filteredCustomers = computed(() => {
  const keyword = searchQuery.value.toLowerCase().trim()

  if (!keyword) {
    return customerHistory.value
  }

  return customerHistory.value.filter(customer =>
    customer.name.toLowerCase().includes(keyword) ||
    customer.phone.includes(keyword) ||
    customer.address.toLowerCase().includes(keyword)
  )
})


/* =========================
   TOTAL TRANSAKSI
========================= */

const totalTransactions = computed(() => {
  return customerHistory.value.reduce(
    (total, customer) =>
      total + customer.totalTransaction,
    0
  )
})


/* =========================
   TOTAL PEMBELIAN
========================= */

const totalSpent = computed(() => {
  return customerHistory.value.reduce(
    (total, customer) =>
      total + customer.totalSpent,
    0
  )
})


/* =========================
   FORMAT HARGA
========================= */

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}


/* =========================
   INITIAL
========================= */

const getInitial = (name) => {
  return name.charAt(0).toUpperCase()
}


/* =========================
   LIHAT DETAIL HISTORY
========================= */

const viewCustomer = (customer) => {
  selectedCustomer.value = customer
  showDetail.value = true

  document.body.style.overflow = 'hidden'
}


/* =========================
   TUTUP DETAIL
========================= */

const closeDetail = () => {
  showDetail.value = false
  selectedCustomer.value = null

  document.body.style.overflow = ''
}


/* =========================
   TUTUP MODAL KLIK LUAR
========================= */

const handleModalBackground = (event) => {
  if (event.target === event.currentTarget) {
    closeDetail()
  }
}
</script>


<template>

  <div class="dashboard-page">

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
          @click="showMenu = false"
        >

          <span class="menu-icon">
            ⌂
          </span>

          <span>
            Dashboard
          </span>

        </router-link>


        <!-- PRODUK -->

        <router-link
          to="/produk"
          class="menu-item"
          @click="showMenu = false"
        >

          <span class="menu-icon">
            🍰
          </span>

          <span>
            Produk
          </span>

        </router-link>


        <!-- PESANAN -->

        <router-link
          to="/pesanan"
          class="menu-item"
          @click="showMenu = false"
        >

          <span class="menu-icon">
            🛍
          </span>

          <span>
            Pesanan
          </span>

        </router-link>


        <!-- HISTORY PELANGGAN -->

        <router-link
          to="/history-pelanggan"
          class="menu-item active"
          @click="showMenu = false"
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


        <!-- PENGATURAN -->

        <router-link
          to="/pengaturan"
          class="menu-item"
          @click="showMenu = false"
        >

          <span class="menu-icon">
            ⚙
          </span>

          <span>
            Pengaturan
          </span>

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

          <span>
            ↪
          </span>

          Logout

        </button>

      </div>

    </aside>


    <!-- =========================
         OVERLAY MOBILE
    ========================== -->

    <div
      v-if="showMenu"
      class="sidebar-overlay"
      @click="showMenu = false"
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
          @click="showMenu = !showMenu"
          aria-label="Buka menu"
        >

          <span></span>
          <span></span>
          <span></span>

        </button>


        <!-- PAGE HEADING -->

        <div class="page-heading">

          <span class="small-title">
            MANAGEMENT
          </span>

          <h1>
            History Pelanggan
          </h1>

        </div>


        <!-- TOPBAR RIGHT -->

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
              History Pelanggan
            </h2>

            <p>
              Lihat riwayat pelanggan yang pernah melakukan pembelian di toko.
            </p>

          </div>

        </div>


        <!-- =========================
             STATISTICS
        ========================== -->

        <div class="stats-grid">


          <!-- TOTAL PELANGGAN -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon green">
                ♙
              </div>

              <span class="stat-badge">
                Pelanggan
              </span>

            </div>

            <p class="stat-label">
              Total Pelanggan
            </p>

            <h3>
              {{ customerHistory.length }}
            </h3>

            <span class="stat-footer">
              pelanggan yang pernah membeli
            </span>

          </div>


          <!-- TOTAL TRANSAKSI -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon green">
                🛍
              </div>

              <span class="stat-badge">
                Transaksi
              </span>

            </div>

            <p class="stat-label">
              Total Transaksi
            </p>

            <h3>
              {{ totalTransactions }}
            </h3>

            <span class="stat-footer">
              transaksi dari semua pelanggan
            </span>

          </div>


          <!-- TOTAL PEMBELIAN -->

          <div class="stat-card">

            <div class="stat-top">

              <div class="stat-icon cream">
                Rp
              </div>

              <span class="stat-badge">
                Pendapatan
              </span>

            </div>

            <p class="stat-label">
              Total Pembelian
            </p>

            <h3>
              Rp {{ formatPrice(totalSpent) }}
            </h3>

            <span class="stat-footer">
              dari seluruh transaksi
            </span>

          </div>


        </div>


        <!-- =========================
             CUSTOMER PANEL
        ========================== -->

        <div class="customer-panel">


          <!-- PANEL HEADER -->

          <div class="panel-header">

            <div>

              <h2>
                Riwayat Pelanggan
              </h2>

              <p>
                Daftar pelanggan yang pernah melakukan pembelian
              </p>

            </div>


            <!-- SEARCH -->

            <div class="customer-tools">

              <div class="search-box">

                <span>
                  ⌕
                </span>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari pelanggan..."
                />

              </div>

            </div>

          </div>


          <!-- =========================
               CUSTOMER TABLE
          ========================== -->

          <div class="customer-table">


            <!-- TABLE HEADER -->

            <div class="table-head">

              <span>
                PELANGGAN
              </span>

              <span>
                KONTAK
              </span>

              <span>
                TRANSAKSI
              </span>

              <span>
                TOTAL BELANJA
              </span>

              <span>
                AKSI
              </span>

            </div>


            <!-- CUSTOMER ROW -->

            <div
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="customer-row"
            >


              <!-- CUSTOMER -->

              <div class="customer-cell customer-main">

                <div
                  class="customer-avatar"
                  :class="{
                    'avatar-pink': customer.id % 3 === 1,
                    'avatar-green': customer.id % 3 === 2,
                    'avatar-peach': customer.id % 3 === 0
                  }"
                >

                  {{ getInitial(customer.name) }}

                </div>


                <div class="customer-name">

                  <strong>
                    {{ customer.name }}
                  </strong>

                  <span>
                    ID #HIST-00{{ customer.id }}
                  </span>

                </div>

              </div>


              <!-- CONTACT -->

              <div class="customer-cell contact-cell">

                <strong>
                  {{ customer.phone }}
                </strong>

                <span>
                  {{ customer.address }}
                </span>

              </div>


              <!-- TRANSAKSI -->

              <div class="customer-cell transaction-cell">

                <strong class="transaction-count">
                  {{ customer.totalTransaction }}x
                </strong>

              </div>


              <!-- TOTAL -->

              <div class="customer-cell">

                <strong class="total-price">
                  Rp {{ formatPrice(customer.totalSpent) }}
                </strong>

              </div>


              <!-- ACTION -->

              <div class="customer-cell action-cell">

                <button
                  class="view-button"
                  title="Lihat history pelanggan"
                  @click="viewCustomer(customer)"
                >
                  👁
                </button>

              </div>

            </div>


            <!-- EMPTY SEARCH -->

            <div
              v-if="filteredCustomers.length === 0"
              class="empty-customer"
            >

              <div>
                ♙
              </div>

              <h3>
                Pelanggan tidak ditemukan
              </h3>

              <p>
                Coba gunakan nama, nomor telepon, atau alamat lain.
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


    <!-- =================================================
         MODAL DETAIL HISTORY
    ================================================== -->

    <div
      v-if="showDetail && selectedCustomer"
      class="modal-overlay"
      @click="handleModalBackground"
    >

      <div class="customer-modal">


        <!-- MODAL HEADER -->

        <div class="modal-header">

          <div>

            <span class="modal-label">
              CUSTOMER HISTORY
            </span>

            <h2>
              Detail History
            </h2>

          </div>


          <button
            class="modal-close"
            @click="closeDetail"
          >
            ×
          </button>

        </div>


        <!-- CUSTOMER PROFILE -->

        <div class="modal-profile">

          <div
            class="modal-avatar"
            :class="{
              'avatar-pink':
                selectedCustomer.id % 3 === 1,

              'avatar-green':
                selectedCustomer.id % 3 === 2,

              'avatar-peach':
                selectedCustomer.id % 3 === 0
            }"
          >

            {{ getInitial(selectedCustomer.name) }}

          </div>


          <div class="modal-profile-info">

            <h3>
              {{ selectedCustomer.name }}
            </h3>

            <span>
              ID #HIST-00{{ selectedCustomer.id }}
            </span>

          </div>

        </div>


        <!-- INFORMATION -->

        <div class="detail-grid">


          <!-- PHONE -->

          <div class="detail-item">

            <span class="detail-label">
              NOMOR TELEPON
            </span>

            <strong>
              {{ selectedCustomer.phone }}
            </strong>

          </div>


          <!-- TRANSAKSI -->

          <div class="detail-item">

            <span class="detail-label">
              JUMLAH TRANSAKSI
            </span>

            <strong>
              {{ selectedCustomer.totalTransaction }} transaksi
            </strong>

          </div>


          <!-- ADDRESS -->

          <div class="detail-item detail-full">

            <span class="detail-label">
              ALAMAT
            </span>

            <strong>
              {{ selectedCustomer.address }}
            </strong>

          </div>


          <!-- LAST PURCHASE -->

          <div class="detail-item">

            <span class="detail-label">
              PEMBELIAN TERAKHIR
            </span>

            <strong>
              {{ selectedCustomer.lastPurchase }}
            </strong>

          </div>


          <!-- TOTAL SPENT -->

          <div class="detail-item">

            <span class="detail-label">
              TOTAL BELANJA
            </span>

            <strong class="detail-price">
              Rp {{ formatPrice(selectedCustomer.totalSpent) }}
            </strong>

          </div>

        </div>


        <!-- MODAL FOOTER -->

        <div class="modal-footer">

          <button
            class="modal-button"
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


/* =========================
   PAGE
========================= */

.dashboard-page {
  width: 100%;
  min-height: 100vh;

  display: flex;

  background: #faf9f5;

  color: #333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  overflow-x: hidden;
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

  min-height: 52px;

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

  flex-shrink: 0;

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

  min-width: 0;
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

  border: 1px solid #e4e4e0;

  border-radius: 11px;

  background: white;

  cursor: pointer;

  padding: 9px;
}

.hamburger span {
  display: block;

  width: 100%;
  height: 2px;

  margin: 4px 0;

  border-radius: 5px;

  background: #65755d;
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
   CONTENT
========================= */

.content {
  padding: 40px 50px 30px;

  min-width: 0;
}


/* =========================
   INTRO
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
   STATISTICS
========================= */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

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

.stat-icon.cream {
  background: #f5f0d8;

  color: #a39256;

  font-size: 14px;

  font-weight: bold;
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

  font-size: 26px;

  color: #52634b;
}

.stat-footer {
  display: block;

  margin-top: 6px;

  font-size: 10px;

  color: #b0b1ac;
}


/* =========================
   CUSTOMER PANEL
========================= */

.customer-panel {
  width: 100%;

  background: white;

  border: 1px solid #eeeeea;

  border-radius: 22px;

  padding: 25px;

  box-shadow:
    0 8px 25px rgba(80,80,60,0.035);
}


/* =========================
   PANEL HEADER
========================= */

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

.customer-tools {
  display: flex;

  gap: 10px;
}

.search-box {
  width: 250px;

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

  border: none;

  outline: none;

  font-size: 12px;

  color: #555;

  background: transparent;
}

.search-box input::placeholder {
  color: #aaa;
}


/* =========================
   TABLE
========================= */

.customer-table {
  width: 100%;

  overflow: hidden;
}

.table-head,
.customer-row {
  display: grid;

  grid-template-columns:
    1.7fr
    1.7fr
    1.2fr
    1.25fr
    0.6fr;

  align-items: center;

  column-gap: 10px;
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

.customer-row {
  min-height: 85px;

  padding: 0 15px;

  border-bottom: 1px solid #f0f0ed;
}

.customer-row:last-child {
  border-bottom: none;
}

.customer-cell {
  min-width: 0;

  display: flex;

  align-items: center;
}


/* =========================
   CUSTOMER
========================= */

.customer-main {
  gap: 13px;
}

.customer-avatar {
  width: 45px;
  height: 45px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 14px;

  font-weight: bold;
}

.avatar-pink {
  background: #f9dedd;

  color: #b87976;
}

.avatar-green {
  background: #e5eedf;

  color: #69815e;
}

.avatar-peach {
  background: #f5e5d7;

  color: #a87b58;
}

.customer-name {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 5px;
}

.customer-name strong {
  font-size: 13px;

  color: #515c4d;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.customer-name span {
  font-size: 9px;

  color: #aaa;
}


/* =========================
   CONTACT
========================= */

.contact-cell {
  flex-direction: column;

  align-items: flex-start;

  gap: 5px;

  overflow: hidden;
}

.contact-cell strong {
  max-width: 100%;

  font-size: 10px;

  color: #59634f;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.contact-cell span {
  max-width: 100%;

  font-size: 9px;

  color: #aaa;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}


/* =========================
   TRANSACTION
========================= */

.transaction-count {
  font-size: 11px;

  color: #6b7e61;

  white-space: nowrap;
}


/* =========================
   TOTAL
========================= */

.total-price {
  font-size: 11px;

  color: #5e6f55;

  white-space: nowrap;
}


/* =========================
   ACTION
========================= */

.action-cell {
  gap: 7px;
}

.view-button {
  width: 32px;
  height: 32px;

  border: 1px solid #dfe5d9;

  border-radius: 9px;

  background: #f1f4eb;

  color: #718365;

  cursor: pointer;

  font-size: 13px;

  transition: 0.2s;
}

.view-button:hover {
  background: #e4ebdc;
}


/* =========================
   EMPTY
========================= */

.empty-customer {
  padding: 60px 20px;

  text-align: center;

  color: #aaa;
}

.empty-customer div {
  font-size: 40px;

  margin-bottom: 10px;
}

.empty-customer h3 {
  margin: 0 0 5px;

  color: #697362;

  font-family:
    Georgia,
    serif;
}

.empty-customer p {
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


/* =================================================
   MODAL DETAIL HISTORY
================================================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background: rgba(40, 45, 35, 0.45);

  backdrop-filter: blur(4px);

  animation: fadeIn 0.2s ease;
}


.customer-modal {
  width: 100%;

  max-width: 520px;

  max-height: 90vh;

  overflow-y: auto;

  padding: 28px;

  background: #fffdfb;

  border: 1px solid #eeeeea;

  border-radius: 24px;

  box-shadow:
    0 25px 70px rgba(40,50,35,0.18);

  animation: modalIn 0.25s ease;
}


/* MODAL HEADER */

.modal-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  margin-bottom: 25px;
}

.modal-label {
  font-size: 9px;

  font-weight: bold;

  letter-spacing: 2px;

  color: #a0a99a;
}

.modal-header h2 {
  margin: 6px 0 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 25px;

  color: #526b45;
}

.modal-close {
  width: 36px;
  height: 36px;

  border: 1px solid #e7e7e2;

  border-radius: 10px;

  background: white;

  color: #888;

  font-size: 22px;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  transition: 0.2s;
}

.modal-close:hover {
  background: #f5f5f1;

  color: #555;
}


/* PROFILE */

.modal-profile {
  display: flex;

  align-items: center;

  gap: 14px;

  padding: 18px;

  margin-bottom: 22px;

  border-radius: 17px;

  background: #f7f8f2;
}

.modal-avatar {
  width: 55px;
  height: 55px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-size: 17px;

  font-weight: bold;
}

.modal-profile-info {
  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 5px;
}

.modal-profile-info h3 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 18px;

  color: #52634b;
}

.modal-profile-info span {
  font-size: 9px;

  color: #999;
}


/* DETAIL GRID */

.detail-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;
}

.detail-item {
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 7px;

  padding: 16px;

  border: 1px solid #eeeeea;

  border-radius: 14px;

  background: white;
}

.detail-full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 8px;

  font-weight: bold;

  letter-spacing: 1px;

  color: #aaa;
}

.detail-item strong {
  font-size: 11px;

  color: #586450;

  word-break: break-word;
}

.detail-price {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 20px !important;

  color: #526b45 !important;
}


/* MODAL FOOTER */

.modal-footer {
  display: flex;

  justify-content: flex-end;

  margin-top: 22px;
}

.modal-button {
  min-width: 90px;

  height: 40px;

  padding: 0 18px;

  border: none;

  border-radius: 11px;

  background: #718667;

  color: white;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;

  transition: 0.2s;
}

.modal-button:hover {
  background: #617758;
}


/* ANIMATION */

@keyframes fadeIn {

  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }

}

@keyframes modalIn {

  from {
    opacity: 0;

    transform:
      translateY(15px)
      scale(0.97);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }

}


/* =========================
   SIDEBAR OVERLAY
========================= */

.sidebar-overlay {
  display: none;
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
      repeat(3, 1fr);
  }

  .customer-table {
    overflow-x: auto;
  }

  .table-head,
  .customer-row {
    min-width: 800px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {

  .dashboard-page {
    display: block;

    overflow-x: hidden;
  }


  /* SIDEBAR */

  .sidebar {
    width: 270px;

    height: 100vh;

    min-height: 100vh;

    position: fixed;

    top: 0;

    left: 0;

    transform: translateX(-100%);

    transition: transform 0.25s ease;

    border-right: 1px solid #e3e6d5;

    border-bottom: none;

    z-index: 200;
  }

  .sidebar.sidebar-open {
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

    overflow-y: auto;

    display: block;
  }

  .menu-title {
    display: block;

    margin-bottom: 14px;
  }

  .second-title {
    display: block;

    margin-top: 30px;
  }

  .menu-item {
    width: 100%;

    min-height: 50px;

    padding: 0 16px;

    margin-bottom: 7px;
  }


  /* SIDEBAR BOTTOM */

  .sidebar-bottom {
    display: block;
  }


  /* OVERLAY */

  .sidebar-overlay {
    display: block;

    position: fixed;

    inset: 0;

    background: rgba(0,0,0,0.25);

    z-index: 150;
  }


  /* MAIN */

  .main-content {
    width: 100%;

    margin-left: 0;

    min-width: 0;
  }


  /* TOPBAR */

  .topbar {
    height: 85px;

    padding: 0 20px;

    gap: 15px;
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
  }

  .page-heading h1 {
    font-size: 25px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }

  .topbar-right {
    gap: 8px;

    flex-shrink: 0;
  }

  .top-admin-info,
  .arrow {
    display: none;
  }

  .top-avatar {
    width: 38px;
    height: 38px;
  }


  /* CONTENT */

  .content {
    width: 100%;

    padding: 20px;

    overflow-x: hidden;
  }


  /* INTRO */

  .page-intro {
    margin-bottom: 20px;
  }

  .page-intro h2 {
    font-size: 28px;
  }

  .page-intro p {
    font-size: 12px;
  }


  /* STATS */

  .stats-grid {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .stat-card {
    min-height: 145px;

    padding: 20px;
  }


  /* PANEL */

  .customer-panel {
    padding: 18px;

    border-radius: 18px;

    overflow: hidden;
  }

  .panel-header {
    flex-direction: column;

    gap: 15px;
  }

  .customer-tools {
    width: 100%;
  }

  .search-box {
    width: 100%;
  }


  /* TABLE */

  .customer-table {
    width: 100%;

    overflow: hidden;
  }

  .table-head,
  .customer-row {
    min-width: 0;

    grid-template-columns:
      1.5fr
      1.2fr
      0.9fr
      1fr
      0.55fr;

    column-gap: 6px;

    padding: 0 5px;
  }

  .table-head {
    font-size: 7px;
  }

  .customer-row {
    min-height: 75px;
  }

  .customer-avatar {
    width: 36px;
    height: 36px;

    font-size: 12px;
  }

  .customer-main {
    gap: 7px;
  }

  .customer-name strong {
    font-size: 10px;
  }

  .customer-name span {
    font-size: 7px;
  }

  .contact-cell strong {
    font-size: 8px;
  }

  .contact-cell span {
    font-size: 7px;
  }

  .transaction-count {
    font-size: 8px;
  }

  .total-price {
    font-size: 8px;
  }

  .view-button {
    width: 27px;
    height: 27px;

    font-size: 11px;
  }


  /* MODAL */

  .customer-modal {
    max-width: 100%;

    padding: 22px;

    border-radius: 20px;
  }

  .modal-header h2 {
    font-size: 22px;
  }

  .modal-profile {
    padding: 14px;
  }

  .modal-avatar {
    width: 48px;
    height: 48px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-full {
    grid-column: auto;
  }


  /* FOOTER */

  .dashboard-footer {
    flex-direction: column;

    gap: 8px;
  }

}


/* =========================
   SMALL HP
========================= */

@media (max-width: 500px) {

  .topbar {
    height: 75px;

    padding: 0 14px;

    gap: 10px;
  }

  .hamburger {
    width: 38px;
    height: 38px;

    padding: 8px;
  }

  .page-heading h1 {
    font-size: 20px;
  }

  .small-title {
    display: none;
  }

  .top-avatar {
    width: 34px;
    height: 34px;
  }

  .content {
    padding: 15px;
  }

  .page-intro h2 {
    font-size: 25px;
  }

  .page-intro p {
    font-size: 11px;
  }

  .stat-card {
    min-height: 135px;

    padding: 18px;
  }

  .stat-card h3 {
    font-size: 24px;
  }

  .customer-panel {
    padding: 15px;

    border-radius: 16px;
  }

  .panel-header h2 {
    font-size: 19px;
  }

  .panel-header p {
    font-size: 10px;
  }


  /* TABLE JADI CARD */

  .customer-table {
    overflow: visible;
  }

  .table-head {
    display: none;
  }

  .customer-row {
    display: flex;

    flex-direction: column;

    align-items: stretch;

    gap: 12px;

    min-height: auto;

    padding: 17px 0;

    border-bottom: 1px solid #eeeeea;
  }

  .customer-row:first-child {
    border-top: 1px solid #eeeeea;
  }

  .customer-cell {
    width: 100%;
  }

  .customer-main {
    display: flex;

    align-items: center;

    gap: 10px;
  }

  .customer-avatar {
    width: 42px;
    height: 42px;
  }

  .customer-name {
    gap: 4px;
  }

  .customer-name strong {
    font-size: 13px;
  }

  .customer-name span {
    font-size: 8px;
  }

  .contact-cell {
    padding-left: 52px;

    gap: 4px;
  }

  .contact-cell strong {
    font-size: 10px;

    max-width: 100%;
  }

  .contact-cell span {
    font-size: 9px;

    white-space: normal;
  }


  /* TRANSAKSI */

  .customer-cell:nth-child(3) {
    width: 100%;

    justify-content: space-between;

    padding-left: 52px;
  }

  .customer-cell:nth-child(3)::before {
    content: "Jumlah Transaksi";

    font-size: 10px;

    color: #999;
  }

  .transaction-count {
    font-size: 10px;
  }


  /* TOTAL BELANJA */

  .customer-cell:nth-child(4) {
    width: 100%;

    justify-content: space-between;

    padding-left: 52px;
  }

  .customer-cell:nth-child(4)::before {
    content: "Total Belanja";

    font-size: 10px;

    color: #999;
  }

  .total-price {
    font-size: 10px;
  }


  /* ACTION */

  .action-cell {
    justify-content: flex-end;

    padding-left: 52px;

    gap: 6px;
  }

  .view-button {
    width: 34px;
    height: 34px;
  }


  /* MODAL HP */

  .modal-overlay {
    padding: 12px;
  }

  .customer-modal {
    padding: 18px;

    max-height: 92vh;
  }

  .modal-header {
    margin-bottom: 18px;
  }

  .modal-profile {
    gap: 10px;
  }

  .modal-profile-info h3 {
    font-size: 16px;
  }

  .detail-item {
    padding: 14px;
  }

  .detail-item strong {
    font-size: 10px;
  }

  .detail-price {
    font-size: 18px !important;
  }

  .empty-customer {
    padding: 40px 10px;
  }

}

</style>