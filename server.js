// File: server.js

import express from 'express';
import { loginAndGetKey, getReport } from './services.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/login', async (req, res) => {
  try {
    // === BARU ===
    // Ambil username DAN password dari body
    const { username, password } = req.body;
    
    // Kirim keduanya ke fungsi services
    const key = await loginAndGetKey(username, password);
    // === AKHIR BARU ===
    
    res.json({ key: key });
  } catch (error) {
    res.status(401).json({ error: error.message }); // 401 = Unauthorized
  }
});

app.post('/api/report', async (req, res) => {
  try {
    const { key } = req.body;
    const report = await getReport(key);
    res.json({ report: report });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});