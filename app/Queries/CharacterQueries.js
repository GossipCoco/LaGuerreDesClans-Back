const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');

const countAllCharacters = () => {
    console.log("**** countAllCharacters   *****************");
    const request = model.Character.findAndCountAll({
      attributes: ['Id']
    });
    const promises = []
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
  };
  const GetAllCharacters = (nav) => {
    console.log("************ GetAllCharacters ************", nav)
    return model.Character.findAll({
      offset: nav.step * nav.current,
      limit: nav.step,
      order: [["CurrentName", "ASC"]],
      include: [
        { model: model.Grade },
        {
          model: model.Clan,
          include: [{ model: model.Location }],
        },
        {
          model: model.Warrior,  
          include: [
            {
              model: model.Clan,
              include: [{ model: model.Location }],
             
            },
          ],
        },
      ],
    });
  };
  const GetAllCharactersDashboard = (nav) => {
    console.log("GetAllCharactersDashboard", nav.step)
    return model.Character.findAll({
      attributes: ['Id', 'CurrentName', 'Image'],
    })
      .then(w => {
        return Promise.all(w);
      })
      .catch(err => {
        console.log("ERROR: ", err)
        return Promise.reject(err);
      })
  
  };
  const GetAllNamesAndIdsCharacters = () => {
    return model.Character.findAll({
      attributes: ['Id', 'CurrentName'],
      order: [["CurrentName", "ASC"]]
    })
  }
  const GetAllCharactersByUser = (user) => {
    return model.Character.findAll({
      include: [        
        { model: model.Grade },
        {
          model: model.Clan,
          include: [{ model: model.Location }],
          order: [["Id", "ASC"]],
        },
        {
          model: model.Warrior,
          include: [
            {
              model: model.Clan,
              include: [{ model: model.Location }],
              order: [["Id", "ASC"]],
            },
          ],
          order: [["ClanId", "ASC"]],
        },
      ],
    });
  };

  
const GetCharacterByName = (name) => {
  console.log("**** GetCharacterByName ****", name);
  return model.Character.findOne({
    where: { Id: name },
    include: [
      // { model: model.CharacterImage },
      { model: model.Grade },
      {
        model: model.Clan,
        include: [{ model: model.Location }],
        order: [["Id", "ASC"]],
      },
      {
        model: model.Warrior,
        include: [
          {
            model: model.Clan,
            include: [{ model: model.Location }],
            order: [["Id", "ASC"]],
          },
        ],
        order: [["ClanId", "ASC"]],
      },
      
      // { model: model.CharacterImage },
      // {
      //   model: model.RelationCharacters,
      //   include: [{ model: model.TypeRelation }]
      // },
    ],
  });
};

const GetCharacterByNameSearch = (name) => {
  console.log("**** Character ****", name);
  return model.Character.findAll({
    where: {
      Id: { [model.Utils.Op.like]: `%${name}%` },
      CurrentName: { [model.Utils.Op.like]: `%${name}%` }
    },
    include: [
      { model: model.Grade },
      {
        model: model.Clan,
        include: [{ model: model.Location }],
      },
      {
        model: model.Warrior,
        include: [
          {
            model: model.Clan,
            include: [{ model: model.Location }],
          },
        ],
      },
    ],
  });
};
const GetAllCharactersByNameGradeAndClan = (data) => {
  console.log("GetAllCharactersByNameGradeAndClan", data);
}
const CreateANewCharacter = (data) => {
  console.log("CreateANewCharacter", data);
  const promises = [];
  let Name = data.CurrentName;
  var str = Name.replace(/\s+/g, '');
  const newCharacter = {
    Id: str,
    CurrentName: Name,
    Genre: data.Genre,
    KitName: data.KitName,
    ApprenticeName: data.ApprenticeName,
    WarriorName: data.WarriorName,
    OlderName: data.OlderName,
    LeaderName: data.LeaderName,
    Age: data.Age,
    Description: data.Description,
    Personnality: data.Personnality,
    Biography: data.Biography,
    Image: data.Image,
    GradeId: data.Grade,
    GradeId: data.Grade
  };
  const characterCreated = model.Character.create(newCharacter);
  promises.push(characterCreated);
  return characterCreated
    .then((w) => {
      const Warrior = {
        Id: str,
        Name: Name,
        Image: data.Image.name,
        ClanId: data.Clan,
      };
      const WarriorCreated = model.Warrior.create(Warrior)
      promises.push(WarriorCreated)
      return WarriorCreated
        .then((w) => {
          return Promise.all(promises)
        }
        ).catch((err) => {
          console.log(err)
          res.send(err).status(500);
        });
    })
    .catch((err) => {
      console.log(err)
      res.send(err).status(500);
    });
};
  module.exports = {
    countAllCharacters,
    GetAllCharacters,
    GetAllCharactersDashboard,
    GetAllNamesAndIdsCharacters,
    GetAllCharactersByUser,
    GetCharacterByName,
    GetCharacterByNameSearch,
    GetAllCharactersByNameGradeAndClan,
    CreateANewCharacter
  }