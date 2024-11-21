const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { res.json(todos); });


router.post('/', (req, res) => {
    const newEntry = {
        id: data.length + 1, // Auto increment ID
        nama: req.body.nama,
        spesies: req.body.spesies,
        umur: req.body.umur,
        deskripsi: req.body.deskripsi
    };

    // Memasukkan data baru ke dalam array
    data.push(newEntry);

    // Mengembalikan respons sukses dengan data yang ditambahkan
    res.status(201).json(newEntry);
});


router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ message: 'Tugas tidak ditemukan' });
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.status(200).json({ message: `Tugas'${deletedTodo.task}'Telah dihapus` });
});
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Tugas tidak ditemukan' });
    todo.task = req.body.task || todo.task;
    res.status(200).json({
        message: `Tugas dengan ID ${todo.id} telah diperbarui`,
        updatedTodo: todo
    });
});

module.exports = router;