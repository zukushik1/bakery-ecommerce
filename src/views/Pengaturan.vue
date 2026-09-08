<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showSuccess = ref(false)
const menuOpen = ref(false)

const storeName = ref('Jericho & Nesya')
const storeEmail = ref('jericho.nesya@gmail.com')
const storePhone = ref('0822-8326-2013')
const storeAddress = ref('Payakumbuh, Sumatera Barat')

const saveSettings = () => {
  showSuccess.value = true

  setTimeout(() => {
    showSuccess.value = false
  }, 2500)
}

const logout = () => {
  router.push('/login')
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <div class="dashboard-page">

    <!-- =========================
         MOBILE OVERLAY
    ========================== -->

    <div
      v-if="menuOpen"
      class="mobile-overlay"
      @click="closeMenu"
    ></div>


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

        <p class="menu-title">
          MENU UTAMA
        </p>


        <!-- DASHBOARD -->
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


        <!-- PRODUK -->
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


        <!-- PESANAN -->
        <router-link
          to="/pesanan"
          class="menu-item"
          @click="closeMenu"
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


        <!-- MENU LAINNYA -->
        <p class="menu-title second-title">
          LAINNYA
        </p>


        <!-- PENGATURAN -->
        <router-link
          to="/pengaturan"
          class="menu-item active"
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


      <!-- =========================
           SIDEBAR BOTTOM
      ========================== -->

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


        <!-- LOGOUT -->
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
         MAIN CONTENT
    ========================== -->

    <main class="main-content">


      <!-- =========================
           TOPBAR
      ========================== -->

      <header class="topbar">


        <!-- HAMBURGER -->
        <button
          class="hamburger"
          @click="menuOpen = !menuOpen"
          aria-label="Buka menu"
        >

          <span></span>
          <span></span>
          <span></span>

        </button>


        <!-- PAGE HEADING -->
        <div class="page-heading">

          <span class="small-title">
            SISTEM TOKO
          </span>

          <h1>
            Pengaturan
          </h1>

        </div>


        <!-- ADMIN -->
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

      </header>


      <!-- =========================
           CONTENT
      ========================== -->

      <section class="content">


        <!-- PAGE INTRO -->
        <div class="page-intro">

          <span class="intro-label">
            TOKO JERICHO & NESYA
          </span>

          <h2>
            Pengaturan
          </h2>

          <p>
            Kelola informasi toko dan pengaturan sistem.
          </p>

        </div>


        <!-- =========================
             SUCCESS MESSAGE
        ========================== -->

        <div
          v-if="showSuccess"
          class="success-message"
        >

          <span class="success-icon">
            ✓
          </span>

          <div>

            <strong>
              Pengaturan berhasil disimpan
            </strong>

            <p>
              Perubahan informasi toko sudah tersimpan.
            </p>

          </div>

        </div>


        <!-- =========================
             SETTINGS GRID
        ========================== -->

        <div class="settings-grid">


          <!-- =========================
               PROFIL ADMIN
          ========================== -->

          <div class="settings-card">

            <div class="settings-header">

              <div class="settings-icon green">
                ♙
              </div>

              <div>

                <h2>
                  Profil Admin
                </h2>

                <p>
                  Informasi akun administrator.
                </p>

              </div>

            </div>


            <!-- ADMIN PROFILE -->
            <div class="admin-profile-large">

              <div class="large-avatar">
                A
              </div>

              <div class="large-profile-info">

                <strong>
                  Admin
                </strong>

                <span>
                  Administrator
                </span>

                <small>
                  Akun pengelola toko
                </small>

              </div>

            </div>


            <!-- STATUS -->
            <div class="info-box">

              <span>
                STATUS AKUN
              </span>

              <strong>
                ● Aktif
              </strong>

            </div>

          </div>


          <!-- =========================
               INFORMASI TOKO
          ========================== -->

          <div class="settings-card">

            <div class="settings-header">

              <div class="settings-icon pink">
                🏪
              </div>

              <div>

                <h2>
                  Informasi Toko
                </h2>

                <p>
                  Informasi dasar toko.
                </p>

              </div>

            </div>


            <!-- NAMA TOKO -->
            <div class="form-group">

              <label>
                Nama Toko
              </label>

              <input
                v-model="storeName"
                type="text"
              />

            </div>


            <!-- EMAIL -->
            <div class="form-group">

              <label>
                Email Toko
              </label>

              <input
                v-model="storeEmail"
                type="email"
              />

            </div>


            <!-- TELEPON -->
            <div class="form-group">

              <label>
                Nomor Telepon
              </label>

              <input
                v-model="storePhone"
                type="text"
              />

            </div>


            <!-- ALAMAT -->
            <div class="form-group">

              <label>
                Alamat Toko
              </label>

              <textarea
                v-model="storeAddress"
                rows="3"
              ></textarea>

            </div>

          </div>

        </div>


        <!-- =========================
             SAVE BUTTON
        ========================== -->

        <div class="save-section">

          <p>
            Pastikan informasi toko sudah benar sebelum menyimpan.
          </p>

          <button
            class="save-button"
            @click="saveSettings"
          >

            <span>
              ✓
            </span>

            Simpan Pengaturan

          </button>

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

  </div>
</template>


<style>

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
  width: 100%;
  min-height: 100%;
}

