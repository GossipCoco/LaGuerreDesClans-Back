const express = require('express');

const Fiction = require('../controllers/fiction');

const uploadFileMiddleware = require('../middleware/uploadImgFiction');  // Assume this is your multer config

const router = express.Router();

router
.get('/GetFiveLastChapByUser/:id', Fiction.GetFiveLastChapByUser)
.post('/Chapitre/:id', Fiction.GetAChapterByName)
.post('/GetLastChapterOfAFiction/:id', Fiction.GetLastChapterOfAFiction)
.post('/CreateAChapitre/:id',  uploadFileMiddleware.single('image'),Fiction.CreateANewChapter)
module.exports = router;