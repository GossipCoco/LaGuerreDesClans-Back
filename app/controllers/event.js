const queries = require("../Queries/EventQueries");

const Event = {};

Event.GetAllEvents = (req, res) => {
  console.log("**** GetAllEvents ****");
  const nav = req.body
  queries
    .GetAllEvents(nav)
    .then((w) => {
      res.send({ ob: w, res: true }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(500);
    });
};
Event.GetPointParId = (req, res ) => {
  queries
    .GetPointParId(req.params.id, req.body)
    .then((w) => {
      res.send({ ob: w, res: true }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(500);
    });
  }
module.exports = Event