const queries = require("../Queries/LocationQueries");

const Clan = {};

Clan.GetAllClans = (req, res) => {
  queries
    .GetAllClans()
    .then((w) => {
      res.send({ ob: w, res: true }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(500);
    });
};

Clan.GetClanById = (req, res) => {
  const id = req.params.id
  queries
    .GetClanById(id)
    .then((w) => {
      res.send({ ob: w, res: true }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(500);
    });
}
Clan.GetClanByNameClan = (req, res) => {
  const id = req.params.name
  queries.GetClanByNameClan(id)
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log(err)
      res.send(err).status(500)
    })
}
Clan.GetAllLocations = (req, res) => {
  console.log("GetAllLocations")
  queries.GetAllLocations()
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log(err)
      res.send(err).status(500)
    })
}
Clan.GetLocationById = (req, res) => {
  const id = req.params.id
  queries.GetLocationById(id)
  .then(w => {
    res.send({ ob: w, res: true }).status(200)
  })
  .catch(err => {
    console.log(err)
    res.send(err).status(500)
  })
}
module.exports = Clan