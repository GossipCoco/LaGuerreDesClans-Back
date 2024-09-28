const query = require('../Queries/CharacterQueries')
const { handleResponse } = require("./function");  // Importer la fonction
const Character = {}
Character.countAllCharacters = (req, res) => {
    query.countAllCharacters()
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500)
        })
}
Character.GetAllCharacters = (req, res) => {
    query.GetAllCharacters(req.body.nav)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500)
        })
}
Character.GetAllCharactersDashboard = (req, res) => {
    query.GetAllCharactersDashboard(req.body.nav)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            //console.log(err)
            res.send(err).status(500)
        })
}
Character.GetCharacterByName = (req, res) => {
    const id = req.params.id
    query.GetCharacterByName(id)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            res.send(err).status(500)
        })
}
Character.GetCharacterByNameSearch = (req, res) => {
    const id = req.params.name
    query.GetCharacterByNameSearch(id)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            res.send(err).status(500)
        })
}

Character.CreateANewCharacter = (req, res) => {
    const data = req.body;
    const imageFile = req.file;
    if (imageFile) {
        data.Image = imageFile.filename;
    }
    query.CreateANewCharacter(data)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500)
        })
}
Character.GetAllNamesAndIdsCharacters = (req, res) => {
    query.GetAllNamesAndIdsCharacters()
        .then((w) => {
            res.send({ ob: w, res: true, message: "GetAllNamesAndIdsCharacters" }).status(200);
        })
        .catch((err) => {
            console.log(err);
            res.send(err).status(500);
        });
}
Character.GetAllCharactersByUser = (req, res) => {
    query.GetAllCharactersByUser(req.params.id)
        .then((w) => {
            res.send({ ob: w, res: true, message: "GetAllCharactersByUser" }).status(200);
        })
        .catch((err) => {
            console.log(err);
            res.send(err).status(500);
        });
}
Character.GetAllNamesOfAllCharacters = (req, res) => {
    query.GetAllNamesOfAllCharacters()
    .then((w) => {
        res.send({ ob: w, res: true, message: "GetAllNamesOfAllCharacters" }).status(200);
    })
    .catch((err) => {
        console.log(err);
        res.send(err).status(500);
    });
}
module.exports = Character