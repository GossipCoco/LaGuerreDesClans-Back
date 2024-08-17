const express = require('express')

const Character = require('../controllers/character')


const router = express.Router()
const uploadFileMiddleware = require('../middleware/uploadCharacterImage')

router
.get('/GetCharacterByName/:id', Character.GetCharacterByName)
.get('/countAllcharacters', Character.countAllCharacters)
.get('/GetAllNamesAndIdsCharacters', Character.GetAllNamesAndIdsCharacters)
.get('/GetAllCharactersByUser/:id', Character.GetAllCharactersByUser)
.get('/search/:name', Character.GetCharacterByNameSearch)
.post('/allcharacters', Character.GetAllCharacters)
.post('/GetAllCharactersDashboard', Character.GetAllCharactersDashboard)
.post('/createANewCharacter', uploadFileMiddleware.single('image'), Character.CreateANewCharacter)

module.exports = router