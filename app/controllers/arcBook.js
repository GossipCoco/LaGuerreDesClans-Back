const query = require('../Queries/ArcBookQueries')
const ArcBook = {}

ArcBook.GetAllArcsWithBooks = (req, res) => {
    query.GetAllArcsWithBooks(req.body)
    .then(w => {
        // const nbResult = Object.keys(w).length
        console.log("w", w)
        res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
        console.log(err)
        res.send(err).status(500)
    })
}

ArcBook.GetAllBooks = (req, res) => {
    console.log(req.body)
    query.GetAllBooks(req.body)
    .then(w => {
        // const nbResult = Object.keys(w).length
        console.log("w", w)
        res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
        console.log(err)
        res.send(err).status(500)
    })
}
module.exports = ArcBook