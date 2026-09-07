<template>
  <div class="home-page">

    <!-- ================= NAVBAR ================= -->
    <header class="navbar">
      <div class="nav-inner">

        <!-- LOGO -->
        <div class="logo">
          <img :src="logo" alt="Jericho & Nesya">
        </div>

        <!-- DESKTOP MENU -->
        <nav class="desktop-nav">

          <a
            href="#beranda"
            :class="{ active: activeSection === 'beranda' }"
            @click.prevent="scrollToSection('beranda')"
          >
            Beranda
          </a>

          <a
            href="#produk"
            :class="{ active: activeSection === 'produk' }"
            @click.prevent="scrollToSection('produk')"
          >
            Produk
          </a>

          <a
            href="#tentang-kami"
            :class="{ active: activeSection === 'tentang-kami' }"
            @click.prevent="scrollToSection('tentang-kami')"
          >
            Tentang Kami
          </a>

          <a
            href="#cara-pemesanan"
            :class="{ active: activeSection === 'cara-pemesanan' }"
            @click.prevent="scrollToSection('cara-pemesanan')"
          >
            Cara Pemesanan
          </a>

          <a
            href="#kontak"
            :class="{ active: activeSection === 'kontak' }"
            @click.prevent="scrollToSection('kontak')"
          >
            Kontak
          </a>

        </nav>

        <!-- NAV ACTIONS -->
        <div class="nav-actions">

          <!-- SEARCH -->
          <button
            class="icon-button"
            title="Cari produk"
            @click="showSearch = !showSearch"
          >
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4"></path>
            </svg>
          </button>

          <!-- LOGIN ADMIN / PETUGAS -->
          <button
            class="login-button"
            title="Login Admin/Petugas"
            @click="goToLogin"
          >
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.5"></circle>
              <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6"></path>
            </svg>

            <span class="login-label">
              Login Admin/Petugas
            </span>
          </button>

          <!-- CART -->
          <button
            class="icon-button cart-button"
            title="Keranjang"
            @click="cartOpen = true"
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"></path>
              <circle cx="10" cy="20" r="1.2"></circle>
              <circle cx="18" cy="20" r="1.2"></circle>
            </svg>

            <span
              v-if="cartCount > 0"
              class="cart-badge"
            >
              {{ cartCount }}
            </span>
          </button>

          <!-- HAMBURGER -->
          <button
            class="hamburger"
            :class="{ open: mobileMenuOpen }"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </div>

      <!-- SEARCH BAR -->
      <div v-if="showSearch" class="search-area">

        <div class="search-box">

          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-4-4"></path>
          </svg>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kue favoritmu..."
          />

          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
          >
            ×
          </button>

        </div>

      </div>

      <!-- MOBILE MENU -->
      <Transition name="mobile-menu">

        <div
          v-if="mobileMenuOpen"
          class="mobile-nav"
        >

          <a
            href="#beranda"
            @click.prevent="mobileNavigate('beranda')"
          >
            Beranda
          </a>

          <a
            href="#produk"
            @click.prevent="mobileNavigate('produk')"
          >
            Produk
          </a>

          <a
            href="#tentang-kami"
            @click.prevent="mobileNavigate('tentang-kami')"
          >
            Tentang Kami
          </a>

          <a
            href="#cara-pemesanan"
            @click.prevent="mobileNavigate('cara-pemesanan')"
          >
            Cara Pemesanan
          </a>

          <a
            href="#kontak"
            @click.prevent="mobileNavigate('kontak')"
          >
            Kontak
          </a>

          <button
            class="mobile-login"
            @click="goToLogin"
          >
            👤 Login Admin/Petugas
          </button>

        </div>

      </Transition>

    </header>


    <!-- ================= HERO ================= -->
    <main>

      <section
        id="beranda"
        class="hero section-target"
      >

        <div class="hero-content">

          <div class="hero-text">

            <h1>
              Kue Lezat
              <span>Alami & Sehat</span>
            </h1>

            <p class="hero-description">
              Terbuat dari bahan-bahan alami pilihan,
              tanpa pengawet, dan dibuat dengan penuh cinta.
            </p>

            <div class="hero-buttons">

              <button
                class="btn-primary"
                @click="scrollToSection('produk')"
              >
                Lihat Produk
              </button>

              <button
                class="btn-secondary"
                @click="scrollToSection('tentang-kami')"
              >
                Tentang Kami
              </button>

            </div>

            <div class="hero-features">

              <div>
                <span class="feature-icon">♧</span>

                <p>
                  Bahan Alami<br>
                  Pilihan
                </p>
              </div>

              <div>
                <span class="feature-icon">♡</span>

                <p>
                  Tanpa Pengawet<br>
                  & Bahan Kimia
                </p>
              </div>

              <div>
                <span class="feature-icon">✿</span>

                <p>
                  Freshly Made<br>
                  Everyday
                </p>
              </div>

            </div>

          </div>


          <div class="hero-image">

            <div class="hero-image-bg"></div>

            <img
              :src="cakeLogoKanan"
              alt="Kue Jericho & Nesya"
            >

          </div>

        </div>

      </section>


      <!-- ================= PRODUK ================= -->
      <section
        id="produk"
        class="products-section section-target"
      >

        <div class="section-heading">

          <h2>Produk Favorit</h2>

          <span>
            Kue sehat dan lezat pilihan favorit pelanggan kami
          </span>

        </div>


        <!-- PRODUK -->
        <div class="products-container">

          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >

            <div
              class="product-image"
              @click="openProduct(product)"
            >

              <img
                :src="product.image"
                :alt="product.name"
              >

            </div>


            <div class="product-info">

              <h3>
                {{ product.name }}
              </h3>

              <p>
                {{ product.description }}
              </p>


              <div class="product-bottom">

                <strong>
                  Rp {{ formatPrice(product.price) }}
                </strong>


                <button
                  class="add-button"
                  title="Tambah ke keranjang"
                  @click="addToCart(product)"
                >

                  <svg viewBox="0 0 24 24">
                    <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"></path>
                    <circle cx="10" cy="20" r="1"></circle>
                    <circle cx="18" cy="20" r="1"></circle>
                  </svg>

                </button>

              </div>

            </div>

          </div>

        </div>


        <!-- PRODUK TIDAK DITEMUKAN -->
        <div
          v-if="filteredProducts.length === 0"
          class="empty-product"
        >
          Produk yang kamu cari tidak ditemukan.
        </div>


        <!-- TOMBOL LIHAT SEMUA -->
        <button
          v-if="!showAllProducts && !searchQuery"
          class="all-products-button"
          @click="showAllProducts = true"
        >
          Lihat Semua Produk
        </button>


        <!-- TOMBOL SEMBUNYIKAN -->
        <button
          v-else-if="!searchQuery"
          class="all-products-button"
          @click="showAllProducts = false"
        >
          Sembunyikan Produk
        </button>


        <!-- PRODUK TAMBAHAN -->
        <Transition name="products-expand">

          <div
            v-if="showAllProducts && !searchQuery"
            class="all-products-area"
          >

            <div class="all-products-title">
              <h3>Semua Produk</h3>

              <p>
                Temukan lebih banyak pilihan kue favoritmu
              </p>
            </div>


            <div class="products-container extra-products">

              <div
                v-for="product in extraProducts"
                :key="product.id"
                class="product-card"
              >

                <div
                  class="product-image"
                  @click="openProduct(product)"
                >

                  <img
                    :src="product.image"
                    :alt="product.name"
                  >

                </div>


                <div class="product-info">

                  <h3>
                    {{ product.name }}
                  </h3>

                  <p>
                    {{ product.description }}
                  </p>


                  <div class="product-bottom">

                    <strong>
                      Rp {{ formatPrice(product.price) }}
                    </strong>


                    <button
                      class="add-button"
                      title="Tambah ke keranjang"
                      @click="addToCart(product)"
                    >

                      <svg viewBox="0 0 24 24">
                        <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"></path>
                        <circle cx="10" cy="20" r="1"></circle>
                        <circle cx="18" cy="20" r="1"></circle>
                      </svg>

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </Transition>

      </section>


      <!-- ================= TENTANG KAMI ================= -->
      <section
        id="tentang-kami"
        class="about-section section-target"
      >

        <div class="about-container">

          <div class="about-image">

            <img
              :src="cakeHero1"
              alt="Jericho & Nesya"
            >

          </div>


          <div class="about-content">

            <p class="section-label">
              TENTANG KAMI
            </p>

            <h2>
              Lebih dari<br>
              <span>Sekadar Kue</span>
            </h2>

            <p>
              Jericho & Nesya hadir dengan membawa kue yang
              tidak hanya lezat, tetapi juga dibuat menggunakan
              bahan-bahan pilihan.
            </p>

            <p>
              Kami percaya bahwa makanan yang baik dapat
              membuat hari menjadi lebih baik. Karena itu,
              setiap produk dibuat dengan perhatian dan cinta.
            </p>


            <div class="about-points">

              <div>
                <strong>100%</strong>
                <span>Bahan pilihan</span>
              </div>

              <div>
                <strong>Fresh</strong>
                <span>Dibuat setiap hari</span>
              </div>

              <div>
                <strong>♡</strong>
                <span>Dibuat dengan cinta</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- ================= CARA PEMESANAN ================= -->
      <section
        id="cara-pemesanan"
        class="order-section section-target"
      >

        <div class="section-heading">

          <p>CARA PEMESANAN</p>

          <h2>Mudah untuk Memesan</h2>

          <span>
            Nikmati kue favoritmu dengan beberapa langkah sederhana
          </span>

        </div>


        <div class="steps">

          <div class="step">

            <div class="step-number">
              01
            </div>

            <div>

              <h3>Pilih Produk</h3>

              <p>
                Pilih kue yang ingin kamu pesan dari berbagai
                produk yang tersedia.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              02
            </div>

            <div>

              <h3>Masukkan Keranjang</h3>

              <p>
                Tentukan jumlah produk lalu masukkan ke
                keranjang belanja.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              03
            </div>

            <div>

              <h3>Lakukan Pemesanan</h3>

              <p>
                Periksa kembali pesanan kemudian lanjutkan
                ke proses pembelian.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              04
            </div>

            <div>

              <h3>Pesanan Diproses</h3>

              <p>
                Pesanan kamu akan diproses dan disiapkan
                oleh tim Jericho & Nesya.
              </p>

            </div>

          </div>

        </div>

      </section>


      <!-- ================= KONTAK ================= -->
      <section
        id="kontak"
        class="contact-section section-target"
      >

        <div class="contact-card">

          <div>

            <p class="section-label">
              HUBUNGI KAMI
            </p>

            <h2>
              Ada yang ingin<br>
              kamu tanyakan?
            </h2>

            <p>
              Jangan ragu untuk menghubungi kami mengenai
              produk maupun pesanan kamu.
            </p>

          </div>


          <div class="contact-info">

            <div class="contact-item">

              <span>☎</span>

              <div>

                <small>Telepon</small>

                <strong>
                  0822-8326-2013
                </strong>

              </div>

            </div>


            <div class="contact-item">

              <span>✉</span>

              <div>

                <small>Email</small>

                <strong>
                  jerichoselectravaviaan@email.com
                </strong>

              </div>

            </div>


            <div class="contact-item">

              <span>⌂</span>

              <div>

                <small>Alamat</small>

                <strong>
                  Indonesia
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>


    <!-- ================= FOOTER ================= -->
    <footer class="footer">

      <div class="footer-inner">

        <div class="footer-brand">

          <img
            :src="logo"
            alt="Jericho & Nesya"
          >

          <p>
            Raw, Organic & Healthy
          </p>

          <span>
            Good Ingredients,<br>
            Brighter Days ♡
          </span>

        </div>


        <div class="footer-links">

          <h3>Navigasi</h3>

          <button @click="scrollToSection('beranda')">
            Beranda
          </button>

          <button @click="scrollToSection('produk')">
            Produk
          </button>

          <button @click="scrollToSection('tentang-kami')">
            Tentang Kami
          </button>

          <button @click="scrollToSection('cara-pemesanan')">
            Cara Pemesanan
          </button>

          <button @click="scrollToSection('kontak')">
            Kontak
          </button>

        </div>

      </div>


      <div class="footer-bottom">
        © 2026 Jericho & Nesya. All Rights Reserved.
      </div>

    </footer>


    <!-- ================= PRODUCT MODAL ================= -->
    <Transition name="fade">

      <div
        v-if="selectedProduct"
        class="modal-overlay"
        @click.self="selectedProduct = null"
      >

        <div class="product-modal">

          <button
            class="close-modal"
            @click="selectedProduct = null"
          >
            ×
          </button>


          <img
            :src="selectedProduct.image"
            :alt="selectedProduct.name"
          >


          <div class="modal-content">

            <h2>
              {{ selectedProduct.name }}
            </h2>

            <p>
              {{ selectedProduct.description }}
            </p>

            <strong>
              Rp {{ formatPrice(selectedProduct.price) }}
            </strong>


            <div class="quantity">

              <button @click="decreaseQuantity">
                −
              </button>

              <span>
                {{ selectedQuantity }}
              </span>

              <button @click="selectedQuantity++">
                +
              </button>

            </div>


            <button
              class="modal-add"
              @click="addSelectedToCart"
            >
              Tambah ke Keranjang -
              Rp {{ formatPrice(selectedProduct.price * selectedQuantity) }}
            </button>

          </div>

        </div>

      </div>

    </Transition>


    <!-- ================= CART DRAWER ================= -->
    <Transition name="drawer">

      <div
        v-if="cartOpen"
        class="cart-overlay"
        @click.self="cartOpen = false"
      >

        <aside class="cart-drawer">

          <div class="cart-header">

            <h2>
              Keranjang
            </h2>

            <button @click="cartOpen = false">
              ×
            </button>

          </div>


          <div
            v-if="cart.length === 0"
            class="empty-cart"
          >

            <div class="empty-cart-icon">
              🛒
            </div>

            <h3>
              Keranjang masih kosong
            </h3>

            <p>
              Yuk pilih kue favorit kamu.
            </p>

            <button
              @click="cartOpen = false; scrollToSection('produk')"
            >
              Lihat Produk
            </button>

          </div>


          <div
            v-else
            class="cart-content"
          >

            <div
              v-for="item in cart"
              :key="item.id"
              class="cart-item"
            >

              <img
                :src="item.image"
                :alt="item.name"
              >


              <div class="cart-item-info">

                <h3>
                  {{ item.name }}
                </h3>

                <p>
                  Qty: {{ item.quantity }}
                </p>

                <strong>
                  Rp {{ formatPrice(item.price * item.quantity) }}
                </strong>

              </div>


              <button
                class="remove-item"
                @click="removeFromCart(item.id)"
              >
                ×
              </button>

            </div>


            <button
              class="continue-shopping"
              @click="cartOpen = false"
            >
              LANJUT BELANJA
            </button>


            <div class="cart-total">

              <div>

                <span>
                  Total
                </span>

                <strong>
                  Rp {{ formatPrice(cartTotal) }}
                </strong>

              </div>


              <button class="buy-button">
                BELI SEKARANG
              </button>

            </div>

          </div>

        </aside>

      </div>

    </Transition>

  </div>
