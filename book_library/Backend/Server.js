const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/booklibrary', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));