const express = require('express');

const Fiction = require('../controllers/fiction');

const uploadFileMiddleware = require('../middleware/uploadImgFiction');  // Assume this is your multer config

const router = express.Router();

router
   .get('/countAllMyFictions', Fiction.countAllMyFictions)
   .get('/countAllFictionsOnBases', Fiction.countAllFictionsOnBases)
   .post('/GetAllFictionsOnBase', Fiction.GetAllFictionsOnBase)
   .get('/countAllMyFictions/:id', Fiction.countAllMyFictions)
   .post('/CountTotalWordBuUser/:id', Fiction.CountTotalWordBuUser)
   .get('/CountTotalWordBuUserV2/:id', Fiction.CountTotalWordBuUserV2)
   .post('/GetAllCommentsByFiction/:id', Fiction.GetAllCommentsByFiction) 
   .post('/getFictionByName/:id', Fiction.GetAllFictionsByName)
   .get('/GetFiveLastChapByUser/:id', Fiction.GetFiveLastChapByUser)
   .post('/chapitre/:id', Fiction.GetAChapterByName)
   .post('/GetLastChapterOfAFiction/:id', Fiction.GetLastChapterOfAFiction)
   .post('/createAChapitre/:id',  uploadFileMiddleware.single('image'),Fiction.CreateANewChapter)
   .post('/AddRating/:id', Fiction.AddRating)
   .post('/CreateCommentForAFiction/:id', Fiction.CreateCommentForAFiction)
   
   

module.exports = router;