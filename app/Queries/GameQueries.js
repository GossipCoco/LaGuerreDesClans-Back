const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

const countAllMyGames = (usr) => {
  console.log("countAllMyFictions", usr);
  const promises = []
  const request = model.Game.findAndCountAll({
    include: [
      {
        model: model.Fiction,
        where: {
          UserId: { [model.Utils.Op.like]: `%${usr}%` },
        },
      },
    ]
  });
  promises.push(request)
  return request
    .then(w => {
      const nbResult = Object.keys(w.rows).length
      return { count: nbResult }
    })
    .catch(err => {
      console.log("ERROR: ", err)
    })
};

const countAllGames = () => {
  console.log("countAllGames");
  const promises = []
  const request = model.Game.findAndCountAll({});
  promises.push(request)
  return request
    .then(w => {
      const nbResult = Object.keys(w.rows).length
      return { count: nbResult }
    })
    .catch(err => {
      console.log("ERROR: ", err)
    })
};

const GetAllGames = (nav) => {
  console.log("**** All Games ****", nav, nav.step * nav.current, nav.step);
  return model.Game.findAll({
    offset: nav.step * nav.current,
    limit: nav.step,
    include: [
      // { model: model.UserGame },
      {
        model: model.Fiction,
        order: [["Title", "ASC"]],
        include: [{
          model: model.Chapter
        }],
        include: [{ model: model.FictionIllustration}]
      }]
  })
};

const GetAllGamesByUser = (user, nav) => {
  console.log("**** All Games By User****", user, nav);
  return model.Game.findAll({
    offset: nav.step * nav.current,
    limit: nav.step,
    include: [
  
      {
        model: model.Fiction,
        where: {
          UserId: { [model.Utils.Op.like]: `%${user}%` },
        },
        order: ['Title'],
        include: [{ model: model.Chapter }],
        include: [{ model: model.FictionIllustration}]
      },
    ],
  });
};
const GetAllLastFiveGames = (nav) => {
  console.log("**** GetAllLastFiveGames **** nav : ", nav.step);
  return model.Game.findAll({
    offset: nav.step,
    limit: nav.step,
    attributes: ['Id'],
    include: [
      { model: model.UserGame },
      {
        model: model.Fiction,
        attributes: ['Id', 'Title', 'Summary', 'Image', 'DateCreation'],
        order: [["DateCreation", "DESC"]],
      }]
  })
};

const GetFiveLastGameByUser = (usr) => {
  console.log("**** GetFiveLastGameByUser ****", usr);
  console.log(new Date(new Date().toISOString() - 24 * 60 * 60 * 20000))
  return model.Game.findAll({
    limit: 2,
    attributes: ['Id', 'DateCreation'],
    order: [['DateCreation', 'DESC']],
    where: {
      TypeGameId: 'Fiction',
    },
    include: [
      { model: model.UserGame },
      {
        model: model.Fiction,
        attributes: ['Id', 'Title', 'Summary', 'Image'],
        where: {
          UserId: { [model.Utils.Op.like]: `%${usr}%` },
        },
        include: [{ model: model.FictionIllustration}]
      }
    ]
  })
}

/**
 * 
 * @param {String} UserId 
 * @param {Object} data 
 * @param {String} imagePath 
 * @returns {Object}
 */
const CreateANewGame = (UserId, data, imagePath) => {
  console.log("**** CreateANewGame ****", UserId, data, imagePath);
  const date = new Date().toISOString();
  const promises = [];
  const gameId = uuidv4();
  const FictionId = uuidv4() 
  const requestNewGame = {
    Id: gameId,
    DateCreation: date,
    GameTypeId: 'Fiction'
  };
  const firstRequest = model.Game.create(requestNewGame);
  promises.push(firstRequest);
  return firstRequest  
    .then(() => {      
      const requestNewFiction = {
        Id: FictionId, // Nouvelle clé primaire pour Fiction
        Title: data.Title,
        Summary: data.Summary,
        Image: imagePath,  // Use the filename from multer
        GameId: gameId,
        DateCreation: date,
        UserId: UserId
      };   
      const secondRequest = model.Fiction.create(requestNewFiction);  
      promises.push(secondRequest);
      return secondRequest
        .then(() => {
          const requestUserGame = {
            Id: uuidv4(), // Nouvelle clé primaire pour UsersGame
            GameId: gameId,
            UserId: UserId
          };
          const thirdRequest = model.UserGame.create(requestUserGame);
          promises.push(thirdRequest);
          return thirdRequest
            .then(() => {
              const requestIllustration = {
                Id: imagePath,
                DateCreation: date
              }
              const requestIllustrationCreate = model.Illustration.create(requestIllustration)
              promises.push(requestIllustrationCreate)
              return requestIllustrationCreate
              .then(() => {
                const requestFictionIllustration = {
                  Id: uuidv4(),
                  FictionId: FictionId,
                  IllustrationId: imagePath
                }
                const requestIllFic = model.FictionIllustration.create(requestFictionIllustration)
                promises.push(requestIllFic)
                return requestIllFic
                .then(() => {
                  Promise.all(promises)
                })
                .catch((err) => {
                  console.log(err);
                  return Promise.reject(err);
                });
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject(err);
              });
            })
            .catch((err) => {
              console.log(err);
              return Promise.reject(err);
            });
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject(err);
        });
    });
   
}
const AddANewCharacterToGameAndFiction = (Id, data) => {
  console.log("**** AddANewCharacterToGameAndFiction ****", Id, data);
  const promises = []
  const requestFirstGameCharacter = {
    Id: Id + ' - ' + data.CharacterId,
    GameId: Id,
    CharacterId: data.CharacterId
  }
  console.log(requestFirstGameCharacter)
  const request = model.GameCharacter.create(requestFirstGameCharacter)
  promises.push(request)
  return request
    .then((w) => {
      console.log(w)
      return Promise.all(promises);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

module.exports = {
  countAllMyGames,
  countAllGames,
  GetAllGames,
  GetAllLastFiveGames,
  GetAllGamesByUser,
  GetFiveLastGameByUser,
  CreateANewGame,
  AddANewCharacterToGameAndFiction,
}