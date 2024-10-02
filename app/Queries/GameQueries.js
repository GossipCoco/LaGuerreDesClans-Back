const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

const countAllMyGames = (usr) => {
  console.log("countAllMyGames", usr);
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
    // order: [["DateCreation", "ASC"]],
    where: {
      TypeGameId: 'Fiction',
    },
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
        // order: ['Title'],
        where: {
          UserId: { [model.Utils.Op.like]: `%${user}%` },
        },        
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
    attributes: ['Id', 'DateCreation'],
    where:{TypeGameId : 'Fiction'},
    order: [["DateCreation", "ASC"]],
    include: [
      { model: model.UserGame },
      {
        model: model.Fiction,
        attributes: ['Id', 'Title', 'Summary', 'Image', 'DateCreation']
        
      }]
  })
};
const GetAllGamesByCharacter = (character, nav) => {  
  console.log("**** GetAllGamesByCharacter ****", character, nav);
  return model.Game.findAll({
    offset: nav.step,
    limit: nav.step,
    include: [
      { model: model.GameCharacter,
        where: {
          CharacterId: { [model.Utils.Op.like]: `%${character}%` },
        },
      }, 
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
}
const GetFiveLastGameByUser = (usr) => {
  console.log("**** GetFiveLastGameByUser ****", usr);
  console.log(new Date().toISOString() - 24 * 60 * 60 * 20000)
  return model.Game.findAll({
    limit: 3,
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

const CreateANewGame = async (UserId, data, imagePath) => {
  console.log("**** CreateANewGame ****", UserId, data, imagePath);
  const date = new Date().toISOString();
  const gameId = uuidv4();
  const FictionId = uuidv4();
  const NewImagePath = '/images/Fictions/' + imagePath;

  try {
    // Crée un nouveau jeu
    const requestNewGame = {
      Id: gameId,
      DateCreation: date,
      TypeGameId: 'Fiction'
    };
    await model.Game.create(requestNewGame);

    // Crée une nouvelle fiction
    const requestNewFiction = {
      Id: FictionId,
      Title: data.Title,
      Summary: data.Summary,
      Image: NewImagePath,
      GameId: gameId,
      DateCreation: date,
      UserId: UserId
    };
    await model.Fiction.create(requestNewFiction);

    // Associe le jeu à l'utilisateur
    const requestUserGame = {
      Id: uuidv4(),
      GameId: gameId,
      UserId: UserId
    };
    await model.UserGame.create(requestUserGame);

    // Vérifie si l'illustration existe déjà
    const existingIllustration = await model.Illustration.findOne({
      where: { Id: NewImagePath }
    });

    let illustrationId;

    if (!existingIllustration) {
      // Crée une nouvelle illustration seulement si elle n'existe pas déjà
      const requestIllustration = {
        Id: NewImagePath,  // Utilise le chemin de l'image comme clé primaire
        DateCreation: date
      };
      const newIllustration = await model.Illustration.create(requestIllustration);
      illustrationId = newIllustration.Id;
    } else {
      // Si l'illustration existe déjà, récupère son ID
      illustrationId = existingIllustration.Id;
    }

    // Lier la fiction à l'illustration
    const requestFictionIllustration = {
      Id: uuidv4(),
      FictionId: FictionId,
      IllustrationId: illustrationId  // Utilise l'ID de l'illustration
    };
    await model.FictionIllustration.create(requestFictionIllustration);

    // Associe le premier personnage au jeu
    const RequestCharacterFirst = {
      Id: uuidv4(),
      GameId: gameId,
      CharacterId: data.FirstCharacterId
    };
    await model.GameCharacter.create(RequestCharacterFirst);

    // Associe le second personnage au jeu
    const RequestCharacterSecond = {
      Id: uuidv4(),
      GameId: gameId,
      CharacterId: data.SecondCharacterId
    };
    await model.GameCharacter.create(RequestCharacterSecond);

    // Une fois toutes les opérations terminées, redirige l'utilisateur
    console.log('Redirection après création de la fiction');
    return { success: true }; // Tu peux ici déclencher une redirection dans ton frontend
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};


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
  GetAllGamesByCharacter,
  CreateANewGame,
  AddANewCharacterToGameAndFiction,
}