const express = require("express")
const dotenv = require("dotenv");
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
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

db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB connection error :", err);
  });


app.get("/api", (req, res) => {
  res.json({ message: "Hello" })
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});