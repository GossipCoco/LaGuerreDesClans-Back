const SocketIO = require("socket.io");

let io;
const message = "Bienvenue sur l'application de révision";

const SocketIOController = (server, options) => {
    // On initialise correctement Socket.IO ici
    io = SocketIO(server, options); 
    
    // On écoute les connexions
    io.on("connection", (socket) => {
        console.log('first connection : ', socket.id);
        const usr = 'gossipCoco';  // On simule ici l'utilisateur connecté
        
        // Envoie du message de bienvenue
        socket.emit('sendMessage', { userName: usr, message: "Bienvenue sur l'application" });
        
        // Lors de la déconnexion
        socket.on('disconnect', () => {
            console.log(`${usr} s'est déconnecté`);
        });
    });
};

const sendMessageWelcome = (io, socketId, message) => {
    console.log("socketId:", socketId);
    io.to(socketId).emit('sendMessage', { userName: socketId, message: message });
};

module.exports = SocketIOController;