const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const usersRoutes = require("./routes/users.route");
const organisationsRoutes = require("./routes/organisations.route");

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/organisations", organisationsRoutes);

module.exports = app;
