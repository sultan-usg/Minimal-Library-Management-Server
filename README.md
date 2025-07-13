
# 📚 Library Management API

A full-featured **RESTful API** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing a library’s books and borrow records.

---

## 🚀 Features

- 🧾 **CRUD for Books** — Add, update, delete, and retrieve books
- 📥 **Borrow System** — Borrow books with availability check
- 📊 **Aggregation** — Get summary of borrowed books with MongoDB aggregation pipeline
- ✅ **Schema validation** using Mongoose
- 🔒 **Business logic enforcement** (e.g., copies must be available to borrow)
- ⚙️ **Mongoose Middleware** — pre/post save, post-delete logic
- 📦 **Filtering, Sorting, and Limiting** for book listings
- 🔐 **Clean error handling** with consistent response format

---

## 🧑‍💻 Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- dotenv for environment config

---

## 📁 Project Structure

```
📦 src
 ┣ 📂app
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜book.controller.ts
 ┃ ┃ ┗ 📜borrow.controller.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜book.model.ts
 ┃ ┃ ┗ 📜borrow.model.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜book.interface.ts
 ┃ ┃ ┗ 📜borrow.interface.ts
 ┗ 📜app.ts
📜 server.ts
📜 README.md
```

---

## 🛠️ Setup Instructions

### 1. 📦 Clone and Install

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
npm install
```

---

### 2. 🔑 Configure Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.x9muexx.mongodb.net/library?retryWrites=true&w=majority
```

---

### 3. 🧪 Run the Project

#### Development mode:
```bash
npm run dev
```

#### Build for production:
```bash
npm run build
```

#### Start production server:
```bash
npm start
```

---

## 📡 API Endpoints

### 🔹 Book Endpoints

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| POST   | `/api/books`           | Create a book           |
| GET    | `/api/books`           | Get all books (filter/sort) |
| GET    | `/api/books/:bookId`   | Get single book by ID   |
| PUT    | `/api/books/:bookId`   | Update book info        |
| DELETE | `/api/books/:bookId`   | Delete a book           |

#### 🧾 Example Create Book Request

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology.",
  "copies": 5
}
```

---

### 🔹 Borrow Endpoints

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/api/borrow`  | Borrow a book (availability check)  |
| GET    | `/api/borrow`  | Get summary of borrowed books        |

#### 📥 Example Borrow Request

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

## 📊 Borrow Summary (Aggregation)

Returns total quantity borrowed per book:
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ❌ Error Response Structure

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "copies": {
      "message": "Copies must be a positive number"
    }
  }
}
```

---


## 🙌 Author

Developed by **Sultan Mahmud** — proudly crafted for academic submission and real-world practice.
