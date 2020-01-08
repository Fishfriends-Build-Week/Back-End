const express = require("express");
require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const server = express();

const userRouter = require("./Users/UsersRoutes");
const triplogsRouter = require("./TripLogs/TripLogsRoutes");
const locationsRouter = require("./Locations/LocationsRoutes.js");
const baitRouter = require("./Bait/BaitRoutes.js");
const authenticate = require("./Users/authentication/authMiddleWare");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/accounts", userRouter);
server.use("/locations", authenticate, locationsRouter);
server.use("/logs", authenticate, triplogsRouter);

server.get("/", (req, res) => {
  res.send("welcome to fish friends API");
});

server.get("/testing", (req, res) => {
  res.json("test completed");
});

const PORT = process.env.PORT || 7000;
server.listen(PORT, console.log(`listening on port ${PORT}`));
