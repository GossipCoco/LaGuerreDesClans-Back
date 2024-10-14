const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

const countAllMyFictions = (usr) => {
  console.log("************ countAllMyFictions********* ", usr);
  const promises = []
  const request = model.Fiction.findAndCountAll({
    where: { UserId:usr },
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
const countAllFictionsOnBases = () => {
  console.log("********** countAllFictionsOnBases **************");
  const promises = []
  const request = model.Fiction.findAndCountAll({});
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

const GetAllFictionsOnBase = (nav) => {  
  console.log("**** GetAllFictionsOnBase ****",nav);
  return model.Fiction.findAll({    
    order: [["Title", "ASC"]],
    offset: nav.step * nav.current,
    limit: nav.step,
    include: [
      { model: model.Comments },
      { model: model.User,
        attributes: ['Id', 'UserName']
      },
      { model: model.FictionIllustration },
      { model: model.Chapter },      
      { model: model.Game,
        include: [
          { model: model.GameCharacter,
            attributes: ['Id'],
            include: [ { model: model.Character,
                attributes: ['Id', 'CurrentName', 'Image'],
                include: [ { model: model.Grade },
                  {model: model.Warrior,
                    include: [{ model: model.Clan }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}
const GetAllFictionsByUser = (usr, nav) => {  
  console.log("********  GetAllFictionsByUser ********", usr, nav);
  return model.Fiction.findAll({
    where: { UserId:usr },
    order: [["Title", "ASC"]],
    offset: nav.step * nav.current,
    limit: nav.step,
    include: [
      { model: model.Comments },
      { model: model.User,
        attributes: ['Id', 'UserName']
      },
      { model: model.FictionIllustration },
      { model: model.Chapter },      
      { model: model.Game,
        include: [
          { model: model.GameCharacter,
            attributes: ['Id'],
            include: [ { model: model.Character,
                attributes: ['Id', 'CurrentName', 'Image'],
                include: [ { model: model.Grade },
                  {model: model.Warrior,
                    include: [{ model: model.Clan }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}
const GetAllFictionsByName = (name, nav) => {
  console.log("**** GetTheFictionByName ****", name, nav);
  console.log(name, nav)
  return model.Fiction.findOne({
    order: [["Title", "ASC"]],
    where: {
      Title: { [model.Utils.Op.like]: `%${name}%` },
    },
    include:[ { model: model.Comments}],
    include: [      
      {
        model: model.User,
        attributes: ['Id', 'UserName']
      },
      { model: model.FictionIllustration },
      { model: model.Chapter },      
      {
        model: model.Game,
        include: [          
          {
            model: model.GameCharacter,
            attributes: ['Id'],
            include: [
              {
                model: model.Character,
                attributes: ['Id', 'CurrentName', 'Image'],
                include: [
                  { model: model.Grade },
                  {
                    model: model.Warrior,
                    include: [{ model: model.Clan }],
                  },
                ],
              },
            ],
          },
          {
            model: model.GameGamer,
            include: [{
              model: model.Gamer
            }]
          }
        ],
      },      
     
    ],
  });
};
const GetAChapterByName = (name, nav) => {
  console.log("**** GetAChapterByName ****", name, nav);
  console.log(name, nav)
  return model.Chapter.findOne({
    where: { Title: { [model.Utils.Op.like]: `%${name}%` }, },
    include: [
      
      // { model: model.Comment},
      {
        model: model.ChapterIllustration,
        include: [{ model: model.Illustration }]
      },
      {
        model: model.ChapterLocation,
        include: [{
          model: model.Location
        }]
      },
      {
        model: model.Fiction,
        attributes: ['Id','UserId', 'Title'],
        include: [
          // { model: model.Comment},
          { model: model.FictionIllustration },
          {
            model: model.User,
            attributes: ['Id', 'UserName']
          }]
      },]
  });
};

const CountTotalWordBuUser = (usr) => {
  console.log("**** CountTotalWordsByUser ****", usr);
  return model.Chapter.findAll({
    attributes: [
      'FictionId',
      [model.Sequelize.fn('SUM', Sequelize.col('NbWords')), 'total_words']
    ],
    include: [{
      model: model.Fiction,
      attributes: [], // Ne sélectionne aucun attribut spécifique de Fiction ici si non nécessaire
      include: [{
        model: model.Game,
        attributes: [], // Idem pour Game
        include: [{
          model: model.UserGame,
          attributes: [], // Idem pour UsersGame
          where: { UserId: usr }
        }]
      }]
    }],
    group: ['Chapter.FictionId'], // Assure-toi que le groupement est correct
    raw: true
  });
}
const CountTotalWordByUserV2 = (usr) => {
  console.log("**** CountTotalWordsByUserV2 ****", usr);
  return model.Game.findAll({
    include: [{
      model: model.Fiction,
      where: { UserId: usr },
      attributes: ['Id'],
      include: [{
        model: model.Chapter,
        attributes: ['NbWords'],
        group: ['Chapter.FictionId'],
        raw: true
      }]
    }]
  });
};
const GetLastChapterOfAFiction = (FictionId) => {
  console.log("**** GetLastChapterOfAFiction ****", FictionId);
  return model.Chapter.findOne({
    where: {
      FictionId: FictionId,
      NextChapterId: null
    },
    include: [
      {
      model: model.ChapterLocation,
      include: [{
        model: model.Location
      }]
    }]
  })
}
const GetFiveLastChapByUser = (usr) => {
  console.log("**** GetFiveLastChapByUser ****", usr);
  return model.Chapter.findAll({
    limit: 3,
    attributes: ['Id', 'Title', 'DateCreation', 'Image'],
    order: [['DateCreation', 'DESC']],
    include: [{
      model: model.Fiction,
      attributes: ['Id', 'Title', 'Image'],
      where: { UserId: { [model.Utils.Op.like]: `%${usr}%` } }
    }]
  })
}
const GetAllCommentsByFiction = (id, nav) => {
  return model.Comments.findAll({
    // offset: nav.step * nav.current,
    // limit: nav.step,
    include:[
      {
        model: model.User,
        attributes:['Id', 'avatar', 'LastName', 'FirstName']
      },
      {
      model: model.Fiction,      
      where: 
      { Title: id }
    }],
  })
}
const AddRating = (id, data) => {
  console.log("**** AddRating ****", id, data);
  const promises = []
  const request = model.Rating.create({
    Id: uuidv4(),
    FictionId: data.FictionId,
    UserId: data.UserId,
    Rating: data.Rating,
    DateRated: data.DateRated
  })
  promises.push(request)
  return request
    .then((w) => {
      const newRequestFind = model.Rating.findAll({ where: { FictionId: data.FictionId } })
      promises.push(newRequestFind)
      return newRequestFind
        .then((rating) => {
          // Vérifier si des notes ont été trouvées
          if (rating.length > 0) {
            // Calculer la note moyenne
            const totalRating = rating.reduce((acc, curr) => acc + curr.Rating, 0);
            const averageRating = totalRating / rating.length;
            // Mettre à jour la fiction avec la nouvelle note moyenne
            return model.Fiction.update({ AverageRating: averageRating }, { where: { Id: data.FictionId } });
          } else {
            console.log('Aucune note trouvée pour cette fiction.');
          }
        })
        .then(() => {
          console.log('Note moyenne mise à jour avec succès.');
        })
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}
const CreateCommentForAFiction = (id, data) => {
  console.log("**** CreateCommentForAFiction ****", id, data);
  const promises = []
  const comment = model.Comments.create({
    Id: uuidv4(),
    Content: data.Content,
    DateCreation: new Date().toISOString(),
    UserId: data.UserId,
    FictionId: data.FictionId,
  })
  console.log(comment)
  promises.push(comment)
  return comment
    .then((w) =>{
      return Promise.all(promises);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

const CreateANewChapter = (FictionId, data, imagePath) => {
  console.log("**** CreateANewChapter ****", FictionId, data, imagePath);
  const date = new Date().toISOString()
  const promises = []
  const newChapter = {
    Id: data.Id,
    Title: data.Title,
    Content: data.Content,
    Image: '/images/Fictions/'+imagePath,
    FictionId: FictionId,
    NextChapterId: null,
    DateCreation: date,
    NumberChapter: data.NumberChapter,
  }
  const precedentChapter = {
    NextChapterId: data.Id
  }
  const firstRequest = model.Chapter.create(newChapter)
  promises.push(firstRequest)
  return firstRequest
    .then((response) => {
      if (data.NumberChapter === 1) {
        return Promise.all(promises);
      } else {
        const secondRequest = model.Chapter.update(precedentChapter, { where: { Id: data.PrecedentChapterId } })
        promises.push(secondRequest)
        return secondRequest
          .then((response) => {
            return Promise.all(promises);
          })
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}
const EditChapter = (id, data) => {
  console.log("**** EditChapter ****", id, data);
  const promises = []
  const chapter = { Content: data.Content}
  const request = model.Chapter.update(chapter, { where: { Id: data.Id } })
  promises.push(request)
  return request
    .then(w => { return Promise.all(promises) })
    .catch(err => { console.log("ERROR: ", err) })
}
const queries = {
  countAllFictionsOnBases,
  countAllMyFictions,
  GetAllFictionsOnBase,
  CountTotalWordBuUser,
  CountTotalWordByUserV2,
  GetAllFictionsByName,
  GetAChapterByName,
  GetLastChapterOfAFiction,
  GetFiveLastChapByUser,
  CreateANewChapter,
  AddRating,
  CreateCommentForAFiction,
  GetAllCommentsByFiction,
  GetAllFictionsByUser,
  EditChapter
};

module.exports = queries;