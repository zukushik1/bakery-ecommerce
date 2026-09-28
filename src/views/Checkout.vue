<template>
  <div class="checkout-page">

    <!-- ================= NAVBAR ================= -->
    <header class="navbar">
      <div class="nav-inner">

        <div class="logo" @click="goHome">
          <span class="logo-main">Jericho</span>
          <span class="logo-and">&</span>
          <span class="logo-main">Nesya</span>
        </div>

        <button class="back-button" @click="goHome">
          ← Kembali Belanja
        </button>

      </div>
    </header>


    <!-- ================= CONTENT ================= -->
    <main class="checkout-container">

      <div class="checkout-header">
        <p class="eyebrow">CHECKOUT</p>
        <h1>Selesaikan Pesanan</h1>
        <p>
          Lengkapi data di bawah untuk melanjutkan pesanan kamu.
        </p>
      </div>


      <!-- ================= EMPTY CART ================= -->
      <div v-if="cart.length === 0" class="empty-checkout">

        <div class="empty-icon">🛒</div>

        <h2>Keranjang Kamu Kosong</h2>

        <p>
          Tambahkan produk terlebih dahulu sebelum melakukan checkout.
        </p>

        <button class="primary-button" @click="goHome">
          KEMBALI BELANJA
        </button>

      </div>


      <!-- ================= CHECKOUT ================= -->
      <div v-else class="checkout-grid">

        <!-- ================= FORM ================= -->
        <section class="checkout-card">

          <div class="card-title">
            <h2>Informasi Pelanggan</h2>
            <p>Masukkan data penerima pesanan.</p>
          </div>

          <form @submit.prevent="submitOrder">

            <!-- NAMA -->
            <div class="form-group">
              <label for="nama">
                Nama Lengkap
              </label>

              <input
                id="nama"
                v-model.trim="form.nama_pelanggan"
                type="text"
                placeholder="Masukkan nama lengkap"
                autocomplete="name"
              />
            </div>


            <!-- NOMOR HP -->
            <div class="form-group">
              <label for="nomor_hp">
                Nomor HP
              </label>

              <input
                id="nomor_hp"
                v-model.trim="form.nomor_hp"
                type="tel"
                placeholder="Contoh: 081234567890"
                autocomplete="tel"
              />
            </div>


            <!-- ALAMAT -->
            <div class="form-group">
              <label for="alamat">
                Alamat Lengkap
              </label>

              <textarea
                id="alamat"
                v-model.trim="form.alamat"
                rows="5"
                placeholder="Masukkan alamat lengkap untuk pengiriman"
                autocomplete="street-address"
              ></textarea>
            </div>


            <!-- METODE PEMBAYARAN -->
            <div class="form-group">
              <label for="metode">
                Metode Pembayaran
              </label>

              <select
                id="metode"
                v-model="form.metode_pembayaran"
              >
                <option value="" disabled>
                  Pilih metode pembayaran
                </option>

                <option value="COD">
                  COD
                </option>

                <option value="Transfer Bank">
                  Transfer Bank
                </option>
              </select>
            </div>


            <!-- ERROR -->
            <div
              v-if="errorMessage"
              class="error-message"
            >
              {{ errorMessage }}
            </div>


            <!-- BUTTON -->
            <button
              type="submit"
              class="order-button"
              :disabled="loading"
            >
              <span v-if="loading">
                MEMPROSES...
              </span>

              <span v-else>
                BUAT PESANAN
              </span>
            </button>

          </form>

        </section>


        <!-- ================= RINGKASAN ================= -->
        <aside class="summary-card">

          <div class="card-title">
            <h2>Ringkasan Pesanan</h2>
            <p>{{ cartCount }} item dalam keranjang</p>
          </div>


          <!-- PRODUK -->
          <div class="product-list">

            <div
              v-for="item in cart"
              :key="item.id"
              class="checkout-product"
            >

              <div class="product-image">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                />

                <div
                  v-else
                  class="no-image"
                >
                  No Image
                </div>
              </div>


              <div class="product-info">

                <h3>
                  {{ item.name }}
                </h3>

                <p class="product-price">
                  {{ formatRupiah(item.price) }}
                </p>

                <p class="product-qty">
                  Qty: {{ item.quantity }}
                </p>

              </div>


              <div class="product-total">
                {{ formatRupiah(item.price * item.quantity) }}
              </div>

            </div>

          </div>


          <!-- TOTAL -->
          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Subtotal</span>
            <strong>
              {{ formatRupiah(cartTotal) }}
            </strong>
          </div>

          <div class="summary-row">
            <span>Pengiriman</span>
            <strong>Gratis</strong>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span>Total</span>

            <strong>
              {{ formatRupiah(cartTotal) }}
            </strong>
          </div>


          <div class="checkout-note">
            Pastikan data nama, nomor HP, dan alamat sudah benar
            sebelum membuat pesanan.
          </div>

        </aside>

      </div>

    </main>


    <!-- ================= SUCCESS MODAL ================= -->
    <div
      v-if="showSuccess"
      class="modal-overlay"
    >

      <div class="success-modal">

        <div class="success-icon">
          ✓
        </div>

        <h2>Pesanan Berhasil!</h2>

        <p>
          Pesanan kamu berhasil dibuat.
          Terima kasih sudah berbelanja di Jericho & Nesya.
        </p>

        <button
          class="primary-button"
          @click="goHome"
        >
          KEMBALI KE BERANDA
        </button>

      </div>

    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

