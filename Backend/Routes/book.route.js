import express from "express";
import { book } from "../Models/book.model.js";

const router = express.Router();

router.get('/', async (req,res) =>{
    try {
        const books = await book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.get('/:id',async (req,res) => {
    try {
        const { id } = req.params;
        const data = await book.findById(id)

        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const { id } = req.params;
        const data = await book.findByIdAndDelete(id)
        if(!data)
        {
            return res.status(400).send({message: 'Book not found'})
        }
        return res.status(200).send("Deleted successfully");
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.put('/:id',async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message: 'Send all required fields....'})
        }
        const { id } = req.params;
        const result = await book.findByIdAndUpdate(id,req.body)

        if(!result)
        {
            return res.status(400).send({message: 'Book not found'})
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.post('/',async (req,res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message: 'Send all required fields....'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const bookData = await book.create(newBook);
        return res.status(201).send(bookData)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router