// File: services.js

// Kita tentukan username dan password admin di sini
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // Password rahasia kita

// === BARU ===
// Fungsi sekarang menerima username dan password
export function loginAndGetKey(username, password) {
  // Kita sembunyikan password di log server untuk keamanan
  const passDisplay = password ? '*'.repeat(password.length) : '(kosong)';
  console.log(`Mencoba login untuk: ${username} / Pass: ${passDisplay}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validasi username DAN password
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        const key = "KEY_ADMIN_RAHASIA_123";
        console.log("Login sukses, key dibuat.");
        resolve(key);
      } else {
        console.log("Login gagal. Kombinasi salah.");
        // Beri pesan error yang lebih spesifik
        reject(new Error("Username atau Password Salah!"));
      }
    }, 500); 
  });
}
// === AKHIR BARU ===


export function getReport(key) {
  console.log(`Mencoba ambil laporan dengan key: ${key}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (key === "KEY_ADMIN_RAHASIA_123") {
        const penghasilan = "Rp 10.000.000";
        console.log("Key valid, laporan dikirim.");
        resolve(penghasilan);
      } else {
        console.log("Key tidak valid.");
        reject(new Error("Key tidak valid!"));
      }
    }, 500); 
  });
}