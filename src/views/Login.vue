
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''

  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password wajib diisi.'
    return
  }

  try {
    // Backend menentukan role berdasarkan username dan password.
    // Frontend tidak mengirim role Admin/Petugas.
    const response = await api.post('/auth/login', {
      username: username.value,
      password: password.value
    })

    const loggedInRole = String(
      response.data.role || response.data.user?.role || ''
    ).toLowerCase()

    if (!['admin', 'petugas'].includes(loggedInRole)) {
      errorMessage.value = 'Role akun tidak dikenali. Pastikan backend mengirimkan role setelah login.'
      return
    }

    // Simpan data sesi setelah role berhasil dikenali.
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('role', loggedInRole)
    localStorage.setItem('nama', response.data.nama || response.data.user?.nama || username.value)

    // Arahkan otomatis sesuai role dari backend.
    router.push(loggedInRole === 'petugas' ? '/petugas/dashboard' : '/dashboard')

  } catch (error) {
    console.error('Login error:', error)

    if (error.response) {
      errorMessage.value =
        error.response.data?.error || 'Login gagal.'
    } else {
      errorMessage.value =
        'Backend tidak dapat dihubungi.'
    }
  }
}
</script>

<template>
  <div class="login-page">

    <!-- =========================
         BAGIAN KIRI
    ========================== -->
    <section class="left-side">

      <div class="left-bg-shape"></div>

      <!-- LOGO -->
      <img
        src="../assets/images/logo.webp"
        alt="Jericho & Nesya"
        class="logo"
      />

      <!-- TEKS -->
      <div class="left-content">

        <h1>
          Lebih dari<br />
          <span>Sekadar Kue</span>
        </h1>

        <p>
          Kami percaya bahwa bahan alami<br />
          membuat hidup lebih manis,<br />
          lebih sehat, dan lebih bermakna.
        </p>

        <div class="quote">
          <span>♥</span>

          <i>
            Good Ingredients,<br />
            Brighter Days
          </i>
        </div>

      </div>

      <!-- CAKE -->
      <img
        src="../assets/images/cake-hero.jpg"
        alt="Cake"
        class="cake"
      />

      <div class="bottom-text">
        BAKERY&nbsp;&nbsp;•&nbsp;&nbsp;NATURAL&nbsp;&nbsp;•&nbsp;&nbsp;BETTER LIFE
      </div>

    </section>


    <!-- =========================
         BAGIAN KANAN
    ========================== -->
    <section class="right-side">

      <!-- TOMBOL KEMBALI KE HOME -->
      <router-link to="/" class="back-home">
        <span>←</span>
        Kembali ke Beranda
      </router-link>

      <!-- ROLE ACCESS BADGE -->
      <div class="admin-access" aria-label="Akses khusus staf">
        <span class="admin-access-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <rect x="5" y="10" width="14" height="11" rx="3" stroke="currentColor" stroke-width="1.8" />
            <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
          </svg>
        </span>
        <span class="admin-access-copy">
          <strong>Staff Access</strong>
          <small>Admin &amp; Petugas</small>
        </span>
        <span class="admin-status-dot" aria-hidden="true"></span>
      </div>


      <!-- LOGIN CARD -->
      <div class="login-card">

        <div class="login-kicker">
          <span></span>
          MANAGEMENT PORTAL
        </div>

        <h2>
          Login
        </h2>

        <p class="subtitle">
          Masuk ke portal Jericho &amp; Nesya
        </p>

        <!-- USERNAME -->
        <div class="form-group">

          <label>
            Email / Username
          </label>

          <div class="input-box">

            <span class="input-icon">
              ♙
            </span>

            <input
              v-model="username"
              type="text"
              placeholder="Masukkan email atau username"
              @keyup.enter="login"
            />

          </div>

        </div>


        <!-- PASSWORD -->
        <div class="form-group">

          <label>
            Password
          </label>

          <div class="input-box">

            <span class="input-icon">
              🔒
            </span>

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan password"
              @keyup.enter="login"
            />

            <button
              type="button"
              class="eye"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '◉' : '○' }}
            </button>

          </div>

        </div>


        <!-- ERROR -->
        <p
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </p>


        <!-- LOGIN -->
        <button
          class="login-button"
          @click="login"
        >

          Login

          <span>
            →
          </span>

        </button>


        <!-- BOTTOM DECORATION -->
        <div class="card-bottom">

          <i>
            Together for<br />
            a Healthier Tomorrow ♥
          </i>

        </div>

      </div>

    </section>

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