body {
  font-family: Arial, Helvetica, sans-serif;
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
  background: rgba(255, 255, 255, 0.65);

  color: #52664c;
}

.menu-item.active {
  background: #718667;

  color: white;

  box-shadow:
    0 8px 18px rgba(113, 134, 103, 0.18);
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

  background: rgba(255, 255, 255, 0.65);

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

  min-width: 0;
}


/* =========================
   TOPBAR
========================= */

.topbar {
  width: 100%;
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

  font-size: 34px;

  color: #526b45;
}


/* =========================
   TOP ADMIN
========================= */

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
   HAMBURGER
========================= */

.hamburger {
  display: none;

  width: 42px;
  height: 42px;

  padding: 9px;

  border: none;

  border-radius: 10px;

  background: #f1f3df;

  cursor: pointer;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 5px;
}

.hamburger span {
  display: block;

  width: 22px;
  height: 2px;

  border-radius: 5px;

  background: #526b45;
}


/* =========================
   MOBILE OVERLAY
========================= */

.mobile-overlay {
  display: none;
}


/* =========================
   CONTENT
========================= */

.content {
  width: 100%;

  padding: 40px 50px 30px;

  max-width: 1500px;

  margin: 0 auto;
}


/* =========================
   PAGE INTRO
========================= */

.page-intro {
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

  font-family: Georgia, "Times New Roman", serif;

  font-size: 32px;

  color: #526b45;
}

.page-intro p {
  margin: 0;

  font-size: 13px;

  color: #999;
}


/* =========================
   SUCCESS
========================= */

.success-message {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 15px 18px;

  margin-bottom: 20px;

  border: 1px solid #dbe8d3;

  border-radius: 15px;

  background: #eef5e9;

  color: #62785a;
}

.success-icon {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #718667;

  color: white;

  font-weight: bold;
}

.success-message strong {
  display: block;

  font-size: 13px;
}

.success-message p {
  margin: 3px 0 0;

  font-size: 10px;

  color: #899581;
}


/* =========================
   SETTINGS GRID
========================= */

.settings-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 25px;
}


/* =========================
   SETTINGS CARD
========================= */

.settings-card {
  min-width: 0;

  padding: 25px;

  background: white;

  border: 1px solid #eeeeea;

  border-radius: 22px;

  box-shadow:
    0 8px 25px rgba(80, 80, 60, 0.035);
}

.settings-header {
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 25px;
}

.settings-icon {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  font-size: 20px;
}

.settings-icon.green {
  background: #e8efdf;

  color: #6d8560;
}

.settings-icon.pink {
  background: #fce7e5;

  color: #d98f8c;
}

.settings-header h2 {
  margin: 0;

  font-family: Georgia, "Times New Roman", serif;

  font-size: 21px;

  color: #52634b;
}

.settings-header p {
  margin: 4px 0 0;

  font-size: 11px;

  color: #a0a29d;
}


/* =========================
   ADMIN PROFILE
========================= */

.admin-profile-large {
  display: flex;
  align-items: center;

  gap: 17px;

  padding: 20px;

  border-radius: 16px;

  background: #f8f9f3;

  border: 1px solid #eef0e7;
}

.large-avatar {
  width: 62px;
  height: 62px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: #718667;

  color: white;

  font-size: 22px;

  font-weight: bold;
}

.large-profile-info {
  display: flex;
  flex-direction: column;

  gap: 4px;
}

.large-profile-info strong {
  font-size: 16px;

  color: #52624d;
}

.large-profile-info span {
  font-size: 11px;

  color: #7e8878;
}

.large-profile-info small {
  font-size: 10px;

  color: #aaa;
}


/* =========================
   INFO BOX
========================= */

.info-box {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 15px;

  padding: 13px 15px;

  border-radius: 12px;

  background: #fffdfb;

  border: 1px solid #eeeeea;
}

.info-box span {
  font-size: 9px;

  letter-spacing: 1px;

  color: #a0a49c;

  font-weight: bold;
}

.info-box strong {
  font-size: 10px;

  color: #6b835f;
}


/* =========================
   FORM
========================= */

.form-group {
  display: flex;

  flex-direction: column;

  gap: 8px;

  margin-bottom: 15px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-size: 11px;

  font-weight: 600;

  color: #5e6659;
}

.form-group input,
.form-group textarea {
  width: 100%;

  border: 1px solid #deded9;

  border-radius: 11px;

  outline: none;

  background: white;

  color: #555;

  font-size: 12px;

  font-family: Arial, Helvetica, sans-serif;
}

