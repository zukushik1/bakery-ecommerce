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
    const response = await api.post('/auth/login', {
      nama: username.value,
      password: password.value,
      role: 'admin'
    })

    // Simpan token JWT
    localStorage.setItem('token', response.data.token)

    // Simpan informasi user kalau nanti dibutuhkan
    localStorage.setItem('role', 'admin')
    localStorage.setItem('nama', username.value)

    // Masuk dashboard
    router.push('/dashboard')

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

      <!-- ADMIN ACCESS -->
      <div class="admin-access">
        🔒 &nbsp; Admin Access
      </div>


      <!-- LOGIN CARD -->
      <div class="login-card">

        <h2>
          Login Admin
        </h2>

        <p class="subtitle">
          Masuk untuk mengelola toko Jericho & Nesya
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

  padding: 70px 40px;

  background: #fffdfb;
}


/* =========================
   ADMIN ACCESS
========================= */

.admin-access {
  position: absolute;

  top: 5px;

  right: 8%;

  color: #9ba88f;

  font-size: 15px;
}


/* =========================
   LOGIN CARD
========================= */

.login-card {
  width: min(570px, 100%);

  min-height: 650px;

  position: relative;

  padding: 55px 50px 110px;

  background:
    rgba(255, 255, 255, 0.94);

  border-radius: 32px;

  box-shadow:
    0 15px 40px
    rgba(100, 100, 100, 0.08);

  overflow: hidden;
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

  transition: 0.2s;
}


.login-button:hover {
  background: #617658;
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
    align-items: flex-start;

    padding-top: 30px;
    padding-bottom: 30px;
  }


  .login-card {
    min-height: 630px;

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


  .admin-access {
    top: 5px;
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


  .admin-access {
    top: 25px;

    right: 50px;

    font-size: 16px;
  }


  .login-card {
    width: min(700px, 100%);

    min-height: 720px;

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

    padding: 30px 15px;
  }


  .admin-access {
    top: 20px;

    right: 20px;

    font-size: 13px;
  }


  .login-card {
    width: 100%;

    min-height: 680px;

    margin-top: 35px;

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

}

</style>