.login-page {
  width: 100%;
  min-height: 100vh;

  display: flex;

  overflow-x: hidden;
  overflow-y: auto;

  background: #faf8f1;

  font-family:
    Arial,
    sans-serif;
}


/* =========================
   LEFT SIDE
========================= */

.left-side {
  width: 50%;
  min-height: 100vh;

  position: relative;

  overflow: hidden;

  background: #f1f3df;
}


/* =========================
   BACKGROUND SHAPE
========================= */

.left-bg-shape {
  position: absolute;

  width: 115%;
  height: 120%;

  left: -15%;
  top: -10%;

  background: #f1f3df;

  border-radius: 0 45% 45% 0;

  z-index: 0;
}


/* =========================
   PINK DECORATION
========================= */

.left-side::before {
  content: "";

  position: absolute;

  width: 170px;
  height: 280px;

  left: -80px;
  top: -30px;

  background: #f7bdb7;

  border-radius: 50%;

  z-index: 1;
}


.left-side::after {
  content: "";

  position: absolute;

  width: 170px;
  height: 300px;

  left: -75px;
  bottom: -80px;

  background: #f7bdb7;

  border-radius: 50%;

  z-index: 1;
}


/* =========================
   LOGO
========================= */

.logo {
  position: absolute;

  width: 280px;

  top: 55px;
  left: 12%;

  object-fit: contain;

  z-index: 5;
}


/* =========================
   LEFT CONTENT
========================= */

.left-content {
  position: absolute;

  left: 12%;
  top: 37%;

  z-index: 5;
}


.left-content h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(42px, 4vw, 64px);

  line-height: 1.05;

  color: #526b45;
}


.left-content h1 span {
  color: #ef9999;
}


.left-content p {
  margin-top: 25px;

  font-size: 17px;

  line-height: 1.55;

  color: #666;
}


/* =========================
   QUOTE
========================= */

.quote {
  margin-top: 35px;

  display: flex;

  flex-direction: column;

  gap: 8px;
}


.quote span {
  color: #f29b98;

  font-size: 24px;
}


.quote i {
  font-family:
    Georgia,
    serif;

  font-size: 18px;

  line-height: 1.4;

  color: #718363;
}


/* =========================
   CAKE
========================= */

.cake {
  position: absolute;

  width: 650px;

  max-width: 75%;

  right: -80px;

  bottom: 5px;

  z-index: 4;

  object-fit: contain;
}


/* =========================
   BOTTOM TEXT
========================= */

.bottom-text {
  position: absolute;

  left: 6%;

  bottom: 35px;

  font-size: 11px;

  letter-spacing: 3px;

  color: #718363;

  z-index: 6;
}


/* =========================
   RIGHT SIDE
========================= */

.right-side {
  width: 50%;
  min-height: 100vh;

  position: relative;

  display: flex;

  justify-content: center;

  align-items: center;

  /* DITAMBAH: ruang atas dan bawah */
  padding: 110px 40px 40px;

  background: #fffdfb;
}


/* =========================
   BACK TO HOME
========================= */

.back-home {
  position: absolute;
  top: 24px;
  left: 4%;
  z-index: 10;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px 10px 12px;
  border: 1px solid rgba(113, 131, 99, 0.16);
  border-radius: 999px;

  color: #65795b;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 5px 18px rgba(65, 79, 57, 0.05);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;

  transition: color 0.25s ease, background 0.25s ease,
    border-color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;
}

.back-home span {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #788b6d;
  font-size: 18px;
  line-height: 1;
  transition: transform 0.25s ease, background 0.25s ease;
}

.back-home:hover {
  color: #607653;
  background: #fff;
  border-color: rgba(113, 131, 99, 0.35);
  box-shadow: 0 8px 22px rgba(65, 79, 57, 0.1);
  transform: translateY(-2px);
}

.back-home:hover span {
  background: #ef9999;
  transform: translateX(-3px);
}


/* =========================
   ADMIN ACCESS BADGE
========================= */