.form-group input {
  height: 45px;

  padding: 0 14px;
}

.form-group textarea {
  padding: 12px 14px;

  resize: vertical;

  min-height: 75px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #718667;

  box-shadow:
    0 0 0 3px rgba(113, 134, 103, 0.08);
}


/* =========================
   SAVE
========================= */

.save-section {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-top: 25px;

  padding: 20px 25px;

  border-radius: 18px;

  background: #f1f3df;

  border: 1px solid #e3e6d5;
}

.save-section p {
  margin: 0;

  font-size: 11px;

  color: #858d7e;
}

.save-button {
  height: 45px;

  padding: 0 20px;

  border: none;

  border-radius: 12px;

  background: #718667;

  color: white;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

  white-space: nowrap;

  transition: 0.2s;
}

.save-button:hover {
  background: #617658;

  transform: translateY(-1px);
}

.save-button span {
  font-size: 15px;
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

  .settings-grid {
    grid-template-columns: 1fr;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {

  .dashboard-page {
    display: block;

    width: 100%;

    overflow-x: hidden;
  }


  /* SIDEBAR MOBILE */

  .sidebar {
    width: 270px;

    height: 100vh;

    min-height: 100vh;

    position: fixed;

    left: 0;
    top: 0;

    transform: translateX(-100%);

    transition: transform 0.25s ease;

    box-shadow:
      8px 0 30px rgba(0, 0, 0, 0.08);

    z-index: 1000;
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }


  /* OVERLAY */

  .mobile-overlay {
    display: block;

    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, 0.25);

    z-index: 999;
  }


  /* BRAND */

  .brand {
    height: 90px;

    justify-content: center;

    padding-left: 0;
  }

  .brand img {
    width: 145px;
  }


  /* MENU */

  .menu {
    padding: 25px 18px;

    overflow-y: auto;
  }

  .menu-title {
    display: block;
  }

  .second-title {
    display: block;
  }

  .menu-item {
    height: 50px;

    justify-content: flex-start;

    gap: 15px;

    padding: 0 16px;

    margin-bottom: 7px;

    font-size: 14px;

    flex-direction: row;
  }

  .menu-icon {
    width: 25px;

    height: auto;

    font-size: 18px;
  }

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

    height: 75px;

    padding: 0 15px;

    gap: 12px;
  }

  .hamburger {
    display: flex;

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
    font-size: 24px;

    white-space: nowrap;
  }

  .top-admin {
    flex-shrink: 0;
  }

  .top-avatar {
    width: 35px;
    height: 35px;
  }

  .top-admin-info,
  .arrow {
    display: none;
  }


  /* CONTENT */

  .content {
    width: 100%;

    max-width: 100%;

    padding: 18px 15px 25px;

    overflow-x: hidden;
  }

  .page-intro {
    margin-bottom: 20px;
  }

  .page-intro h2 {
    font-size: 27px;

    margin-top: 6px;
  }

  .page-intro p {
    font-size: 11px;

    line-height: 1.5;
  }


  /* SETTINGS */

  .settings-grid {
    width: 100%;

    grid-template-columns: 1fr;

    gap: 15px;
  }

  .settings-card {
    width: 100%;

    padding: 18px;

    border-radius: 18px;
  }

  .settings-header {
    margin-bottom: 20px;
  }

  .settings-header h2 {
    font-size: 19px;
  }

  .settings-header p {
    font-size: 10px;
  }

  .settings-icon {
    width: 42px;
    height: 42px;

    font-size: 17px;
  }


  /* SAVE */

  .save-section {
    flex-direction: column;

    align-items: stretch;

    gap: 13px;

    padding: 17px;

    margin-top: 15px;
  }

  .save-button {
    width: 100%;

    justify-content: center;
  }


  /* FOOTER */

  .dashboard-footer {
    flex-direction: column;

    gap: 8px;

    padding-top: 25px;
  }

}


/* =========================
   SMALL HP
========================= */

@media (max-width: 500px) {

  .sidebar {
    width: 260px;
  }

  .brand {
    height: 80px;
  }

  .brand img {
    width: 130px;
  }

  .menu {
    padding: 20px 15px;
  }

  .menu-item {
    height: 48px;

    font-size: 13px;
  }

  .topbar {
    height: 68px;

    padding: 0 12px;
  }

  .hamburger {
    width: 38px;
    height: 38px;
  }

  .hamburger span {
    width: 20px;
  }

  .page-heading h1 {
    font-size: 21px;
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

  .settings-card {
    padding: 16px;
  }

  .admin-profile-large {
    padding: 15px;

    gap: 12px;
  }

  .large-avatar {
    width: 52px;
    height: 52px;

    font-size: 19px;
  }

  .large-profile-info strong {
    font-size: 14px;
  }

  .success-message {
    padding: 12px;

    gap: 9px;
  }

  .success-message strong {
    font-size: 11px;
  }

  .success-message p {
    font-size: 9px;
  }

}

</style>