</template>


<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '../assets/images/logo.webp'
import cakeLogoKanan from '../assets/images/cake-logokanan.jpg'
import cakeHero1 from '../assets/images/cake-hero1.jpg'
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


/* ================= STATE ================= */

const mobileMenuOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')

const cartOpen = ref(false)

const selectedProduct = ref(null)
const selectedQuantity = ref(1)

const activeSection = ref('beranda')

/* TOMBOL LIHAT SEMUA PRODUK */
const showAllProducts = ref(false)


/* ================= PRODUCTS ================= */

const products = ref([
  {
    id: 1,
    name: 'Brownies Almond',
    description: 'Brownies dengan almond dan dark chocolate premium.',
    price: 35000,
    image: brownies
  },

  {
    id: 2,
    name: 'Strawberry Fresh Cake',
    description: 'Sponge cake lembut dengan krim segar dan stroberi asli.',
    price: 80000,
    image: strawberryCake
  },

  {
    id: 3,
    name: 'Matcha Cupcake',
    description: 'Cupcake matcha dengan krim lembut, tidak terlalu manis.',
    price: 25000,
    image: matchaCupcake
  },

  {
    id: 4,
    name: 'Oatmeal Cookies',
    description: 'Cookies gandum utuh dengan kismis dan madu alami.',
    price: 30000,
    image: oatmealCookies
  },

  {
    id: 5,
    name: 'Chocolate Cake',
    description: 'Kue cokelat lembut dengan rasa cokelat premium.',
    price: 70000,
    image: chocolateCake
  },

  {
    id: 6,
    name: 'Red Velvet Cake',
    description: 'Red velvet lembut dengan cream cheese yang creamy.',
    price: 75000,
    image: redVelvetCake
  },

  {
    id: 7,
    name: 'Tiramisu Cake',
    description: 'Kue tiramisu lembut dengan rasa kopi yang nikmat.',
    price: 75000,
    image: tiramisuCake
  },

  {
    id: 8,
    name: 'Matcha Cake',
    description: 'Kue matcha lembut dengan aroma teh hijau yang khas.',
    price: 65000,
    image: matchaCake
  },

  {
    id: 9,
    name: 'Cheese Cake',
    description: 'Cheesecake lembut dengan rasa keju yang creamy.',
    price: 65000,
    image: cheeseCake
  },

  {
    id: 10,
    name: 'Black Forest Cake',
    description: 'Kue cokelat dengan krim lembut dan rasa cherry.',
    price: 70000,
    image: blackForestCake
  },

  {
    id: 11,
    name: 'Caramel Cake',
    description: 'Kue lembut dengan saus caramel yang manis dan nikmat.',
    price: 65000,
    image: caramelCake
  },

  {
    id: 12,
    name: 'Fruit Cake',
    description: 'Kue segar dengan topping buah-buahan pilihan.',
    price: 60000,
    image: fruitCake
  },

  {
    id: 13,
    name: 'Banana Bread',
    description: 'Roti pisang lembut dengan aroma pisang yang harum.',
    price: 45000,
    image: bananaBread
  },

  {
    id: 14,
    name: 'Carrot Cake',
    description: 'Kue wortel lembut dengan rasa manis yang pas.',
    price: 60000,
    image: carrotCake
  },

  {
    id: 15,
    name: 'Blueberry Tart',
    description: 'Tart lembut dengan blueberry segar dan rasa manis asam.',
    price: 55000,
    image: blueberryTart
  },

  {
    id: 16,
    name: 'Lemon Cake',
    description: 'Kue lemon lembut dengan rasa segar dan sedikit asam.',
    price: 55000,
    image: lemonCake
  }
])