// =========================
// CART
// =========================

const cart = ref([])

// =========================
// FORM
// =========================

const form = ref({
  nama_pelanggan: '',
  nomor_hp: '',
  alamat: '',
  metode_pembayaran: ''
})

// =========================
// STATE
// =========================

const loading = ref(false)
const errorMessage = ref('')
const showSuccess = ref(false)

// =========================
// COMPUTED
// =========================

const cartCount = computed(() => {
  return cart.value.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  )
})

const cartTotal = computed(() => {
  return cart.value.reduce(
    (total, item) => {
      return total +
        Number(item.price || 0) *
        Number(item.quantity || 0)
    },
    0
  )
})

// =========================
// LOAD CART
// =========================

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem('checkout_cart')

    if (!savedCart) {
      cart.value = []
      return
    }

    const parsedCart = JSON.parse(savedCart)

    if (Array.isArray(parsedCart)) {
      cart.value = parsedCart
    } else {
      cart.value = []
    }

  } catch (error) {
    console.error('Gagal mengambil checkout cart:', error)
    cart.value = []
  }
}

// =========================
// FORMAT RUPIAH
// =========================

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)
}

// =========================
// HOME
// =========================

const goHome = () => {
  router.push('/')
}

// =========================
// SUBMIT ORDER
// =========================

const submitOrder = async () => {
  errorMessage.value = ''

  // =========================
  // VALIDASI
  // =========================

  if (!form.value.nama_pelanggan) {
    errorMessage.value = 'Nama lengkap wajib diisi.'
    return
  }

  if (!form.value.nomor_hp) {
    errorMessage.value = 'Nomor HP wajib diisi.'
    return
  }

  if (!form.value.alamat) {
    errorMessage.value = 'Alamat wajib diisi.'
    return
  }

  if (!form.value.metode_pembayaran) {
    errorMessage.value = 'Silakan pilih metode pembayaran.'
    return
  }

  if (!cart.value.length) {
    errorMessage.value = 'Keranjang kamu kosong.'
    return
  }

  // =========================
  // PROSES ORDER
  // =========================

  loading.value = true

  try {

    /*
     * Backend /api/pesanan hanya menerima
     * satu id_produk dalam satu pesanan.
     *
     * Jadi setiap item dalam cart
     * dikirim sebagai satu pesanan.
     */

    for (const item of cart.value) {

      const payload = {
        id_petugas: 0,
        id_produk: Number(item.id),
        qty: Number(item.quantity),
        alamat: form.value.alamat,
        nama_pelanggan: form.value.nama_pelanggan,
        nomor_hp: form.value.nomor_hp,
        total_pesanan:
          Number(item.price || 0) *
          Number(item.quantity || 0),
        metode_pembayaran: form.value.metode_pembayaran,
        status: 'Menunggu'
      }

      console.log('Mengirim pesanan:', payload)

      await api.post('/pesanan', payload)
    }

    // =========================
    // BERHASIL
    // =========================

    localStorage.removeItem('checkout_cart')
    localStorage.removeItem('shopping_cart')

    showSuccess.value = true

  } catch (error) {

    console.error('Checkout error:', error)

    errorMessage.value =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      'Pesanan gagal dibuat. Silakan coba lagi.'

  } finally {

    loading.value = false

  }
}

// =========================
// MOUNT
// =========================

onMounted(() => {
  loadCart()
})
</script>


<style scoped>
/* =========================
   PAGE
========================= */

.checkout-page {
  min-height: 100vh;
  background: #f8faf8;
  color: #26352c;
}


/* =========================
   NAVBAR
========================= */

.navbar {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7ece8;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 76px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 21px;
  font-weight: 700;
}

.logo-main {
  color: #31483a;
}

.logo-and {
  color: #91ad98;
  font-weight: 500;
}

.back-button {
  border: 1px solid #dce5de;
  background: #ffffff;
  color: #425448;

  padding: 10px 18px;
  border-radius: 9px;

  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  transition: 0.2s;
}

.back-button:hover {
  background: #f1f6f2;
}


/* =========================
   CONTAINER
========================= */

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 55px 24px 80px;
}


/* =========================
   HEADER
========================= */

.checkout-header {
  margin-bottom: 35px;
}

.eyebrow {
  margin: 0 0 8px;

  color: #87a18e;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.checkout-header h1 {
  margin: 0;

  color: #26382d;
  font-size: 36px;
  font-weight: 700;
}

.checkout-header p:last-child {
  margin: 10px 0 0;

  color: #758178;
  font-size: 15px;
}


/* =========================
   GRID
========================= */

.checkout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(350px, 0.75fr);
  gap: 25px;
  align-items: start;
}


