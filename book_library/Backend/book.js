const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get books by username
router.get('/:username', async (req, res) => {
    try {
        const books = await Book.find({ username: req.params.username });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const { username, title, author } = req.body;
    try {
        const book = new Book({ username, title, author });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;