const extraProducts = computed(() => products.value.slice(4))


/* ================= CART ================= */

const cart = ref([])


const cartCount = computed(() => {

  return cart.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)

})


const cartTotal = computed(() => {

  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

})


/* ================= SEARCH ================= */

const filteredProducts = computed(() => {

  const query = searchQuery.value
    .toLowerCase()
    .trim()

  if (query) {
    return products.value.filter(product =>
      product.name
        .toLowerCase()
        .includes(query)
    )
  }

  return products.value.slice(0, 4)
})


/* ================= FORMAT PRICE ================= */

const formatPrice = (price) => {

  return new Intl.NumberFormat('id-ID').format(price)

}


/* ================= SCROLL ================= */

const scrollToSection = (id) => {

  const section = document.getElementById(id)


  if (section) {

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }

}


const mobileNavigate = (id) => {

  mobileMenuOpen.value = false

  setTimeout(() => {

    scrollToSection(id)

  }, 100)

}


/* ================= LOGIN ================= */

const goToLogin = () => {

  mobileMenuOpen.value = false

  router.push('/login')

}


/* ================= PRODUCT ================= */

const openProduct = (product) => {

  selectedProduct.value = product

  selectedQuantity.value = 1

}


const decreaseQuantity = () => {

  if (selectedQuantity.value > 1) {

    selectedQuantity.value--

  }

}


