const express = require('express');

const Fiction = require('../controllers/chapter');

 // Assume this is your multer config
const createUploadMiddleware = require('../middleware/UploadGeneric');
const router = express.Router();

router
.get('/GetFiveLastChapByUser/:id', Fiction.GetFiveLastChapByUser)
.post('/Chapitre/:id', Fiction.GetAChapterByName)
.post('/GetLastChapterOfAFiction/:id', Fiction.GetLastChapterOfAFiction)
.post('/CreateAChapitre/:id', createUploadMiddleware('Fictions/').single('image'), Fiction.CreateANewChapter)
.post('/EditChapter/:id', Fiction.EditChapter)

module.exports = router;