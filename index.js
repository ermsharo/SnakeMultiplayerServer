const express = require("express")
const dotenv = require("dotenv");
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authRoutes = require("./routes/auth");
const Game = require("./game");

dotenv.config();

require("dotenv-safe").config();

const port = process.env.PORT;
app.use(jsonParser);
app.use(cors());

let cleanUp = false; 


const socketIO = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

app.use(cors())

g = new Game()
let users = []

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
  })

  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  socket.on("refresh", data => {
    console.log("Dados forma limpos");
    cleanUp = true;
    console.log(g.getGameStatus())
  })

  socket.on("gameData", data => {
    if(cleanUp == true){
      g.cleanupPlayers()
      cleanUp = false; 
    }
    g.setPlayersInfo(data.info);
    // console.log("Data info",data.info )
    socketIO.emit("gameData", g.getGameStatus())
  })



  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    g.cleanupPlayers()
    socket.disconnect()
  });
});


//Routes
app.use(authRoutes);


http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});