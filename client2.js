const http = require("http");
const Sensor = require("./models/sensor");

setInterval(loadtest, 1000); // time is in ms

function loadtest() {
  const sensordata = {
    id: 0,
    name: "temperaturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    temperature: Math.floor(Math.random() * (40 - 10) + 10),
  };

  const jsonString = JSON.stringify(sensordata);
  console.log(jsonString);

  const newSensor = new Sensor({
    id: sensordata.id,
    name: sensordata.name,
    address: sensordata.address,
    time: sensordata.time,
    temperature: sensordata.temperature,
  });

  // HTTP POST request to send data to the server
  const options = {
    hostname: "3.88.52.97",
    port: 3000,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": jsonString.length,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  // Send the data with the request
  req.write(jsonString);
  req.end();
}
