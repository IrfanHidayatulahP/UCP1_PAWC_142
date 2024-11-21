const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua data hewan
router.get('/', (req, res) => {
    db.query('SELECT * FROM hewan', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan data hewan berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM hewan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Hewan tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan data hewan baru
router.post('/', (req, res) => {
    const { nama, spesies, umur, deskripsi } = req.body;
    
    // Validasi input
    if (!nama || !spesies || !umur || !deskripsi) {
        return res.status(400).send('Semua field (nama, spesies, umur, deskripsi) harus diisi');
    }

    db.query(
        'INSERT INTO hewan (nama, spesies, umur, deskripsi) VALUES (?, ?, ?, ?)',
        [nama, spesies, umur, deskripsi],
        (err, results) => {
            if (err) return res.status(500).send('Internal Server Error');
            const newHewan = { id: results.insertId, nama, spesies, umur, deskripsi };
            res.status(201).json(newHewan);
        }
    );
});

// Endpoint untuk memperbarui data hewan
router.put('/:id', (req, res) => {
    const { nama, spesies, umur, deskripsi } = req.body;

    // Validasi input
    if (!nama || !spesies || !umur || !deskripsi) {
        return res.status(400).send('Semua field (nama, spesies, umur, deskripsi) harus diisi');
    }

    db.query(
        'UPDATE hewan SET nama = ?, spesies = ?, umur = ?, deskripsi = ? WHERE id = ?',
        [nama, spesies, umur, deskripsi, req.params.id],
        (err, results) => {
            if (err) return res.status(500).send('Internal Server Error');
            if (results.affectedRows === 0) return res.status(404).send('Hewan tidak ditemukan');
            res.json({ id: req.params.id, nama, spesies, umur, deskripsi });
        }
    );
});

// Endpoint untuk menghapus data hewan
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM hewan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Hewan tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;
