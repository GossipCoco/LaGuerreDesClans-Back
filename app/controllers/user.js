const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
const UserQueries = require('../Queries/UserQueries.js')
const User = {};
User.Login = (req, res) => {
  console.log(req.body)
  const { Email, password } = req.body;
  const Pwd = req.body.Password
  UserQueries.GetUserByEmail(Email)
    .then(user => {
      // console.log("user controller", user.Password)
      if (!user) {
        return res.status(404).send({ message: 'User Not Found.' });
      }
      if (user.Password !== req.body.Password) {
        return res.status(401).send({ message: 'Invalid Password!' });
      }
      const result = {
        usrID: user.Id,
        Email: user.Email,
        isSuccess: true,
        tocken: null,
        role: user.Role.Id,
        expire: config.JWT.expire
      }
      const token = jwt.sign({ id: user.Id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      result.tocken = token
      UserQueries.UpdateLastDateConnection(user.Id, user.Email)
      .then(response => {
        console.log(response)
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
User.GetAllUsers = (req, res) => {
  UserQueries.GetAllUsers()
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log(err)
      res.send(err).status(500)
    })
}
User.GetUserById = (req, res) => {
  const id = req.params.id;
  UserQueries.GetUserById(id)
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log("GetUserById", err)
      res.send(err).status(500)
    })
}
User.GetUserByUsername = (req, res) => {
  const id = req.params.id;
  UserQueries.GetUserByUsername(id)
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log("GetUserById", err)
      res.send(err).status(500)
    })
}
User.GetGamerById = (req, res) => {
  const id = req.params.id
  UserQueries.GetGamerById(id)
  .then(w => {
    res.send({ ob: w, res: true }).status(200)
  })
  .catch(err => {
    console.log("GetUserById", err)
    res.send(err).status(500)
  })
}
User.UpdateUserInformations = (req, res) => {
  UserQueries.UpdateUserInformations(req.params.id, req.body)
    .then(w => {
      res.send({ ob: w, res: true }).status(200)
    })
    .catch(err => {
      console.log(err)
      res.send(err).status(500)
    })
}

module.exports = User