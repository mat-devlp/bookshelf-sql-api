<div align="center">

# 📚 BOOKSHELF

### PostgreSQL + External API Integration

<img src="https://github.com/user-attachments/assets/57e71d5c-4ac4-4417-b4ec-c00f2a927d00" width="50%" />

</div>

## 🚀 Overview
Bookshelf is a project that allows you to maintain a collection of books stored in a PostgreSQL database. When a book is added by name, an external API is used to retrieve its cover image.

## 📦 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/mat-devlp/bookshelf.git
cd bookshelf
```

### 2️⃣ Install dependencies
```sh
npm i
```

### 3️⃣ Set up PostgreSQL database
Ensure you have PostgreSQL installed and running. Create a database named `BOOKSHELF` and run the following SQL command to create the necessary table:

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL,
    book_cover TEXT
);
```

### 4️⃣ Configure database connection
Add your PostgreSQL credentials in index.js:

```
  user: "postgres",
  host: "localhost",
  database: "BOOKSHELF",
  password: "[YOUR PASSWORD]",
  port: 5433
```

## ▶️ Running the Bookshelf System
Start the application using Nodemon:
```sh
npm install -g nodemon  # Install nodemon globally if you haven't
nodemon index.js
```

Your application should now be running and able to store book information retrieved from an external API.

## 📡 Features
- Add books by name, automatically fetching and storing the book cover.
- Retrieve the list of stored books.
