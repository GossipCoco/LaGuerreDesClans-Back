const Grade = {};
const { handleResponse } = require("./function");  // Importer la fonction
const query = require('../Queries/GradeQueries')

Grade.GetAllGrades = (req, res) => {
    handleResponse(res, query.GetAllGrades(req, res))
}
module.exports = Grade;