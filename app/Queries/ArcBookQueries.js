const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

const GetAllArcsWithBooks = (nav) => {
    console.log("************ GetAllBooks ************", nav)
    return model.Arc.findAll({
        include:[{
            model: model.Book
        }]
    })
}

const GetAllBooks = (nav) =>{
    console.log("************ GetAllBooks ************", nav)
    return model.Book.findAll({
        offset: nav.step * nav.current,
        limit: nav.step,
        include:[{
            model: model.Arc
        }]
    })
}

module.exports = {
    GetAllArcsWithBooks,
    GetAllBooks

}