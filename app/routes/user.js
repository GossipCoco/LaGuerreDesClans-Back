const express = require('express');
const User = require('../controllers/user');

const router = express.Router();

router
    .get('/', User.GetAllUsers)
    .get('/:id', User.GetUserById)
    .get('/UserName/:id', User.GetUserByUsername)
    .get('/GemerById/:id', User.GetGamerById)
    .post('/login', User.Login)
    .post('/ChangeStatusMessage/:id', User.ChangeStatusMessage)
    .post('/updateUserInformation/:id', User.UpdateUserInformations)
    .post('/GetMessageByReceiverId/:id', User.GetMessageByReceiverId)

module.exports = router;