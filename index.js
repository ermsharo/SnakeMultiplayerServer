const express = require("express")
const dotenv = require("dotenv");
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authRoutes = require("./routes/auth");
dotenv.config();

require("dotenv-safe").config();

const port = process.env.PORT;
app.use(jsonParser);
app.use(cors());


const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
    console.log("Data here", data);
  })

  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ))

  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    socket.disconnect()
  });
});


//Routes
app.use(authRoutes);


http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});