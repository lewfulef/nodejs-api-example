const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { readData, writeData } = require("./functions")
require('dotenv').config()
const port = process.env.PORT

// MIDDLEWARE con esto vamos a config el bodyParser transormándolo a objeto de javascript
// el middleware toma la info y la transforma de json a objeto de js

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcome to my API with NodeJS")
})

// EJEMPLOS DE CREATE Y READ

app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post("/dishes", (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish 
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})

// EJERCICIO DE CREATE Y READ

app.get("/books", (req, res) => {
    const data = readData()
    res.json(data.books)
})

app.post("/books", (req, res) => {
    const data = readData()
    const book = req.body
    const newBook = {
        id: data.books.length + 1,
        ...book 
    }
    data.books.push(newBook)
    writeData(data)
    res.json(newBook)
})

// EJEMPLO DE UPDATE Y DELETE

app.put("/dishes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Dish updated successfully"})
})

app.delete("/dishes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const dishIndex = data.dishes.findIndex(dish => dish.id === id);
    data.dishes.splice(dishIndex, 1)
    writeData(data)
    res.json({ message: "Dish deleted successfully"})
})

// EJERCICIO DE UPDATE Y DELETE

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex(book => book.id === id)
    data.books[bookIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Book updated successfully"})
})

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex(book => book.id === id);
    data.books.splice(bookIndex, 1)
    writeData(data)
    res.json({ message: "Book deleted successfully"})
})

app.listen(port, ( ) => {
    console.log(`El servidor está corriendo en el puerto ${process.env.BACKEND_BASEURL}`)
}) 