/* ================= CART ================= */

const addToCart = (product) => {

  const existing = cart.value.find(
    item => item.id === product.id
  )


  if (existing) {

    existing.quantity++

  } else {

    cart.value.push({
      ...product,
      quantity: 1
    })

  }


}


const addSelectedToCart = () => {

  if (!selectedProduct.value) return


  const existing = cart.value.find(
    item => item.id === selectedProduct.value.id
  )


  if (existing) {

    existing.quantity += selectedQuantity.value

  } else {

    cart.value.push({
      ...selectedProduct.value,
      quantity: selectedQuantity.value
    })

  }


  selectedProduct.value = null

  selectedQuantity.value = 1

}


const removeFromCart = (id) => {

  cart.value = cart.value.filter(
    item => item.id !== id
  )

}


/* ================= ACTIVE SECTION ================= */

const handleScroll = () => {

  const sections = [
    'beranda',
    'produk',
    'tentang-kami',
    'cara-pemesanan',
    'kontak'
  ]


  const scrollPosition =
    window.scrollY + 150


  for (const id of sections) {

    const section =
      document.getElementById(id)


    if (!section) continue


    const top = section.offsetTop

    const bottom =
      top + section.offsetHeight


    if (
      scrollPosition >= top &&
      scrollPosition < bottom
    ) {

      activeSection.value = id

      break

    }

  }

}


onMounted(() => {

  window.addEventListener(
    'scroll',
    handleScroll
  )

  handleScroll()

})


onUnmounted(() => {

  window.removeEventListener(
    'scroll',
    handleScroll
  )

})
</script>


<style scoped>

/* =====================================================
   GLOBAL
===================================================== */

.home-page {

  --green: #527546;
  --green-dark: #405d38;
  --green-light: #eaf1df;

  --pink: #f6b6b5;
  --pink-light: #fde9e8;

  --cream: #f7f6e9;
  --white: #ffffff;

  --text: #171717;
  --muted: #686868;

  min-height: 100vh;

  background: var(--pink-light);

  color: var(--text);

  /*
    PENTING:
    Mencegah scroll ke samping.
  */
  width: 100%;

  max-width: 100%;

  overflow-x: hidden;

}


* {

  box-sizing: border-box;

}


button,
a {

  font-family: inherit;

}


button {

  cursor: pointer;

}


/* =====================================================
   NAVBAR
===================================================== */

.navbar {

  /*
    DIUBAH DARI STICKY MENJADI FIXED
    Supaya navbar selalu ikut saat scroll.
  */

  position: fixed;

  top: 14px;

  left: 14px;

  right: 14px;

  z-index: 1000;

  background: rgba(255, 255, 255, 0.97);

  border-radius: 28px;

  box-shadow:
    0 8px 30px rgba(50, 50, 50, 0.06);

}


/* Supaya bagian paling atas tidak ketutup navbar */
main {

  padding-top: 102px;

}


.nav-inner {

  min-height: 88px;

  display: flex;

  align-items: center;

  padding: 10px 34px;

  max-width: 100%;

}


/* =====================================================
   LOGO
===================================================== */

.logo {

  width: 170px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  cursor: default;

}


.logo img {

  width: 100%;

  height: auto;

  display: block;

}


/* =====================================================
   DESKTOP NAV
===================================================== */

.desktop-nav {

  flex: 1;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

}


.desktop-nav a {

  color: #151515;

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;

  padding: 12px 17px;

  border-radius: 25px;

  transition: 0.25s ease;

  white-space: nowrap;

}


.desktop-nav a:hover,
.desktop-nav a.active {

  background: #e5e5e5;

}


/* =====================================================
   NAV ACTIONS
===================================================== */

.nav-actions {

  display: flex;

  align-items: center;

  gap: 8px;

  flex-shrink: 0;

}


