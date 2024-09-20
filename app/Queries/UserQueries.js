const { v4: uuidv4 } = require('uuid');
const model = require('../Models');
require('../Models/associations');
const GetAllUsers = () => {
    return model.User.findAll({
        include: [
            { model: model.Points },
            { model: model.Notification },
            {
                model: model.UserQuest,
                include: [{ model: model.Quest }]
            },
            {
                model: model.UserEvent,
                include: [{
                    model: model.Event
                }]
            },
            {
                model: model.Role,
                include: [
                    {
                        model: model.RolePermission,
                        include: [
                            { model: model.Permission },
                        ],
                    },
                ],
            },
            { model: model.Level },
        ],
    });
};

const GetUserByLogin = (login) => {
    console.log("**** User ****", login);
    return model.User.findOne({
        where: { Login: login },
        include: [
            { model: model.Points },
            { model: model.Notification },
            {
                model: model.UserQuest,
                include: [{ model: model.Quest }]
            },
            {
                model: model.UserEvent,
                include: [{
                    model: model.Event
                }]
            },
            {
                model: model.Role,
                include: [
                    {
                        model: model.RolePermission,
                        include: [
                            { model: model.Permission },
                        ],
                    },
                ],
            },
            { model: model.Level },
        ],
    });
};
const GetUserByEmail = (email) => {
    console.log("**** User ****", email);
    return model.User.findOne({
        where: { Email: email },
        include:[{
            model: model.Role
        }]
    });
};

const GetUserById = (id) => {
    console.log("**** Dashboard ID User ****", id);
    return model.User.findOne({
        where: { Id: id },
        include: [
            { model: model.Gamer}, 
            { model: model.Message,  where : { Status: 'unread'} },
            { model: model.Points },
            { model: model.Notification },
            {
                model: model.UserQuest,
                include: [{ model: model.Quest }]
            },
            {
                model: model.UserEvent,
                include: [{
                    model: model.Event
                }]
            },
            {
                model: model.Role,
                include: [
                    {
                        model: model.RolePermission,
                        include: [{ model: model.Permission }],
                    },
                ],
            },
            { model: model.Level }
        ],
    });
};
const GetUserByUsername = (username) => {
    console.log("****GetUserByUsername ID User ****", username);
    return model.User.findOne({
        where: { UserName: username },
        
        include: [
            {},
            { model: model.Gamer}, 
            { model: model.Points },
            { model: model.Notification },
            {
                model: model.UserQuest,
                include: [{ model: model.Quest }]
            },
            {
                model: model.UserEvent,
                include: [{
                    model: model.Event
                }]
            },
            {
                model: model.Role,
                include: [
                    {
                        model: model.RolePermission,
                        include: [{ model: model.Permission }],
                    },
                ],
            },
            { model: model.Level },
        ],
    });
};

const GetGamerById = (id) => {
    return model.Gamer.findOne({
        where: { UserId: id }
    })
}
const UpdateLastDateConnection = (usr) => {
    console.log("****UpdateLastDateConnection ID User ****", usr)
    const promises = []
    const date = new Date().toISOString(); // Convertir la date en chaîne
    const request = model.User.update({ LastConnexion: date }, { where: { Id: { [model.Utils.Op.like]: `%${usr}%` } } })
    promises.push(request)
    return request
        .then(w => { 
            console.log("w", w)
            return Promise.all(promises)
        })
        .catch(err => { console.log("ERROR UpdateLastDateConnection : ", err) })
}
const UpdateUserInformations = (usr, data) => {    
    console.log("****UpdateLastDateConnection ID User ****", usr, data)
}

const GetMessageByReceiverId = (id, nav) => {
    console.log("****GetMessageByReceiverId ****", id, nav)
    return model.Message.findAll({
        offset: nav.step * nav.current,
        limit: nav.step,
        order: [["DateSend", "DESC"]],
        where: { ReceiverId: id },
        include: [{
            model: model.User,
            as: 'Sender', // Alias utilisé dans l'association
            attributes: ['Id', 'UserName', 'LastName', 'FirstName'], // Sélectionnez les champs que vous voulez inclure
        }]
    })
}
const ChangeStatusMessage = (id, status) => {    
    console.log("****ChangeStatusMessage ****", id, status)
    const promise = []
    const request = model.Message.update({ Status: status }, { where: { Id: id } })
    promise.push(request)
    return request
    .then(w => { 
        console.log("w", w)
        return Promise.all(promise)
    })
    .catch(err => { console.log("ERROR UpdateLastDateConnection : ", err) })
}
module.exports = {
    GetAllUsers,
    GetUserByUsername,
    GetUserById,
    GetGamerById,
    GetUserByEmail,
    GetUserByLogin,
    UpdateLastDateConnection,
    UpdateUserInformations,
    GetMessageByReceiverId,
    ChangeStatusMessage
};