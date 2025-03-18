//// IMPORTS
import express from "express";
import axios from "axios";
import pg from "pg";
import bodyParser from "body-parser";

//// CONFIGS
const app = express();
const port = 3000;

//// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//// DATABASE
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "my-books",
    password: "[password]",
    port: 5433,});
    db.connect();

//// ROUTES
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books ORDER BY id DESC');
        const books_done = result.rows;
        console.log("Loaded books:", books_done);
        res.render('index', { books_done });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading books');
    }
});

app.post('/', async (req, res) => {
    const book_name = req.body['book_name'];
    console.log("Book from form:", book_name);
    try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(book_name)}`);
        const book = response.data.docs.find(doc => (doc.isbn && doc.isbn.length > 0) || doc.cover_i);
        if (!book) 
            {console.log('No ISBN on API');
             return res.redirect('/');
        }

        let coverUrl = '';

        if (book.isbn && book.isbn.length > 0) {
            const isbn = book.isbn[0];
            coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
            await db.query('INSERT INTO books (name, isbn, book_cover) VALUES ($1, $2, $3)',[book_name, isbn, coverUrl]);

        } else if (book.cover_i) {
            coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            await db.query('INSERT INTO books (name, isbn, book_cover) VALUES ($1, $2, $3)',[book_name, 'N/A', coverUrl]);
        }

        res.redirect('/');
    
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send('Error adding book');
        
    }
});


app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
