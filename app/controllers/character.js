const query = require('../Queries/CharacterQueries')
const { handleResponse } = require("./function");  // Importer la fonction
const Character = {}
Character.countAllCharacters = (req, res) => {
    handleResponse(res, query.countAllCharacters())
}
Character.GetAllCharacters = (req, res) => {
    handleResponse(res, query.GetAllCharacters(req.body.nav))
}
Character.GetAllCharactersDashboard = (req, res) => {
    handleResponse(res, query.GetAllCharactersDashboard(req.body.nav))
}
Character.GetCharacterByName = (req, res) => {
    const id = req.params.id
    handleResponse(res, query.GetCharacterByName(id))
}
Character.GetCharacterByNameSearch = (req, res) => {
    const id = req.params.name
    handleResponse(res, query.GetCharacterByNameSearch(id))
}
Character.GetOriginaleCharacterByUser = (req, res) => {
    const id = req.params.id
    handleResponse(res, query.GetOriginaleCharacterByUser(id))
} 
Character.CreateANewCharacter = (req, res) => {
    const data = req.body;
    const imageFile = req.file;
    if (imageFile) {
        data.Image = imageFile.filename;
    }
    handleResponse(res, query.CreateANewCharacter(data))
}
Character.GetAllNamesAndIdsCharacters = (req, res) => {
    handleResponse(res, query.GetAllNamesAndIdsCharacters())
}
Character.GetAllCharactersByUser = (req, res) => {
    handleResponse(res, query.GetAllCharactersByUser(req.params.id))
}
Character.GetAllNamesOfAllCharacters = (req, res) => {
    handleResponse(res, query.GetAllNamesOfAllCharacters())
}
module.exports = Character