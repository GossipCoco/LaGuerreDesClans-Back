const express = require('express')
const ArcBook = require('../controllers/arcBook')


const router = express.Router()
const uploadFileMiddleware = require('../middleware/uploadCharacterImage')

router
.get('/GetBookByTitle/:id', ArcBook.GetBookByTitle)
.post('/GetAllBooks', ArcBook.GetAllBooks)
.post('/GetAllArcsWithBooks', ArcBook.GetAllArcsWithBooks)

module.exports = router