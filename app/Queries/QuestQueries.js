const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

/**
 * 
 * @returns {Object}
 */
const GetTotalQuest = () => {    
    console.log("******** GetTotalQuest ********")
    const promises = []
    const request = model.Quest.findAndCountAll({})
    promises.push(request)
    return request
      .then(w => {
        const nbResult = Object.keys(w.rows).length
        console.log("nbResult", nbResult)
        return { count: nbResult }
      })
      .catch(err => {
        console.log("ERROR: ", err)
      })

}
/**
 * 
 * @param {Object} nav 
 * @returns {Object}
 */
const GetAllQuests = (nav) => {
    console.log("******** GetAllQuests ********", nav)
    return model.Quest.findAll({
        offset: nav.step * nav.current,
        limit: nav.step,
        order: [["Id", "ASC"]],
        include: [
          { model: model.QuestParallax
          },
          {
            model: model.QuestImage
        }]
    })
}
const GetQuestById = (id) => {
  console.log("******** GetQuestById ********", id)
  return model.Quest.findOne({
    where: { Id: id},
    include: [
      { model: model.QuestParallax, 
        include: [{
          model: model.Parallax
        }]
      },
      {
        model: model.QuestImage
    }]
  })
}
module.exports = {
    GetAllQuests,
    GetTotalQuest,
    GetQuestById
}
