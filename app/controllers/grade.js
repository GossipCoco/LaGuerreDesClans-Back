const Grade = {};

const queries = require('../Queries/GradeQueries')

Grade.GetAllGrades = (req, res) => {
    queries.GetAllGrades(req, res)
    .then(w => {
        res.send({ob: w, res: true}).status(200)
    })
    .catch(err => {
        console.log(err)
        res.send(err).status(500)
    })
}
module.exports = Grade;