/* =========================
   CARD
========================= */

.checkout-card,
.summary-card {
  background: #ffffff;
  border: 1px solid #e5ebe6;
  border-radius: 16px;
  padding: 28px;

  box-shadow: 0 8px 30px rgba(44, 67, 51, 0.05);
}

.card-title {
  margin-bottom: 25px;
}

.card-title h2 {
  margin: 0;

  color: #2c4032;
  font-size: 21px;
}

.card-title p {
  margin: 7px 0 0;

  color: #879189;
  font-size: 13px;
}


/* =========================
   FORM
========================= */

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;

  color: #435248;
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #dce5de;
  border-radius: 10px;

  background: #fbfcfb;
  color: #29382e;

  padding: 13px 14px;

  font-family: inherit;
  font-size: 14px;

  outline: none;

  transition: 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #91ad98;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(145, 173, 152, 0.12);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}


/* =========================
   ERROR
========================= */

.error-message {
  margin-bottom: 18px;
  padding: 12px 14px;

  border-radius: 9px;
  border: 1px solid #efd4d4;

  background: #fff7f7;
  color: #b24d4d;

  font-size: 13px;
}


/* =========================
   ORDER BUTTON
========================= */

.order-button,
.primary-button {
  width: 100%;
  border: none;

  background: #526d5a;
  color: #ffffff;

  padding: 14px 20px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;

  cursor: pointer;

  transition: 0.2s;
}

.order-button:hover,
.primary-button:hover {
  background: #435c4b;
}

.order-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}


/* =========================
   PRODUCT LIST
========================= */

.product-list {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.checkout-product {
  display: grid;
  grid-template-columns: 65px minmax(0, 1fr) auto;
  gap: 13px;
  align-items: center;
}

.product-image {
  width: 65px;
  height: 65px;

  border-radius: 10px;
  overflow: hidden;

  background: #edf2ee;
}

.product-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #8b968e;
  font-size: 9px;
  text-align: center;
}

.product-info {
  min-width: 0;
}

.product-info h3 {
  margin: 0 0 5px;

  color: #35463b;
  font-size: 14px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  margin: 0;

  color: #61766a;
  font-size: 12px;
}

.product-qty {
  margin: 3px 0 0;

  color: #909a94;
  font-size: 11px;
}

.product-total {
  color: #3c5042;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}


/* =========================
   SUMMARY
========================= */

.summary-card {
  position: sticky;
  top: 100px;
}

.summary-divider {
  height: 1px;
  background: #e9eeea;
  margin: 20px 0;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 13px;

  color: #78837b;
  font-size: 14px;
}

.summary-row strong {
  color: #405146;
  font-size: 14px;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-total span {
  color: #304136;
  font-size: 17px;
  font-weight: 700;
}

.summary-total strong {
  color: #4f6958;
  font-size: 20px;
}

.checkout-note {
  margin-top: 22px;
  padding: 13px;

  border-radius: 9px;

  background: #f5f8f5;
  color: #78847c;

  font-size: 11px;
  line-height: 1.6;
}


/* =========================
   EMPTY
========================= */

.empty-checkout {
  max-width: 550px;
  margin: 50px auto;
  padding: 55px 30px;

  background: #ffffff;
  border: 1px solid #e5ebe6;
  border-radius: 16px;

  text-align: center;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.empty-checkout h2 {
  margin: 0;

  color: #35463b;
  font-size: 22px;
}

.empty-checkout p {
  margin: 10px 0 25px;

  color: #7c877f;
  font-size: 14px;
}

.empty-checkout .primary-button {
  width: auto;
  min-width: 190px;
}


/* =========================
   SUCCESS MODAL
========================= */

.modal-overlay {
  position: fixed;
  inset: 0;

  background: rgba(28, 42, 33, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  z-index: 100;
}

.success-modal {
  width: 100%;
  max-width: 430px;

  background: #ffffff;
  border-radius: 18px;

  padding: 38px 30px;

  text-align: center;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.success-icon {
  width: 58px;
  height: 58px;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #edf5ef;
  color: #54705d;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 700;
}

.success-modal h2 {
  margin: 0;

  color: #304136;
  font-size: 23px;
}

.success-modal p {
  margin: 12px 0 25px;

  color: #7b867e;
  font-size: 14px;
  line-height: 1.6;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 850px) {

  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }

}


@media (max-width: 600px) {

  .nav-inner {
    height: 68px;
    padding: 0 16px;
  }

  .logo {
    font-size: 18px;
  }

  .back-button {
    padding: 8px 12px;
    font-size: 12px;
  }

  .checkout-container {
    padding: 35px 16px 60px;
  }

  .checkout-header h1 {
    font-size: 28px;
  }

  .checkout-card,
  .summary-card {
    padding: 20px;
    border-radius: 13px;
  }

  .checkout-product {
    grid-template-columns: 55px minmax(0, 1fr);
  }

  .product-image {
    width: 55px;
    height: 55px;
  }

  .product-total {
    grid-column: 2;
    margin-top: -8px;
  }

}
</style>