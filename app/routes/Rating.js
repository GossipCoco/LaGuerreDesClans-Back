const express = require('express');

const Fiction = require('../controllers/fiction');

const uploadFileMiddleware = require('../middleware/uploadImgFiction');  // Assume this is your multer config

const router = express.Router();

router
.post('/AddRating/:id', Fiction.AddRating)
module.exports = router;