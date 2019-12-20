const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const server = express();

const userRouter = require("./Users/UsersRoutes");
const triplogsRouter = require("./TripLogs/TripLogsRoutes");
const authenticate = require("./Users/authentication/authMiddleWare");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/accounts", userRouter);

server.use("/logs", triplogsRouter);

server.get("/", (req, res) => {
  res.send("welcome to fish friends API");
});

server.get("/testing", (req, res) => {
  res.json("test completed");
});

const PORT = process.env.PORT || 7000;
server.listen(port, console.log(`listening on port ${port}`));
