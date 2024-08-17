const query = require('../Queries/CharacterQueries')
const Character = {}
Character.countAllCharacters = (req, res) => {
    query.countAllCharacters()
        .then(w => {
            // const nbResult = Object.keys(w).length
            console.log("w", w)
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500)
        })
}
Character.GetAllCharacters = (req, res) => {
    // console.log(req.body)
    query.GetAllCharacters(req.body.nav)
        .then(w => {
            // console.log("w : ", w)
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500)
        })
}
Character.GetAllCharactersDashboard = (req, res) => {
    console.log(req.body)
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
    console.log("GetCharacterByName id : ",req.params.id,  id)
    query.GetCharacterByName(id)
        .then(w => {
            res.send({ ob: w, res: true }).status(200)
        })
        .catch(err => {
            console.log("GetCharacterByName id : ",err)
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
            //console.log(err)
            res.send(err).status(500)
        })
}

Character.CreateANewCharacter = (req, res) => {
    console.log(req.body)
    const data = req.body;
    const imageFile = req.file;
    if (imageFile) {
        data.Image = imageFile.filename;
    }
    console.log(data)
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
            // console.log(w)
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
            // console.log(w)
            res.send({ ob: w, res: true, message: "GetAllCharactersByUser" }).status(200);
        })
        .catch((err) => {
            console.log(err);
            res.send(err).status(500);
        });
}

module.exports = Character