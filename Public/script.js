// File: public/script.js (Perubahan)

// Ambil elemen dari HTML
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

const errorMessageEl = document.getElementById('errorMessage');
// Kita tetap pakai elemen ini, tapi untuk pesan sukses umum
const reportResultEl = document.getElementById('reportResult'); 

// Fungsi untuk menampilkan pesan error (Tidak berubah)
function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
  reportResultEl.classList.add('hidden');
}

// === PERUBAHAN DI SINI ===
// Kita ubah nama fungsi ini agar lebih jelas
function showSuccess(message) {
  reportResultEl.textContent = message; // Langsung tampilkan pesan kustom
  reportResultEl.classList.remove('hidden');
  errorMessageEl.classList.add('hidden');
}
// === AKHIR PERUBAHAN ===

// Tambahkan event listener ke form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  loginButton.disabled = true;
  loginButton.textContent = "Memproses...";

  errorMessageEl.classList.add('hidden');
  reportResultEl.classList.add('hidden');

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    // --- PROSES 1: Login & Dapat Key ---
    // (Ini tetap sama)
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.error); 
    }

    const { key } = await loginResponse.json();
    
    // --- PROSES 2: Validasi Key (dgn memanggil report) ---
    // Kita tetap perlu memanggil 'report' untuk memastikan key valid,
    // tapi kita tidak akan menampilkan hasilnya.
    const reportResponse = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: key })
    });

    // Jika key tidak valid, ini akan melempar error dan ditangkap 'catch'
    if (!reportResponse.ok) {
      const errorData = await reportResponse.json();
      throw new Error(errorData.error); 
    }

    // (Kita tidak perlu lagi mengambil 'const { report } = ...')

    // === PERUBAHAN DI SINI ===
    // Jika kode sampai di sini, berarti key valid.
    // Tampilkan pesan sukses yang Anda inginkan.
    showSuccess("Login Berhasil!");
    // === AKHIR PERUBAHAN ===

  } catch (error) {
    showError(error.message);
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
});