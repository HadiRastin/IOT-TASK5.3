const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://52.91.228.123:27017/SIT314", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a Mongoose schema
const dataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  time: Date,
  temperature: Number,
});

// Create a Mongoose model
const DataModel = mongoose.model("Data", dataSchema);

app.use(express.json()); // Middleware to parse JSON in the request body

app.post("/", (req, res) => {
  // Assuming you are sending JSON data in the request body
  const newData = new DataModel(req.body);

  // Save the data to MongoDB
  newData
    .save()
    .then((doc) => {
      console.log("Data saved to MongoDB:", doc);
      res.status(200).send(doc); // Send the saved data back in the response if needed
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
