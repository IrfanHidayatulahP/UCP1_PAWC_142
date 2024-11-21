const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi dengan database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',  // Alamat host database
    user: process.env.DB_USER || 'root',       // Nama pengguna database
    password: process.env.DB_PASSWORD || '',   // Kata sandi database
    database: process.env.DB_NAME || 'kebunbinatang', // Nama database
    port: process.env.DB_PORT || '3300'  // Port yang benar adalah 3300, pastikan ini sesuai dengan konfigurasi Anda
});

// Menghubungkan ke database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Mengekspor koneksi untuk digunakan di file lain
module.exports = db;
