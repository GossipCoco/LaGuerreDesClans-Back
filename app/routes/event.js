const express = require('express');

const Event = require('../controllers/event');

const uploadFileMiddleware = require('../middleware/uploadImgFiction');  // Assume this is your multer config

const router = express.Router();

router
    .post('/', Event.GetAllEvents)
    .post('/GetPointParId/:id', Event.GetPointParId)

module.exports = router;