.icon-button {

  position: relative;

  width: 42px;

  height: 42px;

  border: 0;

  background: transparent;

  display: grid;

  place-items: center;

  color: var(--green);

  transition: 0.2s ease;

}


.icon-button:hover {

  background: var(--green-light);

  border-radius: 50%;

}


.icon-button svg,
.login-button svg {

  width: 22px;

  height: 22px;

  fill: none;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;

  stroke-linejoin: round;

}


/* =====================================================
   LOGIN BUTTON
===================================================== */

.login-button {

  min-height: 42px;

  border: 0;

  background: transparent;

  color: var(--green);

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  padding: 0 8px;

  border-radius: 22px;

  transition: 0.2s ease;

}


.login-button:hover {

  background: var(--green-light);

}


.login-label {

  font-size: 11px;

  font-weight: 800;

  white-space: nowrap;

}


/* =====================================================
   CART BADGE
===================================================== */

.cart-badge {

  position: absolute;

  top: 1px;

  right: 1px;

  min-width: 17px;

  height: 17px;

  padding: 0 4px;

  border-radius: 20px;

  background: var(--pink);

  color: #fff;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 10px;

  font-weight: 800;

}


/* =====================================================
   SEARCH
===================================================== */

.search-area {

  padding: 0 34px 18px;

}


.search-box {

  max-width: 600px;

  margin: auto;

  height: 48px;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 0 15px;

  border: 1px solid #ddd;

  border-radius: 15px;

  background: #fafafa;

}


.search-box svg {

  width: 20px;

  height: 20px;

  fill: none;

  stroke: var(--green);

  stroke-width: 2;

}


.search-box input {

  flex: 1;

  min-width: 0;

  border: 0;

  outline: 0;

  background: transparent;

  font-size: 14px;

}


.search-box button {

  border: 0;

  background: none;

  font-size: 22px;

}


/* =====================================================
   HAMBURGER
===================================================== */

.hamburger {

  width: 44px;

  height: 44px;

  border: 0;

  background: transparent;

  display: none;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  gap: 5px;

}


.hamburger span {

  width: 23px;

  height: 2px;

  background: var(--green);

  border-radius: 3px;

  transition: 0.25s ease;

}


.hamburger.open span:nth-child(1) {

  transform:
    translateY(7px)
    rotate(45deg);

}


.hamburger.open span:nth-child(2) {

  opacity: 0;

}


.hamburger.open span:nth-child(3) {

  transform:
    translateY(-7px)
    rotate(-45deg);

}


/* =====================================================
   MOBILE MENU
===================================================== */

.mobile-nav {

  display: none;

}


.mobile-login {

  border: 0;

  background: var(--green-light);

  color: var(--green-dark);

  padding: 13px 14px;

  border-radius: 12px;

  text-align: left;

  font-size: 14px;

  font-weight: 800;

}


/* =====================================================
   HERO
===================================================== */

.hero {

  min-height: 620px;

  margin: 0 14px;

  background: var(--cream);

  border-radius: 0 0 35px 35px;

  overflow: hidden;

}


.hero-content {

  min-height: 620px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  align-items: center;

  padding: 50px 75px;

}


.hero-text {

  position: relative;

  z-index: 2;

}


.hero h1 {

  color: var(--green-dark);

  font-family: Georgia, serif;

  font-size: clamp(48px, 5vw, 72px);

  line-height: 0.98;

  margin-bottom: 25px;

}


.hero h1 span {

  display: block;

  color: #ee999b;

}


.hero-description {

  max-width: 410px;

  color: #555;

  line-height: 1.8;

  margin-bottom: 28px;

}


.hero-buttons {

  display: flex;

  gap: 12px;

}


.btn-primary,
.btn-secondary {

  border: 0;

  min-width: 140px;

  padding: 13px 23px;

  border-radius: 30px;

  font-weight: 700;

  transition: 0.2s ease;

}


.btn-primary {

  color: white;

  background: #238b27;

}


.btn-primary:hover {

  background: #1d7121;

  transform: translateY(-2px);

}


.btn-secondary {

  background: #fff0ef;

  color: #444;

}


.btn-secondary:hover {

  background: #f9d7d5;

}


.hero-features {

  display: flex;

  gap: 25px;

  margin-top: 35px;

}


.hero-features > div {

  display: flex;

  align-items: center;

  gap: 8px;

}


.feature-icon {

  width: 34px;

  height: 34px;

  border: 1px solid var(--green);

  color: var(--green);

  border-radius: 50%;

  display: grid;

  place-items: center;

}


.hero-features p {

  font-size: 11px;

  line-height: 1.3;

}


.hero-image {

  position: relative;

  min-height: 500px;

  display: flex;

  align-items: center;

  justify-content: center;

}


.hero-image-bg {

  position: absolute;

  width: 100%;

  height: 78%;

  right: -5%;

  background: #eff5dc;

  border-radius: 45% 0 0 45%;

}


.hero-image img {

  position: relative;

  width: min(90%, 570px);

  max-width: 100%;

  object-fit: contain;

  z-index: 2;

  filter:
    drop-shadow(0 20px 20px rgba(0,0,0,0.12));

}


/* =====================================================
   SECTION HEADING
===================================================== */

.section-heading {

  text-align: center;

  padding: 75px 20px 35px;

}


.section-heading p,
.section-label {

  color: var(--green);

  font-size: 11px;

  letter-spacing: 3px;

  font-weight: 800;

  margin-bottom: 8px;

}


.section-heading h2 {

  font-family: Georgia, serif;

  font-size: clamp(34px, 4vw, 48px);

  margin-bottom: 8px;

}


.section-heading span {

  color: #666;

  font-size: 14px;

}


/* =====================================================
   PRODUCTS
===================================================== */

.products-section {

  padding-bottom: 80px;

  scroll-margin-top: 120px;

}


.products-container {

  width: 100%;

  max-width: 1300px;

  margin: auto;

  padding: 0 30px;

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 16px;

}


.product-card {

  min-width: 0;

  background: #fff;

  padding: 14px;

  border-radius: 25px;

  transition: 0.25s ease;

  box-shadow:
    0 4px 15px rgba(0,0,0,0.03);

}


