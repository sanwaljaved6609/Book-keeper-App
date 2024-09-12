import express from 'express';

import Book from '../models/models.js'

const router = express.Router();

// Route to save a book

router.post('/', async (req, res)=>{

    try{
      if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ){
        return response.alert("Send all the required fields: Title, Author and Publish Year");
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
  
    }
  
  
    catch(error){
      console.log(error);
  
    }
  })
  
  
  //Route to get all books from database
  
  router.get('/', async (req,res)=>{
    try{
      const books = await Book.find({});
  
      return res.status(200).json({
        count:books.length,
        data: books
      });
    }
    catch(error){
      console.log(error);
    }
  })
  
  //Route for getting 1 book from database by id
  
  router.get('/:id', async (req,res)=>{
    try{
      const {id} = req.params;
      const book = await Book.findById(id);
  
      return res.status(200).json(book);
    }
    catch(error){
      console.log(error);
    }
  })
  
  
  //Route for update a book
  
  router.put('/:id', async(req,res)=>{
    try{
      if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ){
        return res.send('Send all required fields: Author, Title and PublishYear');
      }
  
      const {id} = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if(!result){
        return res.status(404).send('Book not found');
      }else{
        return res.status(200).send('Book is updated successfully:');
      }
  
    }
    catch(error){
      console.log(error);
    }
  })
  
  
  //Route for Deleting a Book
  
  router.delete('/:id', async (req,res)=>{
    try{
      const {id} = req.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if(!result){
        return res.status(404).send('Book not found');
      }else{
        return res.status(200).send('Book is Deleted Successfully:');
      }
  
    }
    catch(error){
      console.log(error);
    }
  })
  

  export default router;