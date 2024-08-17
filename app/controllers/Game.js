const model = require('../Models/GameModel');
const queries = require("../Queries/GameQueries");


const Game = {}

Game.GetAllGames = (req, res) => {
    queries.GetAllGames(req.body)
    .then((w) => {
        res.send({ ob: w, res: true }).status(200);
      })
      .catch((err) => {
        console.log("GetAllGames", err);
        res.send(err).status(500);
      });
}
Game.GetAllGamesByUser = (req, res) => {
  console.log("req.body", req.body)
  queries.GetAllGamesByUser(req.params.id,  req.body)
  .then((w) => {
    res.send({ ob: w, res: true }).status(200);
  })
  .catch((err) => {
    console.log("GetAllGamesByUser ",err);
    res.send(err).status(500);
  });
  
}
Game.countAllMyGames = (req, res) => {
  queries.countAllMyGames(req.params.id)
  .then((w) => {
    res.send({ob: w.count, res: true }).status(200);
  })
  .catch((err) => {
    console.log("countAllMyGames",err);
    res.send(err).status(500);
  });
}
Game.countAllGames = (req, res) => {
  queries.countAllGames()
  .then((w) => {
    res.send({ob: w.count, res: true }).status(200);
  })
  .catch((err) => {
    res.send(err).status(500);
  });
}
Game.CreateANewGame = (req, res) => {
  console.log("CreateANewGame", req.file)
  const UserId = req.params.id;
  const imagePath = req.file ? req.file.filename : null; // Get the path of the uploaded image if present
  // Destructure additional data if needed
  const { Title, Summary, FirstCharacterId, SecondCharacterId, LocationId } = req.body;
  // Check if the necessary fields are provided
  if (!Title || !Summary || !FirstCharacterId || !SecondCharacterId) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const data = { Title, Summary, FirstCharacterId, SecondCharacterId, LocationId };
  queries.CreateANewGame(UserId, data, imagePath)
    .then((w) => {
      res.status(200).send({ message: "Game created successfully", data: w });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });    
}
Game.GetFiveLastGameByUser = (req, res) => {
  queries.GetFiveLastGameByUser(req.params.id)
  .then((w) => {
        res.status(200).send({ message: "Game created successfully", data: w });
  })
  .catch((err) => {
    console.log("GetFiveLastGameByUser", err);
    res.status(500).send(err);
  });
}
Game.GetAllLastFiveGames = (req, res) => {
  queries.GetAllLastFiveGames(req.body)
  .then((w) => {
    // console.log(result)
    res.status(200).send({ message: "Game created successfully", data: w });
  })
  .catch((err) => {   
    res.status(500).send(err);
  });
}
Game.AddANewCharacterToGameAndFiction = (req, res) => {
  queries.AddANewCharacterToGameAndFiction(req.params.id, req.body)
  .then((w) => {
    // console.log(result)
    res.status(200).send({ message: "AddANewCharacterToGameAndFiction", data: w });
  })
  .catch((err) => {
    console.log( "AddANewCharacterToGameAndFiction",err);
    res.status(500).send(err);
  });
}
module.exports = Game