.admin-access {
  position: absolute;
  top: 24px;
  right: 4%;
  z-index: 10;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 9px 13px 9px 10px;
  border: 1px solid rgba(113, 131, 99, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 20px rgba(65, 79, 57, 0.06);
  color: #627658;
}

.admin-access-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 11px;
  background: #eef2e8;
  color: #718667;
}

.admin-access-icon svg {
  width: 19px;
  height: 19px;
}

.admin-access-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.admin-access-copy strong {
  color: #536b49;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.admin-access-copy small {
  color: #9a9f92;
  font-size: 9px;
  letter-spacing: 0.15px;
}

.admin-status-dot {
  width: 7px;
  height: 7px;
  margin-left: 3px;
  border-radius: 50%;
  background: #8ba77c;
  box-shadow: 0 0 0 4px rgba(139, 167, 124, 0.13);
}


/* =========================
   LOGIN CARD
========================= */

.login-card {
  width: min(570px, 100%);

  min-height: 700px;

  position: relative;

  padding: 55px 50px 110px;

  background:
    rgba(255, 255, 255, 0.94);

  border-radius: 32px;

  box-shadow:
    0 15px 40px
    rgba(100, 100, 100, 0.08);

  overflow: hidden;

  /* DITAMBAH: card tidak dipaksa naik */
  transform: translateY(0);
}


/* =========================
   LOGIN KICKER
========================= */

.login-kicker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #9aa58f;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.1px;
}

.login-kicker span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef9999;
}


/* =========================
   TITLE
========================= */

.login-card h2 {
  text-align: center;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 50px;

  color: #5e7557;

  margin: 0;
}


.subtitle {
  text-align: center;

  margin-top: 12px;

  margin-bottom: 48px;

  font-size: 18px;

  color: #777;
}


/* =========================
   FORM
========================= */

.form-group {
  margin-bottom: 27px;
}


.form-group label {
  display: block;

  margin-bottom: 12px;

  font-size: 17px;

  font-weight: 600;

  color: #292929;
}


/* =========================
   INPUT
========================= */

.input-box {
  height: 62px;

  border: 1px solid #d7d7d7;

  border-radius: 17px;

  display: flex;

  align-items: center;

  padding: 0 18px;

  background: white;

  transition: 0.2s;
}


.input-box:focus-within {
  border-color: #718666;

  box-shadow:
    0 0 0 3px
    rgba(113, 134, 102, 0.1);
}


.input-icon {
  width: 35px;

  font-size: 22px;

  color: #788078;
}


.input-box input {
  flex: 1;

  min-width: 0;

  border: none;

  outline: none;

  font-size: 17px;

  color: #333;

  background: transparent;
}


.input-box input::placeholder {
  color: #b8b8b8;
}


/* =========================
   EYE BUTTON
========================= */

.eye {
  width: 30px;
  height: 30px;

  border: none;

  background: transparent;

  color: #777;

  cursor: pointer;

  font-size: 17px;

  display: flex;

  align-items: center;

  justify-content: center;
}


/* =========================
   ERROR
========================= */

.error-message {
  margin: -8px 0 15px;

  text-align: center;

  color: #c87878;

  font-size: 13px;

  font-weight: 600;
}


/* =========================
   LOGIN BUTTON
========================= */

.login-button {
  width: 100%;

  height: 64px;

  border: none;

  border-radius: 35px;

  background: #718667;

  color: white;

  font-family:
    Georgia,
    serif;

  font-size: 22px;

  cursor: pointer;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 25px;

  transition: 0.25s ease;
}


.login-button:hover {
  background: #617658;
  box-shadow: 0 9px 20px rgba(83, 107, 73, 0.2);
  transform: translateY(-2px);
}


.login-button span {
  font-size: 30px;
}


/* =========================
   CARD BOTTOM
========================= */

.card-bottom {
  position: absolute;

  left: 0;
  bottom: 0;

  width: 100%;
  height: 105px;

  background: #fce6e4;

  border-radius:
    50% 50% 0 0 /
    35% 35% 0 0;

  display: flex;

  justify-content: center;

  align-items: center;

  text-align: center;
}


.card-bottom i {
  font-family:
    Georgia,
    serif;

  font-size: 16px;

  color: #718363;

  line-height: 1.4;
}


/* =========================
   LAPTOP / DESKTOP
========================= */

