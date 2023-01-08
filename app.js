const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mqtt = require("./mqtt");
const { Users } = require("./models/users");
const router = require("./routes");
const { Absence } = require("./models/absence");
const { sequelize } = require("./db");
//set view engine to ejs
app.set("view engine", "ejs");
//Initiate bodyParser to parse request body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("a user connected");
});

mqtt.on("message", async (topic, message) => {
  // message is Buffer
  console.log(topic, message.toString());
  if (topic === "CARD_TAPPED") {
    io.emit("register_new_card", message.toString());
    const user = await Users.findOne({
      where: {
        idcard: message.toString(),
      },
    });
    if (user) {
      mqtt.publish("IoT_command", "OPEN_GATE");
      const data = await Absence.findOne({
        where: {
          idcard: message.toString(),
        },
        order: [[sequelize.literal("tanggal"), "DESC"]],
      });
      const absence = await Absence.create({
        userId: user.id,
        idcard: message.toString(),
        tanggal: new Date(),
        status: data && data.status === "TAP IN" ? "TAP OUT" : "TAP IN",
      });
      io.emit(
        "absence",
        JSON.stringify({
          user: user.name,
          idcard: message.toString(),
          status: absence.status,
          tanggal: absence.tanggal,
        })
      );
    }
  }
  //   client.end()
});

//set upp public directory to serve static files
app.use(express.static(__dirname + "/assets"));
router(app);

server.listen(3000, () => {
  console.log("listening on *:3000");
});
