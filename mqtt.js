const mqtt = require("mqtt");

const clientId = "mqttjs_" + Math.random().toString(8).substr(2, 4);
const client = mqtt.connect("mqtt://192.168.137.86", {
  clientId: clientId,
  clean: false,
});

client.on("connect", function () {
  client.subscribe("IoT_command", function (err) {
    if (!err) {
      client.publish("IoT_command", "CONNECTION_TEST");
    }
  });
  client.subscribe("CARD_TAPPED");
});

client.on("error", function (error) {
  console.log(error.message);
});

module.exports = client;