.product-card:hover {

  transform: translateY(-5px);

  box-shadow:
    0 12px 30px rgba(0,0,0,0.08);

}


.product-image {

  width: 100%;

  aspect-ratio: 1 / 0.9;

  overflow: hidden;

  border-radius: 20px;

  cursor: pointer;

}


.product-image img {

  width: 100%;

  height: 100%;

  object-fit: cover;

  transition: 0.35s ease;

}


.product-image:hover img {

  transform: scale(1.05);

}


.product-info {

  padding: 12px 4px 3px;

}


.product-info h3 {

  font-size: 16px;

  font-weight: 800;

  margin-bottom: 5px;

}


.product-info p {

  color: #555;

  font-size: 11px;

  line-height: 1.45;

  min-height: 34px;

  margin-bottom: 12px;

}


.product-bottom {

  display: flex;

  align-items: center;

  justify-content: space-between;

}


.product-bottom strong {

  font-size: 14px;

}


.add-button {

  width: 35px;

  height: 35px;

  border: 0;

  border-radius: 50%;

  background: #728968;

  display: grid;

  place-items: center;

  transition: 0.2s ease;

  flex-shrink: 0;

}


.add-button:hover {

  background: var(--green-dark);

  transform: scale(1.08);

}


.add-button svg {

  width: 17px;

  height: 17px;

  fill: none;

  stroke: white;

  stroke-width: 1.7;

}


.all-products-button {

  display: block;

  margin: 30px auto 0;

  border: 0;

  padding: 12px 40px;

  border-radius: 25px;

  color: white;

  background: #399b3d;

  font-weight: 700;

  transition: 0.2s ease;

}


.all-products-button:hover {

  background: #2d8131;

  transform: translateY(-2px);

}


.empty-product {

  text-align: center;

  padding: 30px;

  color: #777;

}


/* =====================================================
   ALL PRODUCTS
===================================================== */

.all-products-area {

  margin-top: 55px;

  padding-top: 40px;

  border-top: 1px solid #e8e8e8;

}


.all-products-title {

  text-align: center;

  margin-bottom: 30px;

}


.all-products-title h3 {

  font-family: Georgia, serif;

  font-size: 32px;

  color: var(--green-dark);

  margin-bottom: 7px;

}


.all-products-title p {

  color: #777;

  font-size: 13px;

}


.extra-products {

  margin-top: 0;

}


/* =====================================================
   ABOUT
===================================================== */

.about-section {

  scroll-margin-top: 120px;

  padding: 90px 30px;

  background: var(--cream);

}


.about-container {

  max-width: 1150px;

  margin: auto;

  display: grid;

  grid-template-columns: 0.9fr 1.1fr;

  align-items: center;

  gap: 70px;

}


.about-image {

  overflow: hidden;

  border-radius: 35px;

}


.about-image img {

  width: 100%;

  display: block;

}


.about-content h2 {

  font-family: Georgia, serif;

  color: var(--green-dark);

  font-size: clamp(42px, 5vw, 65px);

  line-height: 1;

  margin: 10px 0 25px;

}


.about-content h2 span {

  color: #ee999b;

}


.about-content > p:not(.section-label) {

  color: #555;

  line-height: 1.8;

  margin-bottom: 14px;

  max-width: 570px;

}


.about-points {

  display: flex;

  gap: 40px;

  margin-top: 30px;

}


.about-points div {

  display: flex;

  flex-direction: column;

}


.about-points strong {

  color: var(--green);

  font-family: Georgia, serif;

  font-size: 25px;

}


.about-points span {

  color: #666;

  font-size: 12px;

}


/* =====================================================
   ORDER
===================================================== */

.order-section {

  scroll-margin-top: 120px;

  padding-bottom: 90px;

  background: #fff;

}


.steps {

  max-width: 1100px;

  margin: auto;

  padding: 10px 30px;

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 20px;

}


.step {

  padding: 25px;

  background: #fafafa;

  border-radius: 25px;

  border: 1px solid #eee;

}


.step-number {

  color: #ef999a;

  font-family: Georgia, serif;

  font-size: 30px;

  margin-bottom: 20px;

}


.step h3 {

  font-size: 16px;

  margin-bottom: 8px;

}


.step p {

  color: #666;

  font-size: 12px;

  line-height: 1.6;

}


/* =====================================================
   CONTACT
===================================================== */

.contact-section {

  scroll-margin-top: 120px;

  padding: 80px 30px;

  background: var(--pink-light);

}


.contact-card {

  max-width: 1100px;

  margin: auto;

  padding: 55px;

  background: #fff;

  border-radius: 35px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 60px;

}


.contact-card h2 {

  font-family: Georgia, serif;

  color: var(--green-dark);

  font-size: 45px;

  line-height: 1.05;

  margin: 12px 0 20px;

}


.contact-card > div:first-child > p:last-child {

  color: #666;

  max-width: 450px;

  line-height: 1.7;

}


.contact-info {

  display: flex;

  flex-direction: column;

  justify-content: center;

  gap: 20px;

}


.contact-item {

  display: flex;

  align-items: center;

  gap: 15px;

}


.contact-item > span {

  width: 45px;

  height: 45px;

  background: var(--green-light);

  color: var(--green);

  border-radius: 50%;

  display: grid;

  place-items: center;

}


.contact-item small {

  display: block;

  color: #888;

}


.contact-item strong {

  display: block;

  font-size: 14px;

}


/* =====================================================
   FOOTER
===================================================== */

.footer {

  background: #fff;

  padding: 50px 40px 20px;

}


.footer-inner {

  max-width: 1100px;

  margin: auto;

  display: flex;

  justify-content: space-between;

  gap: 50px;

}


.footer-brand img {

  width: 150px;

  max-width: 100%;

}


.footer-brand p {

  color: #888;

  font-size: 11px;

}


.footer-brand span {

  display: block;

  color: var(--green);

  font-family: Georgia, serif;

  font-style: italic;

  margin-top: 15px;

}


