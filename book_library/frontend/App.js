import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';   // ← add this import

const BASE_URL = 'http://localhost:5000/api';

const App = () => {
  const [auth, setAuth] = useState({ username: '', loggedIn: false });
  const [form, setForm] = useState({ username: '', password: '' });
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleLogin = async (type) => {
    try {
      await axios.post(`${BASE_URL}/auth/${type}`, form);
      setAuth({ username: form.username, loggedIn: true });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const fetchBooks = async () => {
    const res = await axios.get(`${BASE_URL}/books/${auth.username}`);
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post(`${BASE_URL}/books`, { ...newBook, username: auth.username });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`${BASE_URL}/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    if (auth.loggedIn) fetchBooks();
  }, [auth]);

  if (!auth.loggedIn) {
    return (
      <div className="container">
        <h2>Login or Signup</h2>
        <input
          className="input"
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="button" onClick={() => handleLogin('login')}>Login</button>
        <button className="button" onClick={() => handleLogin('signup')}>Signup</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome, {auth.username}</h2>

      <div className="form-row">
        <input
          className="input"
          placeholder="Book Title"
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          className="input"
          placeholder="Author"
          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button className="button" onClick={addBook}>Add Book</button>
      </div>

      <ul className="book-list">
        {books.map(book => (
          <li key={book._id} className="book-item">
            <span>{book.title} by {book.author}</span>
            <button className="delete-button" onClick={() => deleteBook(book._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;