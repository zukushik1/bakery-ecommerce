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
  const updatingOrder = ref(null)

  const selectedOrder = ref(null)
  const showDetailModal = ref(false)

  const namaPetugas = computed(() => {
    return localStorage.getItem('nama') || 'Petugas'
  })

  const initialNama = computed(() => {
    return namaPetugas.value.charAt(0).toUpperCase()
  })

  /* =========================
    MENU DAN LOGOUT
  ========================= */

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  const closeMenu = () => {
    menuOpen.value = false
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('nama')
    router.push('/login')
  }

  /* =========================
    FORMAT DATA API
  ========================= */

  const getResponseData = (response) => {
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

  /* =========================
    FETCH PRODUK
  ========================= */

  const fetchProducts = async () => {
    try {
      const response = await api.get('/produk')
      const data = getResponseData(response)

      products.value = data.map(item => ({
        id: Number(item.id_produk),
        name: item.nama_produk || `Produk #${item.id_produk}`,
        price: Number(item.harga) || 0
      }))
    } catch (error) {
      console.error('Gagal mengambil produk:', error)
    }
  }

  /* =========================
    FORMAT TANGGAL
  ========================= */

  const formatDate = (date) => {
    if (!date) return '-'

    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
      return date
    }

    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(parsedDate)
  }

  /* =========================
    FORMAT RUPIAH
  ========================= */

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(
      Number(price) || 0
    )
  }

  /* =========================
    NORMALISASI STATUS
  ========================= */

  const normalisasiStatus = (status) => {
    return String(status || '')
      .toLowerCase()
      .replace(/[\s_-]+/g, '')
  }

  const isOrderCancelled = (order) => {
    return normalisasiStatus(order.status) === 'dibatalkan'
  }

  const isOrderFinished = (order) => {
    return normalisasiStatus(order.status) === 'selesai'
  }

  /* =========================
    STATUS PESANAN
  ========================= */

  const statusOptions = [
    'menunggu',
    'pesanan diterima',
    'pesanan diproses',
    'pembayaran',
    'diantar/jemput',
    'selesai'
  ]

  /* =========================
    FETCH PESANAN
  ========================= */

  const fetchOrders = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
      const response = await api.get('/pesanan')
      const data = getResponseData(response)

      orders.value = data.map(item => {
        const product = products.value.find(
          product => product.id === Number(item.id_produk)
        )

        const qty = Number(item.qty) || 0
        const price = product?.price || Number(item.harga) || 0

        return {
          id: Number(item.id_pesanan),

          customer:
            item.nama_pelanggan ||
            item.customer_name ||
            item.pelanggan?.nama_pelanggan ||
            item.nama ||
            `Pelanggan #${item.id_pelanggan || '-'}`,

          phone:
            item.nomor_hp ||
            item.phone ||
            item.pelanggan?.nomor_hp ||
            '-',

          date: formatDate(item.tanggal_pesanan),
          rawDate: item.tanggal_pesanan,

          productId: Number(item.id_produk),

          productName:
            product?.name ||
            item.nama_produk ||
            `Produk #${item.id_produk}`,

          qty,
          price,
          subtotal: price * qty,

          total:
            Number(item.total_pesanan) ||
            Number(item.total_harga) ||
            0,

          status: String(
            item.status_pesanan || item.status || 'menunggu'
          ).trim().toLowerCase(),

          metodePembayaran:
            item.metode_pembayaran || '-',

          alamat:
            item.alamat ||
            item.alamat_pelanggan ||
            '-'
        }
      })
    } catch (error) {
      console.error('Gagal mengambil pesanan:', error)

      errorMessage.value =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Gagal mengambil data pesanan dari server.'
    } finally {
      loading.value = false
    }
  }

  /* =========================
    UBAH STATUS PESANAN
  ========================= */

  const updateStatus = async (order, event) => {
    const newStatus = event.target.value
    const oldStatus = order.status

    if (!newStatus || newStatus === oldStatus) {
      return
    }

    if (isOrderCancelled(order) || isOrderFinished(order)) {
      event.target.value = oldStatus
      return
    }

    updatingOrder.value = order.id
    errorMessage.value = ''

    try {
      await api.put(`/pesanan/${order.id}/status`, {
        status: newStatus
      })

      order.status = newStatus

      if (
        selectedOrder.value &&
        selectedOrder.value.id === order.id
      ) {
        selectedOrder.value.status = newStatus
      }

      await fetchOrders()
    } catch (error) {
      console.error('Gagal mengubah status:', error)

      event.target.value = oldStatus

      errorMessage.value =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Gagal mengubah status pesanan.'
    } finally {
      updatingOrder.value = null
    }
  }

  /* =========================
    BATALKAN PESANAN
  ========================= */

  const cancelOrder = async (order) => {
    if (isOrderCancelled(order) || isOrderFinished(order)) {
      return
    }

    const confirmation = window.confirm(
      `Apakah kamu yakin ingin membatalkan pesanan #${order.id} milik ${order.customer}?`
    )

    if (!confirmation) return

    updatingOrder.value = order.id
    errorMessage.value = ''

    try {
      await api.put(`/pesanan/${order.id}/cancel`)

      order.status = 'dibatalkan'

      if (
        selectedOrder.value &&
        selectedOrder.value.id === order.id
      ) {
        selectedOrder.value.status = 'dibatalkan'
      }

      await fetchOrders()

    } catch (error) {
      console.error('Gagal membatalkan pesanan:', error)

      errorMessage.value =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Gagal membatalkan pesanan. Silakan coba lagi.'

    } finally {
      updatingOrder.value = null
    }
  }

  /* =========================
    TAMPILAN STATUS
  ========================= */

  const getStatusClass = (status) => {
    const value = normalisasiStatus(status)

    if (value === 'selesai' || value.includes('diterima')) {
      return 'status-selesai'
    }

    if (value.includes('proses') || value.includes('dikirim')) {
      return 'status-diproses'
    }

    if (value.includes('dibatalkan')) {
      return 'status-dibatalkan'
    }

    return 'status-menunggu'
  }

  /* =========================
    STATISTIK
  ========================= */

  const totalPesanan = computed(() => orders.value.length)

  const pesananMenunggu = computed(() => {
    return orders.value.filter(order =>
      normalisasiStatus(order.status).includes('menunggu')
    ).length
  })

  const pesananDiproses = computed(() => {
    return orders.value.filter(order => {
      const status = normalisasiStatus(order.status)

      return (
        status.includes('proses') ||
        status.includes('dikirim')
      )
    }).length
  })

  const pesananSelesai = computed(() => {
    return orders.value.filter(order =>
      normalisasiStatus(order.status) === 'selesai'
    ).length
  })

  /* =========================
    FILTER PESANAN
  ========================= */

  const filteredOrders = computed(() => {
    const search = searchQuery.value.toLowerCase().trim()

    if (!search) return orders.value

    return orders.value.filter(order => {
      return (
        String(order.id).toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.phone.toLowerCase().includes(search) ||
        order.productName.toLowerCase().includes(search) ||
        order.alamat.toLowerCase().includes(search) ||
        order.status.toLowerCase().includes(search) ||
        order.metodePembayaran.toLowerCase().includes(search)
      )
    })
  })

  /* =========================
    AVATAR
  ========================= */

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?'
  }

  /* =========================
    DETAIL PESANAN
  ========================= */

  const openDetail = (order) => {
    selectedOrder.value = { ...order }
    showDetailModal.value = true
  }

  const closeDetail = () => {
    showDetailModal.value = false
    selectedOrder.value = null
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

      <!-- MAIN -->
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
            <h1>Pesanan Petugas</h1>
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

          <!-- INTRO -->
          <div class="page-intro">
            <span class="intro-label">TOKO JERICHO & NESYA</span>
            <h2>Kelola Pesanan</h2>
            <p>
              Pantau pesanan pelanggan dan perbarui status pesanan.
            </p>
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

              <p class="stat-label">Selesai</p>
              <h3>{{ pesananSelesai }}</h3>
              <span class="stat-footer">pesanan terselesaikan</span>
            </div>

          </div>

          <!-- PANEL PESANAN -->
          <div class="panel order-panel">

            <div class="panel-header">
              <div>
                <h2>Semua Pesanan</h2>
                <p>Daftar pesanan yang masuk ke toko</p>
              </div>

              <div class="search-box">
                <span>⌕</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari pesanan..."
                />
              </div>
            </div>

            <!-- ERROR -->
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
              <button @click="fetchOrders">Coba lagi</button>
            </div>

            <!-- LOADING -->
            <div v-if="loading" class="empty-data">
              Memuat data pesanan...
            </div>

            <template v-else>

              <!-- DESKTOP TABLE -->
              <div class="orders-table">

                <div class="table-head">
                  <span>PESANAN</span>
                  <span>PELANGGAN</span>
                  <span>PRODUK</span>
                  <span>TOTAL</span>
                  <span>STATUS PESANAN</span>
                  <span>AKSI</span>
                </div>

                <div
                  v-for="order in filteredOrders"
                  :key="order.id"
                  class="order-row"
                >

                  <div class="order-cell order-main">
                    <div class="order-icon">🛍</div>

                    <div class="order-name">
                      <strong>#{{ order.id }}</strong>
                      <span>{{ order.date }}</span>
                    </div>
                  </div>

                  <div class="order-cell customer-cell">
                    <div class="customer-avatar">
                      {{ getInitial(order.customer) }}
                    </div>

                    <div class="customer-info">
                      <strong>{{ order.customer }}</strong>
                      <span>{{ order.phone }}</span>
                    </div>
                  </div>

                  <div class="order-cell product-info">
                    <strong>{{ order.productName }}</strong>
                    <span>
                      {{ order.qty }} × Rp {{ formatPrice(order.price) }}
                    </span>
                  </div>

                  <div class="order-cell total-cell">
                    <strong>Rp {{ formatPrice(order.total) }}</strong>
                  </div>

                  <div class="order-cell status-control">

                    <span
                      class="status-badge"
                      :class="getStatusClass(order.status)"
                    >
                      {{ order.status }}
                    </span>

                    <select
                      :value="order.status"
                      :disabled="
                        updatingOrder === order.id ||
                        isOrderCancelled(order) ||
                        isOrderFinished(order)
                      "
                      @change="updateStatus(order, $event)"
                    >
                      <option
                        v-for="status in statusOptions"
                        :key="status"
                        :value="status"
                      >
                        {{ status }}
                      </option>
                    </select>

                    <small v-if="updatingOrder === order.id">
                      Menyimpan...
                    </small>

                  </div>

                  <!-- AKSI DESKTOP -->
                  <div class="order-cell action-cell">

                    <button
                      class="detail-button"
                      @click="openDetail(order)"
                    >
                      Detail
                    </button>

                    <button
                      v-if="
                        !isOrderCancelled(order) &&
                        !isOrderFinished(order)
                      "
                      class="cancel-button"
                      :disabled="updatingOrder === order.id"
                      @click="cancelOrder(order)"
                    >
                      {{ updatingOrder === order.id ? 'Memproses...' : 'Batalkan' }}
                    </button>

                    <span
                      v-else-if="isOrderCancelled(order)"
                      class="cancelled-label"
                    >
                      Dibatalkan
                    </span>

                    <span
                      v-else
                      class="finished-label"
                    >
                      Selesai
                    </span>

                  </div>

                </div>

                <div
                  v-if="filteredOrders.length === 0"
                  class="empty-data"
                >
                  <span class="empty-icon">🛍</span>
                  <strong>Pesanan tidak ditemukan</strong>
                  <span>Coba gunakan kata pencarian lain.</span>
                </div>

              </div>

              <!-- MOBILE LIST -->
              <div class="mobile-orders">

                <div
                  v-for="order in filteredOrders"
                  :key="order.id"
                  class="mobile-order-card"
                >

                  <div class="mobile-order-top">
                    <div class="mobile-order-id">
                      <div class="order-icon">🛍</div>

                      <div>
                        <strong>#{{ order.id }}</strong>
                        <span>{{ order.date }}</span>
                      </div>
                    </div>

                    <span
                      class="status-badge"
                      :class="getStatusClass(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </div>

                  <div class="mobile-customer">
                    <div class="customer-avatar">
                      {{ getInitial(order.customer) }}
                    </div>

                    <div class="customer-info">
                      <strong>{{ order.customer }}</strong>
                      <span>{{ order.phone }}</span>
                    </div>
                  </div>

                  <div class="mobile-product">
                    <div>
                      <strong>{{ order.productName }}</strong>
                      <span>
                        {{ order.qty }} × Rp {{ formatPrice(order.price) }}
                      </span>
                    </div>

                    <strong>Rp {{ formatPrice(order.total) }}</strong>
                  </div>

                  <div class="mobile-address">
                    <span>Alamat Pengiriman</span>
                    <strong>{{ order.alamat }}</strong>
                  </div>

                  <div class="mobile-status-control">
                    <label>Ubah Status Pesanan</label>

                    <select
                      :value="order.status"
                      :disabled="
                        updatingOrder === order.id ||
                        isOrderCancelled(order) ||
                        isOrderFinished(order)
                      "
                      @change="updateStatus(order, $event)"
                    >
                      <option
                        v-for="status in statusOptions"
                        :key="status"
                        :value="status"
                      >
                        {{ status }}
                      </option>
                    </select>

                    <small v-if="updatingOrder === order.id">
                      Menyimpan perubahan...
                    </small>
                  </div>

                  <button
                    class="detail-button mobile-detail-button"
                    @click="openDetail(order)"
                  >
                    Lihat Detail Pesanan
                  </button>

                  <!-- AKSI BATALKAN MOBILE -->
                  <button
                    v-if="
                      !isOrderCancelled(order) &&
                      !isOrderFinished(order)
                    "
                    class="cancel-button mobile-cancel-button"
                    :disabled="updatingOrder === order.id"
                    @click="cancelOrder(order)"
                  >
                    {{ updatingOrder === order.id ? 'Memproses...' : 'Batalkan Pesanan' }}
                  </button>

                  <div
                    v-else-if="isOrderCancelled(order)"
                    class="cancelled-label mobile-cancelled-label"
                  >
                    Pesanan Dibatalkan
                  </div>

                  <div
                    v-else
                    class="finished-label mobile-cancelled-label"
                  >
                    Pesanan Selesai
                  </div>

                </div>

                <div
                  v-if="filteredOrders.length === 0"
                  class="empty-data"
                >
                  Pesanan tidak ditemukan.
                </div>

              </div>

            </template>
          </div>

          <!-- FOOTER -->
          <footer class="dashboard-footer">
            <span>© 2026 Jericho & Nesya</span>
            <span>Good Ingredients, Brighter Days ♥</span>
          </footer>

        </section>
      </main>

      <!-- DETAIL MODAL -->
      <div
        v-if="showDetailModal && selectedOrder"
        class="modal-overlay"
        @click.self="closeDetail"
      >

        <div class="detail-modal">

          <div class="modal-header">
            <div>
              <span class="modal-label">DETAIL PESANAN</span>
              <h2>#{{ selectedOrder.id }}</h2>
            </div>

            <button class="modal-close" @click="closeDetail">
              ×
            </button>
          </div>

          <div class="detail-customer">
            <div class="detail-avatar">
              {{ getInitial(selectedOrder.customer) }}
            </div>

            <div>
              <span>Pelanggan</span>
              <strong>{{ selectedOrder.customer }}</strong>
              <small>{{ selectedOrder.phone }}</small>
            </div>
          </div>

          <div class="detail-grid">

            <div class="detail-item">
              <span>ID PESANAN</span>
              <strong>#{{ selectedOrder.id }}</strong>
            </div>

            <div class="detail-item">
              <span>TANGGAL PESANAN</span>
              <strong>{{ selectedOrder.date }}</strong>
            </div>

            <div class="detail-item">
              <span>NOMOR HP</span>
              <strong>{{ selectedOrder.phone }}</strong>
            </div>

            <div class="detail-item">
              <span>ID PRODUK</span>
              <strong>#{{ selectedOrder.productId }}</strong>
            </div>

            <div class="detail-item">
              <span>JUMLAH PRODUK</span>
              <strong>{{ selectedOrder.qty }} item</strong>
            </div>

            <div class="detail-item">
              <span>HARGA SATUAN</span>
              <strong>Rp {{ formatPrice(selectedOrder.price) }}</strong>
            </div>

            <div class="detail-item">
              <span>METODE PEMBAYARAN</span>
              <strong>{{ selectedOrder.metodePembayaran }}</strong>
            </div>

            <div class="detail-item">
              <span>STATUS PESANAN</span>
              <strong>{{ selectedOrder.status }}</strong>
            </div>

          </div>

          <div class="detail-section">
            <span class="section-title">PRODUK</span>

            <div class="detail-product">
              <div class="detail-product-icon">🍰</div>

              <div class="detail-product-info">
                <strong>{{ selectedOrder.productName }}</strong>
                <span>ID Produk #{{ selectedOrder.productId }}</span>
                <span>
                  {{ selectedOrder.qty }} ×
                  Rp {{ formatPrice(selectedOrder.price) }}
                </span>
              </div>

              <div class="detail-product-price">
                <span>Subtotal</span>
                <strong>Rp {{ formatPrice(selectedOrder.subtotal) }}</strong>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <span class="section-title">ALAMAT PENGIRIMAN</span>

            <div class="address-box">
              {{ selectedOrder.alamat }}
            </div>
          </div>

          <div class="detail-section">
            <span class="section-title">INFORMASI PEMBAYARAN</span>

            <div class="payment-box">
              <div class="payment-row">
                <span>Metode Pembayaran</span>
                <strong>{{ selectedOrder.metodePembayaran }}</strong>
              </div>

              <div class="payment-row">
                <span>Status Pesanan</span>
                <strong
                  class="payment-status"
                  :class="getStatusClass(selectedOrder.status)"
                >
                  {{ selectedOrder.status }}
                </strong>
              </div>
            </div>
          </div>

          <div class="detail-total">
            <span>Total Pesanan</span>
            <strong>Rp {{ formatPrice(selectedOrder.total) }}</strong>
          </div>

          <div class="modal-footer">
            <button class="close-detail-button" @click="closeDetail">
              Tutup
            </button>
          </div>

        </div>
      </div>

    </div>
  </template>

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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
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
    margin: 0 auto;
  }

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
    margin: 8px 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 32px;
    color: #526b45;
  }

  .page-intro p {
    margin: 0;
    font-size: 13px;
    color: #999;
  }

  /* STATISTICS */

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 25px;
  }

  .stat-card {
    padding: 23px;
    min-height: 170px;
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

  .stat-icon.green { background: #e8efdf; }
  .stat-icon.pink { background: #fce7e5; }
  .stat-icon.peach { background: #f9eadc; }
  .stat-icon.cream { background: #f5f0d8; }

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

  /* PANEL */

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
    gap: 20px;
    margin-bottom: 20px;
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

  /* SEARCH */

  .search-box {
    width: 230px;
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

  /* TABLE */

  .orders-table {
    width: 100%;
    overflow-x: auto;
  }

  .table-head,
  .order-row {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1.3fr 1fr 1.25fr 1.1fr;
    align-items: center;
    column-gap: 12px;
    min-width: 1000px;
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
    min-height: 85px;
    padding: 10px 15px;
    border-bottom: 1px solid #f0f0ed;
  }

  .order-cell {
    min-width: 0;
    display: flex;
    align-items: center;
  }

  .order-main {
    gap: 10px;
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

  .order-name,
  .customer-info,
  .product-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .order-name strong,
  .customer-info strong {
    font-size: 12px;
    color: #515c4d;
  }

  .order-name span,
  .customer-info span,
  .product-info span {
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

  .customer-info strong,
  .product-info strong {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .product-info strong {
    font-size: 11px;
    color: #596653;
  }

  .total-cell strong {
    font-size: 11px;
    color: #5e6f55;
    white-space: nowrap;
  }

  /* STATUS */

  .status-control {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 9px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 600;
  }

  .status-menunggu {
    background: #fff4dc;
    color: #a47b35;
  }

  .status-diproses {
    background: #eaf0ff;
    color: #6279a9;
  }

  .status-selesai {
    background: #e7f2e2;
    color: #648057;
  }

  .status-dibatalkan {
    background: #fde8e6;
    color: #b56c65;
  }

  .status-control select,
  .mobile-status-control select {
    width: 100%;
    min-width: 110px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #dfe5d7;
    border-radius: 8px;
    outline: none;
    background: #fffdfb;
    color: #627457;
    font-size: 10px;
    cursor: pointer;
  }

  .status-control select:disabled,
  .mobile-status-control select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .status-control small,
  .mobile-status-control small {
    font-size: 9px;
    color: #a0a99a;
  }

  /* BUTTON */

  .detail-button {
    min-height: 34px;
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
  }

  /* ACTION BUTTON */

  .action-cell {
    flex-wrap: wrap;
    gap: 6px;
  }

  .cancel-button {
    min-height: 34px;
    padding: 0 11px;
    border: 1px solid #f0d5d2;
    border-radius: 10px;
    background: #fff5f3;
    color: #b56c65;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }

  .cancel-button:hover {
    background: #b56c65;
    border-color: #b56c65;
    color: white;
  }

  .cancel-button:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .cancelled-label {
    padding: 6px 9px;
    border-radius: 9px;
    background: #fde8e6;
    color: #b56c65;
    font-size: 9px;
    font-weight: 600;
    text-align: center;
  }

  .finished-label {
    padding: 6px 9px;
    border-radius: 9px;
    background: #e7f2e2;
    color: #648057;
    font-size: 9px;
    font-weight: 600;
    text-align: center;
  }

  /* MOBILE ORDERS */

  .mobile-orders {
    display: none;
  }

  .mobile-order-card {
    padding: 15px;
    margin-bottom: 13px;
    border: 1px solid #eeeeea;
    border-radius: 17px;
    background: #fffdfb;
  }

  .mobile-order-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 13px;
    border-bottom: 1px solid #f0f0ed;
  }

  .mobile-order-id {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-order-id > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .mobile-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 13px 0;
    border-bottom: 1px solid #f0f0ed;
  }

  .mobile-product div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .mobile-product div strong {
    font-size: 11px;
    color: #596653;
  }

  .mobile-product div span {
    font-size: 9px;
    color: #aaa;
  }

  .mobile-product > strong {
    font-size: 11px;
    color: #65765c;
    white-space: nowrap;
  }

  .mobile-address {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0ed;
  }

  .mobile-address span,
  .mobile-status-control label {
    font-size: 9px;
    color: #aaa;
  }

  .mobile-address strong {
    font-size: 10px;
    line-height: 1.5;
    color: #68725f;
    font-weight: 500;
  }

  .mobile-status-control {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 13px 0;
  }

  .mobile-status-control select {
    height: 38px;
    font-size: 11px;
  }

  .mobile-detail-button {
    width: 100%;
    height: 38px;
  }

  .mobile-cancel-button {
    width: 100%;
    height: 38px;
    margin-top: 9px;
  }

  .mobile-cancelled-label {
    display: block;
    margin-top: 9px;
    padding: 11px;
  }

  /* EMPTY & ERROR */

  .empty-data {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;
    color: #aaa;
    font-size: 11px;
    text-align: center;
  }

  .empty-icon {
    font-size: 32px;
  }

  .empty-data strong {
    color: #697362;
    font-size: 13px;
  }

  .error-message {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px;
    padding: 12px 15px;
    border: 1px solid #f0d8d5;
    border-radius: 10px;
    background: #fff5f3;
    color: #b06f69;
    font-size: 11px;
  }

  .error-message button {
    padding: 7px 12px;
    border: none;
    border-radius: 8px;
    background: #718667;
    color: white;
    cursor: pointer;
    white-space: nowrap;
  }

  /* FOOTER */

  .dashboard-footer {
    display: flex;
    justify-content: space-between;
    padding: 30px 5px 5px;
    color: #aaa;
    font-size: 10px;
  }

  /* MODAL */

  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(45,52,39,0.42);
    backdrop-filter: blur(3px);
  }

  .detail-modal {
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 27px;
    border: 1px solid #eeeeea;
    border-radius: 22px;
    background: #fffdfb;
    box-shadow: 0 25px 70px rgba(50,50,40,0.18);
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
    cursor: pointer;
  }

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
    gap: 4px;
  }

  .detail-customer span,
  .detail-customer small {
    font-size: 9px;
    color: #aaa;
  }

  .detail-customer strong {
    font-size: 13px;
    color: #515c4d;
  }

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
  }

  .detail-product-info span {
    font-size: 9px;
    color: #aaa;
  }

  .detail-product-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .detail-product-price span {
    font-size: 8px;
    color: #aaa;
  }

  .detail-product-price strong {
    font-size: 11px;
    color: #5e6f55;
    white-space: nowrap;
  }

  .address-box,
  .payment-box {
    padding: 13px;
    border: 1px solid #eeeeea;
    border-radius: 13px;
    background: white;
  }

  .address-box {
    color: #68725f;
    font-size: 11px;
    line-height: 1.6;
  }

  .payment-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    min-height: 35px;
  }

  .payment-row + .payment-row {
    border-top: 1px solid #f0f0ed;
  }

  .payment-row span {
    font-size: 10px;
    color: #999;
  }

  .payment-row strong {
    font-size: 10px;
    color: #596653;
  }

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
  }

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
      display: flex;
      width: 42px;
      height: 42px;
      padding: 9px;
      flex-shrink: 0;
      border: 1px solid #e4e4e0;
      border-radius: 11px;
      background: white;
      cursor: pointer;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
    }

    .hamburger span {
      display: block;
      height: 2px;
      width: 100%;
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

    .page-intro h2 {
      font-size: 27px;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .stat-card {
      min-height: 145px;
      padding: 16px;
    }

    .stat-card h3 {
      font-size: 23px;
    }

    .panel {
      padding: 18px;
      border-radius: 18px;
    }

    .panel-header {
      display: block;
    }

    .search-box {
      width: 100%;
      margin-top: 15px;
    }

    .orders-table {
      display: none;
    }

    .mobile-orders {
      display: block;
    }

    .dashboard-footer {
      flex-direction: column;
      gap: 8px;
    }

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

    .stats-grid {
      gap: 8px;
    }

    .stat-card {
      min-height: 130px;
      padding: 12px;
    }

    .stat-card h3 {
      font-size: 21px;
    }

    .stat-icon {
      width: 37px;
      height: 37px;
    }

    .panel {
      padding: 14px;
    }

    .panel-header h2 {
      font-size: 18px;
    }

    .mobile-order-card {
      padding: 13px;
    }

    .detail-grid {
      grid-template-columns: 1fr;
    }

    .detail-item {
      min-height: 60px;
    }

    .detail-product {
      align-items: flex-start;
    }

    .detail-product-price {
      align-self: center;
    }
  }
  </style>