.footer-links {

  display: flex;

  flex-direction: column;

  gap: 7px;

}


.footer-links h3 {

  margin-bottom: 5px;

}


.footer-links button {

  border: 0;

  background: transparent;

  padding: 0;

  text-align: left;

  color: #666;

  font-size: 13px;

}


.footer-links button:hover {

  color: var(--green);

}


.footer-bottom {

  max-width: 1100px;

  margin: 35px auto 0;

  padding-top: 20px;

  border-top: 1px solid #eee;

  text-align: center;

  color: #999;

  font-size: 11px;

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  z-index: 2000;

  background: rgba(0,0,0,0.45);

  display: flex;

  justify-content: flex-end;

}


.product-modal {

  position: relative;

  width: min(560px, 100%);

  height: 100%;

  padding: 30px;

  background: white;

  overflow-y: auto;

}


.close-modal {

  position: absolute;

  top: 25px;

  right: 25px;

  width: 38px;

  height: 38px;

  border: 0;

  border-radius: 50%;

  background: #ffb7b7;

  font-size: 24px;

  z-index: 2;

}


.product-modal > img {

  width: 100%;

  max-height: 450px;

  object-fit: cover;

  border-radius: 30px;

}


.modal-content {

  padding-top: 20px;

}


.modal-content h2 {

  font-family: Georgia, serif;

  font-size: 34px;

  margin-bottom: 8px;

}


.modal-content p {

  color: #555;

  line-height: 1.6;

  margin-bottom: 20px;

}


.modal-content > strong {

  font-size: 20px;

}


.quantity {

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 18px;

  margin: 35px 0 20px;

}


.quantity button {

  width: 42px;

  height: 42px;

  border: 0;

  border-radius: 12px;

  background: #ffb7b7;

  font-size: 25px;

}


.quantity span {

  font-size: 24px;

  font-weight: 700;

}


.modal-add {

  width: 100%;

  border: 0;

  padding: 15px;

  border-radius: 14px;

  background: #ffb7b7;

  font-weight: 800;

}


/* =====================================================
   CART DRAWER
===================================================== */

.cart-overlay {

  position: fixed;

  inset: 0;

  z-index: 2500;

  background: rgba(0,0,0,0.35);

  display: flex;

  justify-content: flex-end;

}


.cart-drawer {

  width: min(480px, 100%);

  height: 100%;

  background: #fff;

  padding: 30px;

  overflow-y: auto;

}


.cart-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;

}


.cart-header h2 {

  font-family: Georgia, serif;

  font-size: 35px;

}


.cart-header button {

  width: 40px;

  height: 40px;

  border: 0;

  border-radius: 50%;

  background: #ffb7b7;

  font-size: 25px;

}


.empty-cart {

  text-align: center;

  padding-top: 100px;

}


.empty-cart-icon {

  font-size: 45px;

  margin-bottom: 15px;

}


.empty-cart h3 {

  margin-bottom: 5px;

}


.empty-cart p {

  color: #888;

  margin-bottom: 20px;

}


.empty-cart button {

  border: 0;

  background: var(--green);

  color: white;

  padding: 12px 25px;

  border-radius: 20px;

}


.cart-item {

  position: relative;

  display: flex;

  gap: 15px;

  padding-bottom: 20px;

  margin-bottom: 20px;

  border-bottom: 1px solid #eee;

}


.cart-item img {

  width: 105px;

  height: 105px;

  object-fit: cover;

  border-radius: 20px;

}


.cart-item-info {

  flex: 1;

  min-width: 0;

}


.cart-item-info h3 {

  font-size: 16px;

  margin-bottom: 3px;

}


.cart-item-info p {

  font-size: 12px;

  color: #777;

  margin-bottom: 10px;

}


.cart-item-info strong {

  font-size: 15px;

}


.remove-item {

  border: 0;

  background: transparent;

  font-size: 22px;

  height: 30px;

}


.continue-shopping {

  width: 100%;

  border: 0;

  background: #e9e9e9;

  padding: 14px;

  border-radius: 13px;

  font-weight: 700;

  margin-bottom: 25px;

}


.cart-total {

  display: flex;

  justify-content: space-between;

  align-items: end;

  gap: 15px;

}


.cart-total span {

  display: block;

  color: #aaa;

}


.cart-total strong {

  display: block;

  font-family: Georgia, serif;

  font-size: 22px;

}


.buy-button {

  border: 0;

  background: #ffb7b7;

  padding: 14px 20px;

  border-radius: 12px;

  font-weight: 800;

}


/* =====================================================
   ANIMATIONS
===================================================== */

.fade-enter-active,
.fade-leave-active {

  transition: 0.25s ease;

}


.fade-enter-from,
.fade-leave-to {

  opacity: 0;

}


.drawer-enter-active,
.drawer-leave-active {

  transition: 0.3s ease;

}


.drawer-enter-from .cart-drawer,
.drawer-leave-to .cart-drawer {

  transform: translateX(100%);

}


.mobile-menu-enter-active,
.mobile-menu-leave-active {

  transition: 0.25s ease;

}


.mobile-menu-enter-from,
.mobile-menu-leave-to {

  opacity: 0;

  transform: translateY(-10px);

}


.products-expand-enter-active,
.products-expand-leave-active {

  transition: 0.35s ease;

}


