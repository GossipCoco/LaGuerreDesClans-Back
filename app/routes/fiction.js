const express = require('express');

const Fiction = require('../controllers/fiction');

const uploadFileMiddleware = require('../middleware/uploadImgFiction');  // Assume this is your multer config

const router = express.Router();

router
   .post('/:id', Fiction.GetAllFictionsByName)
   .post('/CountTotalWordBuUser/:id', Fiction.CountTotalWordBuUser)
   .post('/GetAllCommentsByFiction/:id', Fiction.GetAllCommentsByFiction)   
   .get('/CountTotalWordBuUserV2/:id', Fiction.CountTotalWordBuUserV2)
   .get('/GetFiveLastChapByUser/:id', Fiction.GetFiveLastChapByUser)
   .post('/chapitre/:id', Fiction.GetAChapterByName)
   .post('/createAChapitre/:id',  uploadFileMiddleware.single('image'),Fiction.CreateANewChapter)
   .post('/GetLastChapterOfAFiction/:id', Fiction.GetLastChapterOfAFiction)
   .post('/AddRating/:id', Fiction.AddRating)
   .post('/CreateCommentForAFiction/:id', Fiction.CreateCommentForAFiction)
   
   

module.exports = router;