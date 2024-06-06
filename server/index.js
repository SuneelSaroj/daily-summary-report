const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

var cors = require("cors");
app.use(cors());

app.use(express.json());
const viewController = require("./controller/viewController");

app.post("/str-dl-smry-rpt", viewController.getViewData);

const port = 3060;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/str-dl-smry-rpt", function (req, res) {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});