@media (max-height: 850px) and (min-width: 1101px) {

  .right-side {
    align-items: center;

    /* Jarak tambahan di desktop */
    padding: 110px 40px 25px;
  }

  .login-card {
    transform: translateY(0);

    min-height: 680px;

    padding-top: 42px;
  }


  .login-card h2 {
    font-size: 42px;
  }


  .subtitle {
    margin-bottom: 32px;
  }


  .form-group {
    margin-bottom: 20px;
  }


  .input-box {
    height: 56px;
  }


  .login-button {
    height: 58px;
  }


  .logo {
    top: 35px;

    left: 12%;
  }


  .left-content {
    top: 35%;
  }


  .cake {
    width: 650px;

    max-width: 75%;

    right: -80px;

    bottom: 0;
  }


  .back-home {
    top: 24px;
  }

  .admin-access {
    top: 24px;
  }

}


/* =========================
   TABLET / iPAD
   601px - 1100px
========================= */

@media (min-width: 601px) and (max-width: 1100px) {

  .left-side {
    display: none !important;
  }


  .right-side {
    width: 100% !important;

    min-height: 100vh;

    padding: 60px 50px;

    align-items: center;

    justify-content: center;
  }


  .back-home {
    top: 24px;
    left: 50px;
  }

  .admin-access {
    top: 24px;
    right: 50px;
  }

  .login-card {
    transform: translateY(0);
  }


  .login-card {
    width: min(700px, 100%);

    min-height: 760px;

    padding:
      70px
      70px
      125px;

    border-radius: 36px;
  }


  .login-card h2 {
    font-size: 56px;
  }


  .subtitle {
    font-size: 20px;

    margin-top: 15px;

    margin-bottom: 52px;
  }


  .form-group {
    margin-bottom: 32px;
  }


  .form-group label {
    font-size: 19px;

    margin-bottom: 14px;
  }


  .input-box {
    height: 70px;

    border-radius: 19px;

    padding: 0 22px;
  }


  .input-box input {
    font-size: 19px;
  }


  .input-icon {
    width: 42px;

    font-size: 25px;
  }


  .login-button {
    height: 70px;

    font-size: 24px;

    gap: 30px;
  }


  .login-button span {
    font-size: 33px;
  }


  .card-bottom {
    height: 120px;
  }


  .card-bottom i {
    font-size: 18px;
  }

}


/* =========================
   HP
   600px KE BAWAH
========================= */

@media (max-width: 600px) {

  .left-side {
    display: none !important;
  }


  .right-side {
    width: 100%;
    min-height: 100vh;
    min-height: 100svh;
    padding: 88px 15px 25px;
    align-items: center;
    justify-content: center;
  }


  .back-home {
    top: 18px;
    left: 15px;
    padding: 7px 10px 7px 8px;
    gap: 7px;
    font-size: 11px;
  }

  .back-home span {
    width: 22px;
    height: 22px;
    font-size: 16px;
  }

  .admin-access {
    top: 18px;
    right: 15px;
    gap: 7px;
    padding: 7px 10px 7px 8px;
  }

  .admin-access-icon {
    width: 30px;
    height: 30px;
  }

  .admin-access-copy strong {
    font-size: 11px;
  }

  .admin-access-copy small {
    font-size: 8px;
  }

  .admin-status-dot {
    width: 6px;
    height: 6px;
  }

  .login-kicker {
    font-size: 9px;
    letter-spacing: 1.7px;
  }


  .login-card {
    width: 100%;

    min-height: 680px;

    margin-top: 0;
    min-height: 700px;
    transform: translateY(0);

    padding:
      40px
      25px
      100px;
  }


  .login-card h2 {
    font-size: 38px;
  }


  .subtitle {
    font-size: 15px;
  }

  /* Layar HP kecil */
  @media (max-width: 380px) {
    .back-home {
      left: 10px;
      padding: 6px 8px 6px 7px;
      font-size: 10px;
    }

    .admin-access {
      right: 10px;
      gap: 5px;
      padding: 6px 8px;
    }

    .admin-access-copy small {
      display: none;
    }

    .admin-access-icon {
      width: 26px;
      height: 26px;
    }

    .admin-status-dot {
      display: none;
    }

    .login-card {
      padding-left: 20px;
      padding-right: 20px;
    }

  }

}

</style>