.products-expand-enter-from,
.products-expand-leave-to {

  opacity: 0;

  transform: translateY(-15px);

}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1000px) {

  .navbar {

    top: 10px;

    left: 10px;

    right: 10px;

  }


  main {

    padding-top: 90px;

  }


  .desktop-nav {

    gap: 0;

  }


  .desktop-nav a {

    padding: 10px 8px;

    font-size: 11px;

  }


  .nav-inner {

    padding: 10px 20px;

  }


  .logo {

    width: 145px;

  }


  .login-label {

    display: none;

  }


  .hero-content {

    padding: 45px;

  }


  .products-container {

    grid-template-columns: repeat(2, 1fr);

  }


  .steps {

    grid-template-columns: repeat(2, 1fr);

  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

  /*
    PENTING UNTUK HP:
    Memastikan tidak ada scroll horizontal.
  */

  .home-page {

    width: 100%;

    max-width: 100vw;

    overflow-x: hidden;

  }


  .navbar {

    top: 6px;

    left: 5px;

    right: 5px;

    margin: 0;

    border-radius: 20px;

  }


  main {

    padding-top: 76px;

    width: 100%;

    max-width: 100%;

  }


  .nav-inner {

    min-height: 68px;

    padding: 7px 10px 7px 18px;

  }


  .logo {

    width: 145px;

    max-width: 42vw;

  }


  .desktop-nav {

    display: none;

  }


  .nav-actions {

    margin-left: auto;

    gap: 1px;

  }


  .icon-button {

    width: 38px;

    height: 38px;

  }


  .icon-button svg {

    width: 20px;

    height: 20px;

  }


  .login-button {

    width: 38px;

    height: 38px;

    padding: 0;

  }


  .login-button svg {

    width: 20px;

    height: 20px;

  }


  .login-label {

    display: none;

  }


  .hamburger {

    display: flex;

    margin-left: 3px;

  }


  /* MOBILE MENU */

  .mobile-nav {

    display: flex;

    flex-direction: column;

    gap: 5px;

    padding: 10px 15px 18px;

    border-top: 1px solid #eee;

  }


  .mobile-nav a {

    text-decoration: none;

    color: #222;

    font-size: 14px;

    font-weight: 700;

    padding: 12px 14px;

    border-radius: 12px;

  }


  .mobile-nav a:hover {

    background: var(--green-light);

    color: var(--green);

  }


  /* SEARCH */

  .search-area {

    padding: 0 15px 14px;

  }


  /* HERO */

  .hero {

    width: calc(100% - 10px);

    margin: 0 5px;

    border-radius: 0 0 25px 25px;

  }


  .hero-content {

    min-height: auto;

    display: flex;

    flex-direction: column;

    padding: 45px 25px 25px;

  }


  .hero-text {

    width: 100%;

    text-align: center;

  }


  .hero h1 {

    font-size: 48px;

    line-height: 1;

  }


  .hero-description {

    font-size: 13px;

    margin-left: auto;

    margin-right: auto;

  }


  .hero-buttons {

    justify-content: center;

    flex-wrap: wrap;

  }


  .hero-features {

    justify-content: center;

    gap: 12px;

  }


  .hero-features > div {

    flex-direction: column;

    text-align: center;

    gap: 4px;

  }


  .feature-icon {

    width: 30px;

    height: 30px;

  }


  .hero-features p {

    font-size: 9px;

  }


  .hero-image {

    min-height: 300px;

    width: 100%;

    max-width: 100%;

  }


  .hero-image-bg {

    height: 75%;

    right: -20%;

  }


  .hero-image img {

    width: 100%;

    max-width: 100%;

  }


  /* SECTIONS */

  .section-heading {

    padding: 55px 20px 25px;

  }


  .section-heading h2 {

    font-size: 34px;

  }


  /* PRODUCTS */

  .products-section {

    width: 100%;

    overflow-x: hidden;

  }


  .products-container {

    width: 100%;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    padding: 0 12px;

    gap: 10px;

  }


  .product-card {

    width: 100%;

    min-width: 0;

    padding: 9px;

    border-radius: 18px;

  }


  .product-image {

    border-radius: 14px;

  }


  .product-info h3 {

    font-size: 12px;

  }


  .product-info p {

    font-size: 9px;

    min-height: 40px;

  }


  .product-bottom strong {

    font-size: 11px;

  }


  .add-button {

    width: 29px;

    height: 29px;

  }


  .add-button svg {

    width: 14px;

    height: 14px;

  }


  .all-products-button {

    font-size: 12px;

    padding: 11px 25px;

  }


  .all-products-area {

    margin-top: 40px;

    padding-top: 30px;

  }


  .all-products-title h3 {

    font-size: 27px;

  }


  .all-products-title p {

    font-size: 11px;

  }


  /* ABOUT */

  .about-section {

    padding: 60px 20px;

  }


  .about-container {

    grid-template-columns: 1fr;

    gap: 30px;

  }


  .about-content h2 {

    font-size: 43px;

  }


  .about-points {

    gap: 20px;

  }


  /* ORDER */

  .steps {

    grid-template-columns: 1fr;

    padding: 10px 20px;

  }


  /* CONTACT */

  .contact-section {

    padding: 55px 15px;

  }


  .contact-card {

    padding: 30px 25px;

    grid-template-columns: 1fr;

    gap: 30px;

    border-radius: 25px;

  }


  .contact-card h2 {

    font-size: 38px;

  }


  /* FOOTER */

  .footer {

    padding: 40px 25px 20px;

  }


  .footer-inner {

    flex-direction: column;

  }


  /* MODAL */

  .product-modal {

    width: 100%;

    padding: 20px;

  }


  .product-modal > img {

    max-height: 330px;

  }


  /* CART */

  .cart-drawer {

    width: 100%;

    padding: 22px;

  }

}


/* =====================================================
   VERY SMALL PHONE
===================================================== */

@media (max-width: 420px) {

  .navbar {

    left: 4px;

    right: 4px;

  }


  .logo {

    width: 135px;

    max-width: 40vw;

  }


  .nav-actions {

    gap: 0;

  }


  .icon-button {

    width: 34px;

    height: 34px;

  }


  .login-button {

    width: 34px;

    height: 34px;

  }


  .login-button svg {

    width: 18px;

    height: 18px;

  }


  .hamburger {

    width: 38px;

  }


  .hero h1 {

    font-size: 41px;

  }


  .hero-features {

    gap: 7px;

  }


  .hero-features p {

    font-size: 8px;

  }


  .products-container {

    padding: 0 9px;

    gap: 8px;

  }


  .product-card {

    padding: 7px;

  }


  .product-info {

    padding-left: 2px;

    padding-right: 2px;

  }

}



/* Mencegah scroll horizontal di semua ukuran layar */
:global(html),
:global(body),
:global(#app) {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>