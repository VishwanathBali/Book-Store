import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import booksRoute from "./Routes/book.route.js";
dotenv.config();

const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(cors());


app.use('/books', booksRoute);



// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

mongoose
.connect(process.env.mongoDBURL)
.then(() => {
    console.log("Database connected successfully!!")
    app.listen(port,() => {
        console.log("App is listening on port:",port)
    })
})
.catch((err) => {
    console.log(err)    
})