const express = require('express')
const Character = require('../controllers/character')
const router = express.Router()
 // Assume this is your multer config
 const createUploadMiddleware = require('../middleware/UploadGeneric');
 
router
.get('/GetCharacterByName/:id', Character.GetCharacterByName)
.get('/GetOneOriginaleCharacterByName/:id', Character.GetOneOriginaleCharacterByName)
.get('/countAllcharacters', Character.countAllCharacters)
.get('/CountNbOriginaleCharacterByUser/:id', Character.CountNbOriginaleCharacterByUser)
.get('/GetAllNamesAndIdsCharacters', Character.GetAllNamesAndIdsCharacters)
.get('/GetAllNamesOfAllCharacters', Character.GetAllNamesOfAllCharacters)
.get('/GetAllCharactersByUser/:id', Character.GetAllCharactersByUser)
.get('/search/:name', Character.GetCharacterByNameSearch)
.post('/GetOriginaleCharacterByUser/:id', Character.GetOriginaleCharacterByUser)
.post('/allcharacters', Character.GetAllCharacters)
.post('/GetAllCharactersDashboard', Character.GetAllCharactersDashboard)
.post('/createANewCharacter', createUploadMiddleware('Characters/').single('image'), Character.CreateANewCharacter)
.post('/CreateAnOriginalCharacter/:id', createUploadMiddleware('Gamer/').single('image'), Character.CreateAnOriginalCharacter)

module.exports = router